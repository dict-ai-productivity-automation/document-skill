---
name: docx
description: Generates and manipulates Microsoft Word .docx files
---

# docx Skill

This skill provides the ability to generate .docx files using python-docx.

## Capabilities

- Create new blank documents
- Add paragraphs with custom formatting (font, size, bold, italic, color, alignment)
- Add headings (Levels 1-9)
- Create and format tables (merge cells, style headers, column width)
- Insert page breaks, section breaks
- Add page numbers, headers, and footers
- Set page margins and orientation
- Add bulleted and numbered lists
- Insert images (from file or URL)
- Apply styles (built-in and custom)
- Add hyperlinks
- Save to specified file path

## Usage

The skill uses `python-docx` library. Documents are built by:
1. Creating a `Document()` object
2. Adding content elements (paragraphs, tables, etc.)
3. Saving via `document.save(path)`
