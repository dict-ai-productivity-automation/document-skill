---
name: docx
description: Generate .docx documents using the python-docx library. Use when the user asks to create, generate, or build a Word document, docx file, or report in .docx format.
---

# DOCX Generation Skill

Generate Microsoft Word (.docx) documents programmatically using the `python-docx` library.

## Setup

```bash
pip install python-docx
```

## Basic usage

```python
from docx import Document

doc = Document()
doc.add_heading("Title", level=0)
doc.add_paragraph("Some text")
doc.save("output/document.docx")
```

## Common patterns

### Paragraph styles
```python
p = doc.add_paragraph("Bold and italic text")
run = p.add_run("bold")
run.bold = True
run = p.add_run(" and ")
run = p.add_run("italic")
run.italic = True
```

### Tables
```python
table = doc.add_table(rows=3, cols=3)
table.style = "Light Grid Accent 1"
for row in table.rows:
    for cell in row.cells:
        cell.text = "data"
```

### Page breaks, images, headers
```python
doc.add_page_break()
doc.add_picture("image.png", width=Inches(1.5))
section = doc.sections[0]
header = section.header
header.paragraphs[0].text = "Confidential"
```

### Lists (numbered / bulleted)
```python
p = doc.add_paragraph("Item", style="List Bullet")
p = doc.add_paragraph("Step 1", style="List Number")
```

## Guidelines

- Save output files in the `output/` directory (create it if missing).
- Write scripts in `scripts/` with descriptive names.
- Use `Inches()` and `Pt()` from `docx.shared` for measurements.
- Prefer `docx.enum.text` / `docx.enum.table` for alignment constants.
