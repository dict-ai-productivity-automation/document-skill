import os
import re
from datetime import datetime
from typing import Dict, Any, List
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn


def get_alignment(align_str: str) -> int:
    align_str = align_str.lower().strip()
    if align_str == "center":
        return WD_ALIGN_PARAGRAPH.CENTER
    elif align_str == "right":
        return WD_ALIGN_PARAGRAPH.RIGHT
    elif align_str == "justify":
        return WD_ALIGN_PARAGRAPH.JUSTIFY
    return WD_ALIGN_PARAGRAPH.LEFT


def extract_footnotes(text: str, footnotes_list: List[str]) -> str:
    """Extract inline [fn: footnote text] references, register them,
    and replace with superscript markers like ^[1]^.
    """

    def replace_fn(match):
        fn_text = match.group(1).strip()
        footnotes_list.append(fn_text)
        fn_idx = len(footnotes_list)
        return f"^[{fn_idx}]^"

    return re.sub(r"\[fn:(.*?)\]", replace_fn, text)


def add_paragraph_with_markdown(paragraph, text: str) -> None:
    """Parse inline markdown tags and apply styling to runs."""
    # Pattern to capture matches of different formats:
    # 0: **bold**, 1: bold_text
    # 2: *italic*, 3: italic_text
    # 4: _underline_, 5: underline_text
    # 6: ^superscript^, 7: superscript_text
    # 8: ~subscript~, 9: subscript_text
    # 10: `code`, 11: code_text
    pattern = re.compile(
        r"(\*\*(.*?)\*\*)|(\*(.*?)\*)|(_(.*?)_)|(\^(.*?)\^)|(~(.*?)~)|(`(.*?)`)"
    )

    last_idx = 0
    for match in pattern.finditer(text):
        start, end = match.span()
        if start > last_idx:
            paragraph.add_run(text[last_idx:start])

        groups = match.groups()
        if groups[0] is not None:
            run = paragraph.add_run(groups[1])
            run.bold = True
        elif groups[2] is not None:
            run = paragraph.add_run(groups[3])
            run.italic = True
        elif groups[4] is not None:
            run = paragraph.add_run(groups[5])
            run.underline = True
        elif groups[6] is not None:
            run = paragraph.add_run(groups[7])
            run.font.superscript = True
        elif groups[8] is not None:
            run = paragraph.add_run(groups[9])
            run.font.subscript = True
        elif groups[10] is not None:
            run = paragraph.add_run(groups[11])
            run.font.name = "Courier New"
            run.font.size = Pt(10)

        last_idx = end

    if last_idx < len(text):
        paragraph.add_run(text[last_idx:])


def get_docx_length(val: Any) -> Any:
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return Inches(val / 96.0)  # assume px at 96 DPI
    val_str = str(val).lower().strip()
    if val_str.endswith("in"):
        return Inches(float(val_str[:-2]))
    if val_str.endswith("pt"):
        return Pt(float(val_str[:-2]))
    if val_str.endswith("px"):
        return Inches(float(val_str[:-2]) / 96.0)
    if val_str.endswith("cm"):
        return Inches(float(val_str[:-2]) / 2.54)
    try:
        return Inches(float(val_str) / 96.0)
    except ValueError:
        return None


def set_table_margins(
    table, top: int = 120, bottom: int = 120, left: int = 180, right: int = 180
) -> None:
    tbl = table._tbl
    tblPr = tbl.tblPr
    tblCellMar = OxmlElement("w:tblCellMar")
    for side, val in [
        ("top", top),
        ("bottom", bottom),
        ("left", left),
        ("right", right),
    ]:
        node = OxmlElement(f"w:{side}")
        node.set(qn("w:w"), str(val))
        node.set(qn("w:type"), "dxa")
        tblCellMar.append(node)
    tblPr.append(tblCellMar)


def add_header(doc: Document, text: str, alignment: str) -> None:
    for sec in doc.sections:
        sec.header.is_linked_to_previous = False
        p = sec.header.paragraphs[0]
        p.text = ""
        p.alignment = get_alignment(alignment)
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(9.5)
        run.font.italic = True
        run.font.color.rgb = RGBColor(0x7F, 0x7F, 0x7F)


