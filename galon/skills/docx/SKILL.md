# DOCX Skill — Word Document Generator

## Purpose
Generates `.docx` files from structured content using `python-docx`.

## Usage
```powershell
python galon/skills/docx/generate.py --output output.docx --title "My Document" --sections "..."
```

## How to use this skill
When asked to create a `.docx` document:
1. Define the content structure (sections, headings, paragraphs, tables).
2. Call `generate.py` with the appropriate arguments.
3. The script outputs the file to the specified path.

## Document structure supported
- Title page
- Headings (H1, H2, H3)
- Paragraphs with formatting (bold, italic, lists)
- Tables
- Page breaks

## Script location
`galon/skills/docx/generate.py`
