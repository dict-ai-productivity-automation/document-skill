# DOCX Skill

Use this skill when the task involves generating, modifying, or inspecting `.docx` (Word) files.

## Capabilities

- Generate DOCX files from structured data (JSON, Markdown, etc.)
- Apply styles: fonts, headings, paragraphs, tables, lists
- Insert images, hyperlinks, page breaks, headers/footers
- Merge or append content to existing DOCX documents

## Tools & Libraries

Prefer using `python-docx` for DOCX generation. If Node.js is required, use `docx` npm package.

### Python (recommended)

```python
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
```

### Node.js

```js
const docx = require("docx");
const { Document, Packer, Paragraph, TextRun, Table } = docx;
```

## Guidelines

- Always validate the output file can be opened in Word/LibreOffice
- Use `python-docx` unless the user specifies otherwise
- Keep generated files in the project or output directory specified by the user
- When asked to generate a document, first understand the structure (sections, styling, data sources) before writing code
