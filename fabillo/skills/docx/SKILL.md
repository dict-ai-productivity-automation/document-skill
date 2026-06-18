# docx Skill

## Purpose

Provides knowledge and reusable patterns for generating `.docx` (Office Open XML) files using JavaScript/Node.js with the `docx` library.

## Dependencies

Install `docx` (if not already present):

```bash
npm install docx
```

## Core API

| Task | Code |
|------|------|
| Create document | `const doc = new Document();` |
| Add heading | `doc.addHeading('Title', 1);` |
| Add paragraph | `doc.addParagraph('Some text');` |
| Add bold/italic | `const run = paragraph.addRun('bold text'); run.bold = true;` |
| Add bullet list | `doc.addParagraph('item', { listType: 'bulleted' });` |
| Add numbered list | `doc.addParagraph('item', { listType: 'numbered' });` |
| Add table | `const table = doc.addTable(3, 2); table.getCell(0, 0).text = 'val';` |
| Add image | `doc.addImage('path.png', { width: 100 });` |
| Set font | `run.font.name = 'Calibri'; run.font.size = 12;` |
| Save | `await doc.save('output.docx');` |

## Imports

```javascript
const { Document, Packer } = require('docx');
```

## Advice

- Always close the document with `.save()` before reading/returning the file.
- Use pixel values for dimensions (e.g., `{ width: 100 }`).
- For colour, use `{ color: 'FF0000' }`.
- Tables can be styled with `table.style = 'Table Grid';`.
- Headers/footers via `doc.addHeader()` / `doc.addFooter()`.
- Use `Packer` to write the document to a file or buffer.
