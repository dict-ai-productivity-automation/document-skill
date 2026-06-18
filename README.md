# Document Generation with AI + Skills

This project provides a Node.js-based document generation system using the `docx` library and opencode agents.

## Overview

The system includes:
- **Core Document Builder**: `DocxBuilder` class for creating DOCX files with headings, paragraphs, tables, images, headers, footers, and custom styling
- **Document Templates**: `ReportTemplate`, `InvoiceTemplate`, and `LetterTemplate` for common document types
- **Skills System**: Comprehensive skill documentation for different document types
- **Opencode Agents**: Two agents (`docx-builder` and `docx-skill-author`) for automated document generation

## Installation

```bash
npm install
```

## Usage

### Basic Document Generation

```javascript
const { DocxBuilder } = require('anecita');

const builder = new DocxBuilder();
builder.addHeading('Document Title', 1);
builder.addParagraph('Content here');
builder.addTable(['Header1', 'Header2'], [['Row1', 'Row2']]);
builder.save('document.docx');
```

### Report Template

```javascript
const { ReportTemplate } = require('anecita');

const report = new ReportTemplate('Annual Report', 'Author Name');
report.build([
    {
        heading: 'Section Title',
        body: [
            { type: 'paragraph', text: 'Content...' },
            { type: 'table', headers: ['Col1', 'Col2'], rows: [['A', 'B']] },
        ],
    },
]);
report.builder.save('report.docx');
```

### Invoice Template

```javascript
const { InvoiceTemplate } = require('anecita');

const invoice = new InvoiceTemplate('INV-001', 'Company', 'Client');
invoice.build(
    lineItems: [
        { description: 'Item', qty: 1, unit_price: 100 },
    ],
    taxRate: 0.1,
);
invoice.builder.save('invoice.docx');
```

### Letter Template

```javascript
const { LetterTemplate } = require('anecita');

const letter = new LetterTemplate('Sender', 'Recipient', 'Subject');
letter.build(['Dear recipient,', 'Content here.']);
letter.builder.save('letter.docx');
```

## Skills

The system includes comprehensive skills for different document types:

- `skill/docx/`: Generic docx builder skill
- `skill/docx/report.md`: Report generation skill
- `skill/docx/invoice.md`: Invoice generation skill
- `skill/docx/letter.md`: Letter generation skill

## Opencode Agents

Two agents are available:

1. **`docx-builder`**: Builds DOCX documents using Node.js and docx library
2. **`docx-skill-author`**: Creates and maintains docx generation skills

## Features

- **Styling**: Predefined fonts, colors, sizes, and margins
- **Tables**: Formatted tables with header styling and column widths
- **Images**: Support for adding images with sizing and alignment
- **Headers/Footers**: Custom header and footer support
- **Templates**: Ready-to-use templates for common document types
- **Skills**: Comprehensive skill documentation for each template type

## Files

- `src/anecita/`: Core Node.js package
  - `builder.js`: DocxBuilder class
  - `styles.js`: Style definitions
  - `templates.js`: Document templates
  - `__init__.js`: Package exports
- `anecita/`: Opencode configuration
  - `AGENTS.md`: Agent definitions
  - `skill/`: Skill documentation
- `package.json`: Node.js dependencies
- `.gitignore`: Git ignore file

## Testing

Run the test script to verify functionality:

```bash
node test_document_generation.js
```
