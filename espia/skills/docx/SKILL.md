---
name: docx
description: Generate .docx files from structured prompts using python-docx
version: 1.0.0
---

# docx Skill

Generates formatted Word documents from structured input.

## Input Format

The skill accepts a dictionary with these fields:

```yaml
title: "Document Title"
author: "Author Name"
subject: "Document Subject"
keywords: ["keyword1", "keyword2"]
sections:
  - type: heading
    level: 1
    text: "Section Title"
  - type: paragraph
    text: "Body text with **bold**, *italic*, _underline_, ^superscript^, ~subscript~."
    style: "Normal"
    alignment: "left"
  - type: bullet_list
    items:
      - "Item 1"
      - "Item 2 with **bold**"
    style: "List Bullet"
  - type: numbered_list
    items:
      - "First item"
      - "Second item"
    style: "List Number"
  - type: table
    headers: ["Column 1", "Column 2", "Column 3"]
    rows:
      - ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"]
      - ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
    style: "Light Grid Accent 1"
    header_row: true
  - type: image
    path: "path/to/image.png"
    width: 500
    height: 300
    caption: "Figure 1: Description"
  - type: page_break
  - type: footnote
    text: "Footnote reference text"
  - type: header
    text: "Header text"
    alignment: "center"
  - type: footer
    text: "Page "
    page_numbers: true
    alignment: "center"
```

## Supported Section Types

| Type | Description |
|------|-------------|
| `heading` | Headings level 1-9 |
| `paragraph` | Body text with inline formatting |
| `bullet_list` | Unordered list |
| `numbered_list` | Ordered list |
| `table` | Tables with optional header row |
| `image` | Embedded images with optional caption |
| `page_break` | Hard page break |
| `footnote` | Footnote reference |
| `header` | Document header |
| `footer` | Document footer with optional page numbers |

## Inline Formatting Markdown

- `**bold**` → bold
- `*italic*` → italic
- `_underline_` → underline
- `^superscript^` → superscript
- `~subscript~` → subscript
- `` `code` `` → monospace

## Implementation

Generator script: `espia/skills/docx/generate.py`

### Steps
1. Parse the input dictionary
2. Create a `python-docx` Document
3. Apply document metadata (author, subject, keywords)
4. Configure page setup (margins, orientation)
5. Add headers/footers if specified
6. Iterate sections and append elements with styling
7. Save to `output/<slugified-title>.docx`
8. Return the file path

### Style Defaults
- Font: Calibri, 11pt
- Heading 1: 24pt bold, space after 12pt
- Heading 2: 18pt bold, space after 10pt
- Heading 3: 14pt bold, space after 8pt
- Normal: 11pt, space after 6pt, line spacing 1.15
- List Bullet: 11pt, left indent 36pt
- List Number: 11pt, left indent 36pt
- Table: `Light Grid Accent 1`, header row bold
- Image caption: centered, italic, 9pt

## Usage

```python
from espia.skills.docx.generate import generate_docx

path = generate_docx("output/human-anatomy.docx", {
    "title": "Human Anatomy Research",
    "author": "Research Team",
    "subject": "Anatomy Overview",
    "keywords": ["anatomy", "biology", "research"],
    "sections": [
        {"type": "heading", "level": 1, "text": "Introduction"},
        {"type": "paragraph", "text": "The human body is..."},
        # ... more sections
    ]
})
print(f"Generated: {path}")
```

## Output

Returns absolute path to the generated `.docx` file.