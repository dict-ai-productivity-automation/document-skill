name: docx-generator
description: Generate .docx documents using python-docx with templates and formatted content

## When to use
- User asks to generate, create, build, or produce a Word document / .docx file
- User wants to create invoices, reports, letters, memos, or other document types

## Instructions
1. Check if `python-docx` is installed. If not, run `pip install python-docx`.
2. Import: `from docx import Document`
3. Import helpers: `from docx.shared import Pt, Cm, Inches, RGBColor`
4. Import table styles: `from docx.enum.table import WD_TABLE_ALIGNMENT`
5. Import paragraph alignment: `from docx.enum.text import WD_ALIGN_PARAGRAPH`

## Document creation pattern
```python
from docx import Document
from docx.shared import Pt, Cm, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

doc = Document()

# Page margins
section = doc.sections[0]
section.top_margin = Cm(2.54)
section.bottom_margin = Cm(2.54)
section.left_margin = Cm(2.54)
section.right_margin = Cm(2.54)

# Title
doc.add_heading('Title', level=1)

# Section heading
doc.add_heading('Section', level=2)

# Paragraph with formatting
p = doc.add_paragraph()
run = p.add_run('Bold text')
run.bold = True
run.font.size = Pt(12)

# Table
table = doc.add_table(rows=3, cols=3)
table.style = 'Light Grid Accent 1'
for cell in table.rows[0].cells:
    cell.text = 'Header'

doc.save('output.docx')
```

## Common styles
- Tables: `'Light Grid Accent 1'`, `'Table Grid'`, `'Medium Shading 1 Accent 1'`
- Paragraphs: pass `style='List Bullet'` or `style='List Number'`
- Alignment: `WD_ALIGN_PARAGRAPH.CENTER`, `.LEFT`, `.RIGHT`, `.JUSTIFY`

## Output
Save to `output/` directory by default. Create it if it doesn't exist.
