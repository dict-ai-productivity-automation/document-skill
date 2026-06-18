# DOCX Generation Skill

Generate .docx files using `python-docx`.

## Prerequisites

- Python 3.8+
- `python-docx` installed (`pip install python-docx`)
- Scripts in this directory (`scripts/`)

## Workflow

1. Analyze the request — determine document structure (headings, paragraphs, tables, images, lists).
2. Write a Python script using `python-docx` (save a copy for reference).
3. Run the script to produce the `.docx` output.
4. Return the path to the generated file.

## Script Template

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn

doc = Document()

# --- Content goes here ---

output_path = r"C:\path\to\output.docx"
doc.save(output_path)
print(f"Saved to {output_path}")
```

## Key `python-docx` APIs

| Task | Code |
|------|------|
| Heading | `doc.add_heading('Title', level=1)` |
| Paragraph | `doc.add_paragraph('text')` |
| Bold/italic | `run.bold = True`, `run.italic = True` |
| Table | `doc.add_table(rows, cols)` |
| Image | `doc.add_picture(path, width=Inches(5))` |
| Page break | `doc.add_page_break()` |
| Bullet list | `doc.add_paragraph('item', style='List Bullet')` |
| Numbered list | `doc.add_paragraph('item', style='List Number')` |

## Available Scripts

- `scripts/generate_template.py` — basic document scaffold