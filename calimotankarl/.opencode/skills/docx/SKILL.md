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
- Prefer `python-docx` primitives over raw XML

## Common operations

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

# heading
doc.add_heading('Title', level=0)

# paragraph with formatting
p = doc.add_paragraph('Some text')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('bold red text')
run.bold = True
run.font.color.rgb = RGBColor(0xFF, 0x00, 0x00)

# table
table = doc.add_table(rows=3, cols=2)
table.style = 'Light Shading Accent 1'
table.cell(0, 0).text = 'Header'

# image
doc.add_picture('path/to/img.png', width=Inches(5))

# page setup
section = doc.sections[0]
section.top_margin = Cm(2.54)
section.bottom_margin = Cm(2.54)

doc.save('output.docx')
```

## Document structure

- `doc.add_section()` for sections with different layouts
- `WD_BREAK.PAGE` for manual page breaks
- Headers/footers via `section.header` / `section.footer`

## Best practices

1. Set page margins explicitly
2. Use `docx.shared` units (`Inches`, `Cm`, `Pt`, `Emu`)
3. Prefer named styles (`'Heading 1'`, `'Normal'`) over direct run formatting
4. Keep generation logic in pure functions that accept data and return/save a Document
