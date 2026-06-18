# Skill: docx Resume Generator

This skill uses the [`docx`](https://docx.js.org/) npm package to generate professional DOCX resume files.

## Setup

```bash
cd skills/docx
npm install
```

## Usage

Run the generator:

```bash
node src/generate-resume.mjs
```

Output is written to `skills/docx/output/resume.docx`.

## Architecture

All scripts live in `skills/docx/src/` and use ES module syntax.

### Key Modules

- **`generate-resume.mjs`** – the main entry point. Defines resume data and builds the document.

### `docx` API Patterns for Resumes

| Pattern | Code |
|---|---|
| Paragraph with bold heading | `new Paragraph({ children: [new TextRun({ text: "Title", bold: true, size: 24 })] })` |
| Bullet list | `new Paragraph({ bullet: { level: 0 }, children: [new TextRun("Item")] })` |
| Table | `new Table({ rows: [...] })` |
| Horizontal rule | `new Paragraph({ thematicBreak: true })` |
| Section break | `sectionProperties` on `Document` or `new Paragraph({ pageBreakBefore: true })` |

### Styling Conventions

- **Name (header):** 36pt bold, centered
- **Section headings:** 24pt bold, dark blue (#2E4057), underline
- **Body text:** 20pt, Calibri, single spacing
- **Dates:** right-aligned, italic, gray (#666666)
- **Bullets:** compact, 18pt

### File Structure

```
skills/docx/
  SKILL.md
  package.json
  src/
    generate-resume.mjs
  output/
    *.docx          (gitignored)
```

When adding new document types (cover letters, portfolios, etc.), create new files in `src/` following the same patterns.
