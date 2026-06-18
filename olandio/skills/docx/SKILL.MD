# DOCX Document Generation Skill

Generate professional Microsoft Word (.docx) documents using Python and `python-docx`.

## Requirements
- Python 3.8+
- `python-docx` library (`pip install python-docx`)

## API Reference
```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml
```

## Document Structure

### 1. Create a Document
```python
doc = Document()
# or from a template:
# doc = Document('template.docx')
```

### 2. Sections & Page Setup
```python
section = doc.sections[0]
section.top_margin = Cm(2.54)
section.bottom_margin = Cm(2.54)
section.left_margin = Cm(2.54)
section.right_margin = Cm(2.54)
# Orientation
section.orientation = WD_ORIENT.LANDSCAPE
# Page size
from docx.shared import Mm
section.page_width = Mm(297)
section.page_height = Mm(210)
```

### 3. Paragraphs & Text
```python
# Title
title = doc.add_heading('Document Title', level=0)

# Heading levels 1-4
doc.add_heading('Section Heading', level=1)

# Normal paragraph
p = doc.add_paragraph('Some text content.')

# Formatting
run = p.add_run('Bold italic text')
run.bold = True
run.italic = True
run.font.size = Pt(12)
run.font.name = 'Calibri'
run.font.color.rgb = RGBColor(0, 0, 0)

# Alignment
p.alignment = WD_ALIGN_PARAGRAPH.CENTER

# Line spacing
from docx.shared import Pt as PtSpacing
p.paragraph_format.line_spacing = 1.5
p.paragraph_format.space_after = Pt(6)
p.paragraph_format.space_before = Pt(6)
```

### 4. Tables
```python
table = doc.add_table(rows=3, cols=4, style='Table Grid')
table.alignment = WD_TABLE_ALIGNMENT.CENTER

# Access cells
cell = table.cell(0, 0)
cell.text = 'Header 1'

# Merge cells
cell_a = table.cell(0, 0)
cell_b = table.cell(0, 2)
cell_a.merge(cell_b)

# Cell shading
shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="D9E2F3"/>')
cell._tc.get_or_add_tcPr().append(shading)

# Cell vertical alignment
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
```

### 5. Images
```python
doc.add_picture('path/to/image.png', width=Inches(5.5))
# Position inline
last_paragraph = doc.paragraphs[-1]
last_paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
```

### 6. Lists (Bullet & Numbered)
```python
# Bullet list
doc.add_paragraph('Item 1', style='List Bullet')
doc.add_paragraph('Item 2', style='List Bullet')

# Numbered list
doc.add_paragraph('First item', style='List Number')
doc.add_paragraph('Second item', style='List Number')
```

### 7. Page Breaks
```python
doc.add_page_break()
```

### 8. Headers & Footers
```python
section = doc.sections[0]
header = section.header
header_para = header.paragraphs[0]
header_para.text = 'Confidential'

footer = section.footer
footer_para = footer.paragraphs[0]
footer_para.text = 'Page '
# Add page number field
run = footer_para.add_run()
run._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>'))
run = footer_para.add_run()
run._r.append(parse_xml(f'<w:instrText {nsdecls("w")} xml:space="preserve"> PAGE </w:instrText>'))
run = footer_para.add_run()
run._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>'))
```

### 9. Styles
```python
# Modify built-in style
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(11)
style.paragraph_format.line_spacing = 1.15
```

### 10. Save
```python
doc.save('output/document.docx')
```

## Common Patterns

### Table with formatted header row
```python
table = doc.add_table(rows=1, cols=3, style='Table Grid')
hdr = table.rows[0].cells
headers = ['Name', 'Value', 'Description']
for i, text in enumerate(headers):
    hdr[i].text = text
    # Blue header background
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="4472C4"/>')
    hdr[i]._tc.get_or_add_tcPr().append(shading)
    for paragraph in hdr[i].paragraphs:
        for run in paragraph.runs:
            run.font.color.rgb = RGBColor(255, 255, 255)
            run.bold = True
```

### Repeated rows
```python
data = [['A', '1', 'First'], ['B', '2', 'Second']]
for item in data:
    row = table.add_row()
    for i, val in enumerate(item):
        row.cells[i].text = val
```

## Tips
- Always create output directory if missing: `Path(output_dir).mkdir(parents=True, exist_ok=True)`
- Use `doc.add_heading()` for TOC-compatible headings
- For complex templates, consider using a template .docx with placeholder text
- Avoid using python-docx 1.1.0+ unreleased features; stick to stable v0.8.11 API

## Example: Full Document Generator
```python
from pathlib import Path
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml

def generate_document(data, output_path):
    doc = Document()

    # --- Page margins ---
    for section in doc.sections:
        section.top_margin = Cm(2.54)
        section.bottom_margin = Cm(2.54)
        section.left_margin = Cm(2.54)
        section.right_margin = Cm(2.54)

    # --- Title ---
    title = doc.add_heading(data.get('title', 'Document'), level=0)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # --- Metadata ---
    meta = doc.add_paragraph()
    meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = meta.add_run(f"Date: {data.get('date', 'N/A')}")
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(100, 100, 100)

    doc.add_paragraph()  # spacer

    # --- Sections ---
    for section_data in data.get('sections', []):
        doc.add_heading(section_data.get('heading', ''), level=1)

        for content in section_data.get('content', []):
            if content['type'] == 'paragraph':
                p = doc.add_paragraph(content.get('text', ''))
                if 'alignment' in content:
                    p.alignment = {
                        'left': WD_ALIGN_PARAGRAPH.LEFT,
                        'center': WD_ALIGN_PARAGRAPH.CENTER,
                        'right': WD_ALIGN_PARAGRAPH.RIGHT,
                    }.get(content['alignment'])

            elif content['type'] == 'table':
                rows_data = content.get('rows', [])
                if rows_data:
                    table = doc.add_table(rows=len(rows_data), cols=len(rows_data[0]), style='Table Grid')
                    for i, row_data in enumerate(rows_data):
                        for j, cell_text in enumerate(row_data):
                            table.cell(i, j).text = str(cell_text)

            elif content['type'] == 'image':
                if Path(content.get('path', '')).exists():
                    doc.add_picture(content['path'], width=Inches(5))
                    last_p = doc.paragraphs[-1]
                    last_p.alignment = WD_ALIGN_PARAGRAPH.CENTER

        doc.add_paragraph()  # spacer

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    doc.save(output_path)
    return output_path
```
