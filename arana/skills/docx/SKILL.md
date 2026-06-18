# DOCX Document Generation Skill

You can generate professional `.docx` documents using the Node.js library in this project.

## How to use

Import the library and build a document config:

```typescript
import { createDocx, createDocxToFile } from "document-skill";
```

### DocumentConfig structure

```typescript
interface DocumentConfig {
  title?: string;
  author?: string;
  description?: string;
  sections?: {
    orientation?: "portrait" | "landscape";
    margins?: { top?: number; right?: number; bottom?: number; left?: number };
    pageNumber?: boolean;
    pageNumberStart?: number;
  };
  elements: DocumentElement[];
}
```

### Supported element types

**Paragraph** — free-form text with mixed formatting:
```typescript
{ type: "paragraph", children: [{ text: "Hello ", bold: true }, { text: "world" }], alignment: "center" }
```

**Heading** — section headings (level 1-6):
```typescript
{ type: "heading", children: [{ text: "Chapter 1" }], level: 1 }
```

**List** — bulleted or numbered lists:
```typescript
{ type: "list", items: [{ children: [{ text: "Item 1" }] }, { children: [{ text: "Item 2" }] }], numbering: "bullet" }
```
Numbering templates: `"bullet"`, `"decimal"`, `"lowerLetter"`, `"upperLetter"`, `"lowerRoman"`, `"upperRoman"`

**Table** — grid of cells, each cell containing elements:
```typescript
{ type: "table", rows: [{ cells: [{ children: [{ type: "paragraph", children: [{ text: "Cell 1" }] }] }] }] }
```

**Image** — embed images from file path:
```typescript
{ type: "image", path: "./logo.png", width: 400, height: 200, alignment: "center" }
```

**Page break**:
```typescript
{ type: "pageBreak" }
```

### Text run options

Each text run supports: `bold`, `italic`, `underline`, `strike`, `size` (half-points, e.g. 24 = 12pt), `color` (hex), `font`, `superScript`, `subScript`.

### Creating files

```typescript
// Get buffer
const buffer = await createDocx(config);

// Write directly to file
await createDocxToFile(config, "./output.docx");
```

## Example

```typescript
import { createDocxToFile } from "document-skill";

await createDocxToFile({
  title: "Report",
  author: "AI Agent",
  sections: { pageNumber: true },
  elements: [
    { type: "heading", children: [{ text: "Annual Report" }], level: 1 },
    { type: "paragraph", children: [{ text: "This is the introduction." }] },
    { type: "pageBreak" },
    { type: "heading", children: [{ text: "Findings" }], level: 2 },
    { type: "list", items: [
      { children: [{ text: "First finding" }] },
      { children: [{ text: "Second finding", bold: true }] },
    ], numbering: "decimal" },
  ],
}, "./report.docx");
```
