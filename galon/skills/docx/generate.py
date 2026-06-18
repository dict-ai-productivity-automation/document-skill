import argparse
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH


def build_document(title: str, sections: list[dict], output: str):
    doc = Document()

    # Title
    heading = doc.add_heading(title, level=0)
    heading.alignment = WD_ALIGN_PARAGRAPH.CENTER

    for section in sections:
        kind = section.get("type", "paragraph")

        if kind == "heading":
            doc.add_heading(section["text"], level=section.get("level", 1))

        elif kind == "paragraph":
            p = doc.add_paragraph()
            run = p.add_run(section["text"])
            if section.get("bold"):
                run.bold = True
            if section.get("italic"):
                run.italic = True

        elif kind == "list":
            for item in section["items"]:
                doc.add_paragraph(item, style="List Bullet")

        elif kind == "table":
            rows = section["rows"]
            table = doc.add_table(rows=len(rows), cols=len(rows[0]))
            table.style = "Light Shading Accent 1"
            for i, row in enumerate(rows):
                for j, cell in enumerate(row):
                    table.cell(i, j).text = str(cell)

        elif kind == "page_break":
            doc.add_page_break()

    doc.save(output)
    print(f"Document saved: {output}")


def main():
    parser = argparse.ArgumentParser(description="Generate a .docx document")
    parser.add_argument("--output", required=True, help="Output .docx path")
    parser.add_argument("--title", default="Document", help="Document title")
    parser.add_argument("--sections", required=True, help="JSON string of sections")
    args = parser.parse_args()

    import json
    sections = json.loads(args.sections)
    build_document(args.title, sections, args.output)


if __name__ == "__main__":
    main()
