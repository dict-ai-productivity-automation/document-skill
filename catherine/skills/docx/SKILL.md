# Skill: DOCX Document Generation

Generate professional .docx files using the `python-docx` library.

## Prerequisites

```powershell
python -m pip install python-docx
```

## Core Pattern

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()
# ... build document ...
doc.save("output.docx")
```

## Common Operations

### Text & Paragraphs
```python
p = doc.add_paragraph("Hello", style="Heading 1")
run = p.add_run("bold text")
run.bold = True
run.font.size = Pt(12)
run.font.color.rgb = RGBColor(0, 0, 0)
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
```

### Tables
```python
table = doc.add_table(rows=3, cols=2, style="Table Grid")
table.alignment = WD_TABLE_ALIGNMENT.CENTER
cell = table.cell(0, 0)
cell.text = "Header"
# merge cells
cell_a = table.cell(0, 0)
cell_b = table.cell(0, 1)
cell_a.merge(cell_b)
```

### Images
```python
doc.add_picture("image.png", width=Inches(5))
```

### Page Setup
```python
section = doc.sections[0]
section.page_width = Cm(21)
section.page_height = Cm(29.7)
section.orientation = WD_ORIENT.PORTRAIT
section.left_margin = Cm(2.5)
section.right_margin = Cm(2.5)
section.top_margin = Cm(2.5)
section.bottom_margin = Cm(2.5)
```

### Headers & Footers
```python
header = doc.sections[0].header
hp = header.paragraphs[0]
hp.text = "Header Text"

footer = doc.sections[0].footer
fp = footer.paragraphs[0]
fp.text = "Page "
# add page number field
run = fp.add_run()
fldChar1 = OxmlElement('w:fldChar')
fldChar1.set(qn('w:fldCharType'), 'begin')
run._r.append(fldChar1)
run2 = fp.add_run()
fldCode = OxmlElement('w:instrText')
fldCode.set(qn('xml:space'), 'preserve')
fldCode.text = ' PAGE '
run2._r.append(fldCode)
run3 = fp.add_run()
fldChar2 = OxmlElement('w:fldChar')
fldChar2.set(qn('w:fldCharType'), 'end')
run3._r.append(fldChar2)
```

### Styles
```python
style = doc.styles['Normal']
style.font.name = 'Times New Roman'
style.font.size = Pt(12)
style.paragraph_format.line_spacing = 1.5
style.paragraph_format.space_after = Pt(0)
```

### Page Breaks
```python
doc.add_page_break()
```

### Lists
```python
doc.add_paragraph("Item 1", style="List Bullet")
doc.add_paragraph("Item 2", style="List Number")
```

## Workflow

1. Load skill: `/skill docx` to activate this skill
2. Define document structure (sections, styles, content)
3. Generate the .docx using python-docx
4. Always run the script and verify the output