def add_footer(
    doc: Document, text: str, page_numbers: bool, alignment: str
) -> None:
    for sec in doc.sections:
        sec.footer.is_linked_to_previous = False
        p = sec.footer.paragraphs[0]
        p.text = ""
        p.alignment = get_alignment(alignment)

        if text:
            run = p.add_run(text)
            run.font.name = "Calibri"
            run.font.size = Pt(9.5)
            run.font.color.rgb = RGBColor(0x7F, 0x7F, 0x7F)

        if page_numbers:
            run_pg = p.add_run()
            run_pg.font.name = "Calibri"
            run_pg.font.size = Pt(9.5)
            run_pg.font.color.rgb = RGBColor(0x7F, 0x7F, 0x7F)

            fldSimple = OxmlElement("w:fldSimple")
            fldSimple.set(qn("w:instr"), "PAGE")
            run_pg._r.append(fldSimple)


def configure_styles(doc: Document) -> None:
    # Normal Style
    style_normal = doc.styles["Normal"]
    font_normal = style_normal.font
    font_normal.name = "Calibri"
    font_normal.size = Pt(11)
    style_normal.paragraph_format.space_after = Pt(6)
    style_normal.paragraph_format.line_spacing = 1.15

    # Heading 1
    style_h1 = doc.styles["Heading 1"]
    font_h1 = style_h1.font
    font_h1.name = "Calibri"
    font_h1.size = Pt(24)
    font_h1.bold = True
    font_h1.color.rgb = RGBColor(0x1F, 0x4E, 0x78)
    style_h1.paragraph_format.space_before = Pt(12)
    style_h1.paragraph_format.space_after = Pt(12)

    # Heading 2
    style_h2 = doc.styles["Heading 2"]
    font_h2 = style_h2.font
    font_h2.name = "Calibri"
    font_h2.size = Pt(18)
    font_h2.bold = True
    font_h2.color.rgb = RGBColor(0x2E, 0x75, 0xB6)
    style_h2.paragraph_format.space_before = Pt(12)
    style_h2.paragraph_format.space_after = Pt(10)

    # Heading 3
    style_h3 = doc.styles["Heading 3"]
    font_h3 = style_h3.font
    font_h3.name = "Calibri"
    font_h3.size = Pt(14)
    font_h3.bold = True
    font_h3.color.rgb = RGBColor(0x41, 0x8A, 0xB3)
    style_h3.paragraph_format.space_before = Pt(6)
    style_h3.paragraph_format.space_after = Pt(8)

    # Bullet and Number lists
    for name in ["List Bullet", "List Number"]:
        if name in doc.styles:
            style_list = doc.styles[name]
            style_list.font.name = "Calibri"
            style_list.font.size = Pt(11)
            style_list.paragraph_format.left_indent = Pt(36)
            style_list.paragraph_format.space_after = Pt(4)


