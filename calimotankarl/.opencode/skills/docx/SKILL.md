---
name: docx
description: Generate .docx files using python-docx with full formatting support
---

## Requirements

- Python 3.8+
- `python-docx` (`pip install python-docx`)

## Conventions

- Import as `from docx import Document`
- Use `Document()` to create, `doc.save(path)` to write
- Prefer `python-docx` primitives over raw XML when available, but use clean helper functions for advanced formatting (shading, borders, page numbers) not directly exposed by python-docx APIs.

## Common operations

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

doc = Document()

# 1. Heading with keep-with-next to avoid orphan headings
h = doc.add_heading('Executive Summary', level=1)
h.paragraph_format.keep_with_next = True
h.paragraph_format.space_before = Pt(12)
h.paragraph_format.space_after = Pt(6)

# 2. Paragraph with custom line spacing and font properties
p = doc.add_paragraph()
p.paragraph_format.line_spacing = 1.15
p.paragraph_format.space_after = Pt(8)

run = p.add_run('This is a styled paragraph run. ')
run.font.name = 'Arial'
run.font.size = Pt(11)

run_bold = p.add_run('This text is bold and colored.')
run_bold.bold = True
run_bold.font.name = 'Arial'
run_bold.font.size = Pt(11)
run_bold.font.color.rgb = RGBColor(0x1A, 0x36, 0x5D) # Navy

# 3. Table with custom cell background shading, borders, and margins
table = doc.add_table(rows=3, cols=3)
table.autofit = False

# Set specific column widths
widths = [Inches(1.5), Inches(3.0), Inches(2.0)]
for row in table.rows:
    for idx, width in enumerate(widths):
        row.cells[idx].width = width

# Repeat header row on every page
trPr = table.rows[0]._tr.get_or_add_trPr()
trPr.append(OxmlElement('w:tblHeader'))

# Style header cells
for cell in table.rows[0].cells:
    # Set shading (background color)
    shading = parse_xml(r'<w:shd {} w:fill="1A365D"/>'.format(nsdecls('w')))
    cell._tc.get_or_add_tcPr().append(shading)
    
    # Text color and alignment
    cp = cell.paragraphs[0]
    cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    crun = cp.add_run('Header')
    crun.bold = True
    crun.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    crun.font.name = 'Arial'
    crun.font.size = Pt(10)
    
    # Vertical alignment
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

# 4. Images with explicit width
doc.add_picture('path/to/img.png', width=Inches(5))

# 5. Margins setup
section = doc.sections[0]
section.top_margin = Inches(1)
section.bottom_margin = Inches(1)
section.left_margin = Inches(1)
section.right_margin = Inches(1)

doc.save('output.docx')
```

## Advanced XML Workarounds

For custom features not natively supported by python-docx, use these utility functions:

### 1. Cell Background Shading
```python
def set_cell_shading(cell, hex_color):
    """Sets background color of a cell (e.g. '1A365D')."""
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)
```

### 2. Page Numbers in Footers
To insert a dynamic "Page X of Y" field:
```python
def add_page_number(run):
    """Inserts a dynamic PAGE number field into a run."""
    fldChar1 = OxmlElement('w:fldChar')
    fldChar1.set(qn('w:fldCharType'), 'begin')
    instrText = OxmlElement('w:instrText')
    instrText.set(qn('xml:space'), 'preserve')
    instrText.text = "PAGE"
    fldChar2 = OxmlElement('w:fldChar')
    fldChar2.set(qn('w:fldCharType'), 'separate')
    fldChar3 = OxmlElement('w:fldChar')
    fldChar3.set(qn('w:fldCharType'), 'end')
    
    r = run._r
    r.append(fldChar1)
    r.append(instrText)
    r.append(fldChar2)
    r.append(fldChar3)
```

### 3. Cell Padding (Margins)
```python
def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set cell padding in dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for margin, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{margin}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)
```

## Best practices

1. **Page Layouts & Margins**: Set page margins explicitly on the document sections (`section.top_margin`, `section.left_margin`, etc.).
2. **Typography Consistency**: Define custom font properties at the run level if not using document-wide styles, and ensure the font family matches across all runs.
3. **Table Widths**: Always set cell widths explicitly when auto-fitting is disabled. Do this row-by-row and cell-by-cell for consistent renders.
4. **Avoid Orphan Headings**: Set `keep_with_next = True` on all heading paragraph formats to ensure they stick with the following content.
5. **XML Helpers**: Use `parse_xml` and `OxmlElement` cleanly inside defined helpers to keep the main generation script readable.

