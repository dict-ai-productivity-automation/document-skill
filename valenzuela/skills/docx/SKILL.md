# Skill: docx

## Description
Generate .docx files with content, tables, images, and formatting using Node.js and the `docx` library.

## When to use
Use this skill when the task involves creating, modifying, or generating Word documents (.docx files).

## Instructions
1. Initialize the project with `npm init -y` if not already done.
2. Install the `docx` library: `npm install docx`
3. Place generated documents in the `output/` directory.
4. Use the `Document` class from the `docx` package to create new documents.
5. Use `Packer` to save the document.

## Example usage
```javascript
const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");

const doc = new Document({
    sections: [{
        children: [
            new Paragraph({
                children: [
                    new TextRun("Hello World"),
                ],
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("output/example.docx", buffer);
});
```

## Files
- `skills/docx/` — Skill definition and related scripts/helpers