def generate_docx(file_path: str, data: Dict[str, Any]) -> str:
    """Generate a formatted Word document from structured data.

    Args:
        file_path: The path where the generated document will be saved.
        data: A dictionary containing the structured document specification.

    Returns:
        The absolute path to the generated document.
    """
    doc = Document()
    configure_styles(doc)

    # Page layout
    section = doc.sections[0]
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

    # Document Metadata
    doc.core_properties.title = data.get("title", "Generated Document")
    doc.core_properties.author = data.get("author", "AI Document Generator")
    doc.core_properties.subject = data.get("subject", "")
    doc.core_properties.keywords = ", ".join(data.get("keywords", []))
    doc.core_properties.created = datetime.now()
    doc.core_properties.modified = datetime.now()

    footnotes_list: List[str] = []

    # Process sections
    for item in data.get("sections", []):
        item_type = item.get("type", "").lower().strip()

        if item_type == "heading":
            level = item.get("level", 1)
            text = item.get("text", '')
            doc.add_heading(text, level=level)

        elif item_type == "paragraph":
            text = item.get("text", '')
            text_with_markers = extract_footnotes(text, footnotes_list)

            p_style = item.get("style", "Normal")
            if p_style not in doc.styles:
                p_style = "Normal"

            p = doc.add_paragraph(style=p_style)
            p.alignment = get_alignment(item.get("alignment", "left"))
            add_paragraph_with_markdown(p, text_with_markers)

        elif item_type == "bullet_list":
            items = item.get("items", [])
            p_style = item.get("style", "List Bullet")
            if p_style not in doc.styles:
                p_style = "List Bullet"
            for list_item in items:
                p = doc.add_paragraph(style=p_style)
                list_item_with_markers = extract_footnotes(
                    list_item, footnotes_list
                )
                add_paragraph_with_markdown(p, list_item_with_markers)

        elif item_type == "numbered_list":
            items = item.get("items", [])
            p_style = item.get("style", "List Number")
            if p_style not in doc.styles:
                p_style = "List Number"
            for list_item in items:
                p = doc.add_paragraph(style=p_style)
                list_item_with_markers = extract_footnotes(
                    list_item, footnotes_list
                )
                add_paragraph_with_markdown(p, list_item_with_markers)

        elif item_type == "table":
            headers = item.get("headers", [])
            rows = item.get("rows", [])
            t_style = item.get("style", "Light Grid Accent 1")
            if t_style not in doc.styles:
                t_style = "Table Grid"

            table = doc.add_table(rows=len(rows) + 1, cols=len(headers))
            table.style = t_style
            set_table_margins(table)

            # Header Row
            hdr_cells = table.rows[0].cells
            for idx, header_text in enumerate(headers):
                hdr_cells[idx].text = header_text
                # Format headers to be bold and centered
                for p in hdr_cells[idx].paragraphs:
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    for r in p.runs:
                        r.font.bold = True
                        r.font.name = "Calibri"

            # Data Rows
            for r_idx, row_data in enumerate(rows):
                row_cells = table.rows[r_idx + 1].cells
                for c_idx, cell_value in enumerate(row_data):
                    p = row_cells[c_idx].paragraphs[0]
                    # Parse footnotes and markdown
                    cell_text_with_markers = extract_footnotes(
                        str(cell_value), footnotes_list
                    )
                    add_paragraph_with_markdown(p, cell_text_with_markers)

        elif item_type == "image":
            img_path = item.get("path", "")
            if img_path and os.path.exists(img_path):
                width = get_docx_length(item.get("width"))
                height = get_docx_length(item.get("height"))

                # Center-aligned paragraph for image
                p_img = doc.add_paragraph()
                p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p_img.paragraph_format.space_before = Pt(12)
                p_img.paragraph_format.space_after = Pt(4)

                run_img = p_img.add_run()
                run_img.add_picture(img_path, width=width, height=height)

                caption = item.get("caption", "")
                if caption:
                    p_cap = doc.add_paragraph()
                    p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    run_cap = p_cap.add_run(caption)
                    run_cap.font.name = "Calibri"
                    run_cap.font.size = Pt(9)
                    run_cap.font.italic = True
                    run_cap.font.color.rgb = RGBColor(0x59, 0x59, 0x59)
                    p_cap.paragraph_format.space_before = Pt(4)
                    p_cap.paragraph_format.space_after = Pt(12)
            else:
                # Add placeholder or warning text if image path does not exist
                p_err = doc.add_paragraph()
                run_err = p_err.add_run(
                    f"[Image not found at path: {img_path}]"
                )
                run_err.font.italic = True
                run_err.font.color.rgb = RGBColor(0xFF, 0x00, 0x00)

        elif item_type == "page_break":
            doc.add_page_break()

        elif item_type == "footnote":
            # Manual / standalone footnote registration
            text = item.get("text", "")
            footnotes_list.append(text)

        elif item_type == "header":
            add_header(
                doc, item.get("text", ""), item.get("alignment", "center")
            )

        elif item_type == "footer":
            add_footer(
                doc,
                item.get("text", ""),
                item.get("page_numbers", True),
                item.get("alignment", "center"),
            )

    # Append footnotes at the end of the document if any were registered
    if footnotes_list:
        p_div = doc.add_paragraph()
        p_div.paragraph_format.space_before = Pt(24)
        p_div.paragraph_format.space_after = Pt(6)
        run_line = p_div.add_run("―" * 30)
        run_line.font.color.rgb = RGBColor(0xBF, 0xBF, 0xBF)

        for idx, fn_text in enumerate(footnotes_list, 1):
            p_fn = doc.add_paragraph()
            p_fn.paragraph_format.space_after = Pt(3)
            p_fn.paragraph_format.left_indent = Pt(18)

            run_num = p_fn.add_run(f"[{idx}] ")
            run_num.font.superscript = True
            run_num.font.name = "Calibri"
            run_num.font.size = Pt(9)
            run_num.font.color.rgb = RGBColor(0x59, 0x59, 0x59)

            add_paragraph_with_markdown(p_fn, fn_text)
            for r in p_fn.runs[1:]:
                r.font.name = "Calibri"
                r.font.size = Pt(9.5)
                r.font.color.rgb = RGBColor(0x59, 0x59, 0x59)

    # Create target directory if it doesn't exist
    out_dir = os.path.dirname(os.path.abspath(file_path))
    os.makedirs(out_dir, exist_ok=True)

    doc.save(file_path)
    return os.path.abspath(file_path)
