# Document Generator — AI + Skills

Build `.docx` documents using the `docx` skill located in `lasafin/skills/docx/`.

## Overview

This document generator uses the `docx` skill to create professional Word documents with paragraphs, tables, images, headers, footers, and styling using the `python-docx` library.

## Getting Started

1. **Install Dependencies**
   ```bash
   pip install python-docx
   ```

2. **Generate Documents**
   When you ask to create or generate a Word document, I will:
   - Load the `docx` skill from `lasafin/skills/docx/SKILL.md`
   - Follow its guidance to produce the document
   - Save all output files to `lasafin/output/`

## Core Concepts

### Document Structure
- **Document**: The root object. Create with `Document()`
- **Paragraphs**: Add with `doc.add_paragraph(text, style='Normal')`
- **Tables**: Add with `doc.add_table(rows, cols)`
- **Sections**: Access via `doc.sections` for headers and footers
- **Images**: Add with `doc.add_picture(path, width=Inches(6))`
- **Page breaks**: Add with `doc.add_page_break()`
- **Styles**: Use built-in styles like `'Normal'`, `'Heading 1'`, `'Heading 2'`, `'Title'`

### Common Patterns

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

doc = Document()

# Add title
heading = doc.add_paragraph("Document Title", style='Title')

# Add normal paragraph
paragraph = doc.add_paragraph("This is a normal paragraph.")

# Add styled text
run = paragraph.add_run("bold text")
run.bold = True
run.font.size = Pt(12)

# Add table
table = doc.add_table(rows=2, cols=2)
table.cell(0, 0).text = "Header 1"
table.cell(0, 1).text = "Header 2"
table.cell(1, 0).text = "Row 1, Col 1"
table.cell(1, 1).text = "Row 1, Col 2"

# Add image (if you have an image file)
# doc.add_picture("path/to/image.jpg", width=Inches(4))

# Add page break
doc.add_page_break()

# Save to output directory
doc.save('lasafin/output/document.docx')
```

## Output Convention

All generated documents are saved to the `lasafin/output/` directory relative to the project root. The directory is created automatically if it doesn't exist.

## Example Usage

Here are some common document types you can create:

### Report Template
```python
# Create a report with heading, content, and table
doc = Document()
doc.add_paragraph("Executive Summary", style='Heading 1')
doc.add_paragraph("This report provides...")

# Add data table
table = doc.add_table(rows=5, cols=3)
# ... populate table with data
```

### Invoice Template
```python
# Create an invoice with logo, header, and line items
doc = Document()
doc.add_paragraph("INVOICE", style='Heading 1')
doc.add_paragraph("Invoice #: 001")
doc.add_paragraph("Date: 2026-01-01")

# Add items table
table = doc.add_table(rows=1, cols=4)
table.cell(0, 0).text = "Item"
table.cell(0, 1).text = "Qty"
table.cell(0, 2).text = "Price"
table.cell(0, 3).text = "Total"
```

## Best Practices

1. **Use Styles Consistently**: Apply built-in styles like `'Heading 1'`, `'Heading 2'` for consistent formatting.

2. **Organize Content**: Structure documents with clear headings and logical flow.

3. **Add Page Breaks**: Use `doc.add_page_break()` to separate sections.

4. **Include Headers/Footers**: Use `doc.sections[0].header` for document headers.

5. **Validate Output**: Check that documents save correctly to the `lasafin/output/` directory.

## Files

- `lasafin/skills/docx/SKILL.md`: Detailed instructions for using the docx skill
- `lasafin/output/`: Directory where all generated documents are saved

## Quick Start

To create your first document:
1. Ask me to create a Word document
2. I'll load the docx skill and generate the document
3. The document will be saved to `lasafin/output/`