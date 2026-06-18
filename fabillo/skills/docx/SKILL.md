# docx Skill

## Purpose

Provides knowledge and reusable patterns for generating `.docx` (Office Open XML) files using the `python-docx` library.

## Dependencies

Install `python-docx` (if not already present):

```bash
pip install python-docx
```

## Core API

| Task | Code |
|------|------|
| Create document | `doc = Document()` |
| Add heading | `doc.add_heading('Title', level=1)` |
| Add paragraph | `p = doc.add_paragraph('Some text')` |
| Add bold/italic | `run = p.add_run('bold text'); run.bold = True` |
| Add bullet list | `doc.add_paragraph('item', style='List Bullet')` |
| Add numbered list | `doc.add_paragraph('item', style='List Number')` |
| Add table | `table = doc.add_table(rows=3, cols=2)` then `cell.text = 'val'` |
| Add image | `doc.add_picture('path.png', width=Inches(6))` |
| Set font | `run.font.name = 'Calibri'; run.font.size = Pt(12)` |
| Save | `doc.save('output.docx')` |

## Imports

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
```

## Advice

- Always close the document with `.save()` before reading/returning the file.
- Use `Inches()`, `Cm()`, or `Pt()` from `docx.shared` for dimensions.
- For colour, use `RGBColor(0xFF, 0x00, 0x00)`.
- Tables can be styled with `table.style = 'Light Grid Accent 1'`.
- Sections (page layout) are accessed via `doc.sections`.
- Headers/footers via `section.header` / `section.footer`.
