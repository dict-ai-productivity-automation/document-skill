# Skill: docx

Generate, edit, and format Microsoft Word .docx files programmatically.

## Runtime

- **Language:** Python 3.10+
- **Library:** python-docx 1.1+
- **Install:** `pip install python-docx`

## Instructions

### Creating a Document

1. Import `docx` module: `from docx import Document`
2. Create a new Document: `doc = Document()`
3. Add content using the Document API.
4. Save: `doc.save("output.docx")`

### Content Types

| Element     | Method / API                                  |
|-------------|-----------------------------------------------|
| Paragraph   | `doc.add_paragraph(text, style='Normal')`     |
| Heading     | `doc.add_heading(text, level=1)`              |
| Table       | `doc.add_table(rows, cols, style='Table Grid')` |
| Bullet list | `doc.add_paragraph(text, style='List Bullet')` |
| Numbered    | `doc.add_paragraph(text, style='List Number')` |
| Image       | `doc.add_picture(path, width=Inches(6))`      |
| Page break  | `doc.add_page_break()`                        |

### Styling

- Access runs via `paragraph.add_run(text)` for inline formatting (bold, italic, font, size, color).
- Set paragraph alignment: `paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER`
- Use built-in styles: `'Normal'`, `'Title'`, `'Heading1'`, `'Body Text'`, etc.
- Custom styles can be created by modifying the `styles` object.

### Tables

```python
table = doc.add_table(rows=3, cols=4, style='Table Grid')
cell = table.cell(0, 0)
cell.text = "Header"
```

### Headers & Footers

```python
section = doc.sections[0]
header = section.header
header.paragraphs[0].text = "My Header"
```

### Templates

1. Create a template .docx with placeholder text (e.g., `{{ variable }}`).
2. Open with `Document('template.docx')`.
3. Search and replace in paragraphs and tables.
4. Save as a new file.

## Output

- File must be saved with `.docx` extension.
- Always close the document (implicit via `doc.save`).
- Validate the file by opening in Word or using `python-docx` to re-read it.

## Example

```python
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()
doc.add_heading('My Document', level=0)
p = doc.add_paragraph('This is a ')
run = p.add_run('beautiful')
run.bold = True
p.add_run(' document.')
doc.save('output.docx')
```
