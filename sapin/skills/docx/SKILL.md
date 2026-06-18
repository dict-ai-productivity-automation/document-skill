# docx Skill

Generates and manipulates Microsoft Word .docx files using python-docx.

## API

### create_document(path, orientation="portrait")
Creates a new blank document.

### add_paragraph(text, style=None, font=None, alignment=None)
Adds a paragraph with optional formatting.

### add_heading(text, level=1)
Adds a heading at the specified level (1-9).

### add_table(headers, rows, style="Table Grid")
Creates a table with headers and data rows.

### add_page_break()
Inserts a page break.

### add_list(items, ordered=False)
Adds a bulleted or numbered list.

### save()
Writes the document to disk at the specified path.

## Dependencies

- python-docx

## Example

```python
from docx import Document

doc = Document()
doc.add_heading("My Document", level=1)
doc.add_paragraph("Hello, world!")
doc.save("output.docx")
```