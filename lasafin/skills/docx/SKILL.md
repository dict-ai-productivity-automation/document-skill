---
name: docx
description: Use when the user asks to generate, create, modify, or produce .docx files or Word documents. Provides guidance on using python-docx to build structured DOCX files with paragraphs, tables, images, headers, footers, and styling.
---

# DOCX Document Generation Skill

This skill provides instructions for generating `.docx` files using the `python-docx` library.

## Setup

```bash
pip install python-docx
```

## Core Concepts

- **Document**: The root object. Create with `Document()`.
- **Paragraphs**: Add with `doc.add_paragraph(text, style='Normal')`. Supports runs with different formatting via `run.bold`, `run.italic`, `run.font.size`, etc.
- **Tables**: Add with `doc.add_table(rows, cols)`. Access cells via `table.cell(row, col).text`.
- **Sections**: Access via `doc.sections`. Each section has headers (`section.header`) and footers (`section.footer`).
- **Images**: Add with `doc.add_picture(path, width=Inches(6))`.
- **Page breaks**: Add with `doc.add_page_break()`.
- **Styles**: Use built-in styles like `'Normal'`, `'Heading 1'`, `'Heading 2'`, `'Title'`, or define custom styles.

## Common Patterns

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

doc = Document()

# Styling runs
run = paragraph.add_run("bold text")
run.bold = True
run.font.size = Pt(12)
run.font.color.rgb = RGBColor(0xFF, 0x00, 0x00)

doc.save('output/example.docx')
```

## Output Convention
Save all generated documents to the `output/` directory relative to the project root. Create the directory if it does not exist.
