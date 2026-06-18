---
name: docx
description: Use when generating, modifying, or inspecting .docx files. Provides instructions for creating Word documents programmatically with python-docx.
---

# Docx Skill

Generates .docx files using the `python-docx` library. Install it with:

```bash
pip install python-docx
```

## Core Usage

```python
from docx import Document

doc = Document()
doc.save("output.docx")
```

## Document Structure

### Headings

```python
doc.add_heading("Title", level=0)
doc.add_heading("Section", level=1)
doc.add_heading("Subsection", level=2)
```

### Paragraphs

```python
p = doc.add_paragraph("Normal text here.")
p.add_run("bold text").bold = True
p.add_run(" and ")
p.add_run("italic text").italic = True
```

### Tables

```python
table = doc.add_table(rows=3, cols=2, style="Table Grid")
for i, row in enumerate(table.rows):
    row.cells[0].text = f"Item {i+1}"
    row.cells[1].text = f"Value {i+1}"
```

### Lists

```python
doc.add_paragraph("Item 1", style="List Bullet")
doc.add_paragraph("Item 2", style="List Bullet")
```

### Page Breaks & Images

```python
doc.add_page_break()
doc.add_picture("image.png", width=Inches(5))
```

### Styling

```python
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("Styled text")
run.font.size = Pt(14)
run.font.color.rgb = RGBColor(0, 0, 0)
```

## Sections (Headers/Footers/Page Setup)

```python
section = doc.sections[0]
section.top_margin = Cm(2.5)
section.bottom_margin = Cm(2.5)

header = section.header
header.paragraphs[0].text = "Confidential"
```

## Output

Always save to the user's specified path. If no path given, use `output.docx` in the working directory.

```python
doc.save(path)
```
