# Docx Builder Skill

Use Node.js docx library (https://github.com/SchweizerischeBundesbahnen/node-docx) to generate DOCX files programmatically.

## Capabilities
- Create documents with headings, paragraphs, lists, tables, images
- Apply styles, fonts, colors, alignment
- Add headers, footers, page numbers
- Insert tables with merged cells and formatting
- Add images with sizing and positioning
- Handle document sections and page breaks

## Conventions
- Use `DocxBuilder` class from `anecita` package
- Use `node-docx` library (install via `npm install docx`)
- Save output files with `.docx` extension
- Use `Inches` or `Cm` from `docx` for dimensions
- Use `Pt` from `docx` for font sizes
- Use `colors` object from `anecita.styles` for predefined colors
- Use `docx.AlignmentType` for alignment options

## Common Workflow
1. Import `DocxBuilder` from `anecita`
2. Create a `new DocxBuilder()` instance
3. Add content (headings, paragraphs, tables, images)
4. Style appropriately using options
5. Save with `builder.save(path)`

## Example
```javascript
const { DocxBuilder } = require('anecita');

const builder = new DocxBuilder();
builder.addHeading('Title', 1);
builder.addParagraph('Content here', {
  bold: true,
  size: 14,
  color: { r: 31, g: 78, b: 121 }, // PRIMARY color
});
builder.addTable(['Header1', 'Header2'], [['Row1Col1', 'Row1Col2']]);
builder.save('document.docx');
```
