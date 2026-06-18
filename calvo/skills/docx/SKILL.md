# docx Skill

Builds, reads, edits, and manipulates Microsoft Word (.docx) documents using JavaScript and the `docx` library.

## Requirements

- Node.js 18+
- `docx` npm package (`npm install docx`)

## Usage

Call this agent when the user wants to generate or manipulate a .docx file. The agent will:

1. Map the requested document structure to `docx` library calls.
2. Handle tables, headings, paragraphs, lists, images, and formatting using JavaScript/Node.js.
3. Write the output to the specified path.

## Parameters

| Parameter | Type   | Description                               |
|-----------|--------|-------------------------------------------|
| output    | string | Path for the generated .docx file          |
| template  | string | Optional path to a .docx template file     |

## Examples

- "Generate a report docx with a title page, table of contents, and 3 sections"
- "Create an invoice template as a .docx file"
- "Convert this content into a polished Word document"

## Notes

- Always verify `docx` library is installed before proceeding.
- Use `docx` section/paragraph/run model.
- Prefer `docx` built-in styles over inline formatting.
- For all editing/analysis tasks, use JavaScript/Node.js libraries (e.g., `jszip`, `xml2js`) to manipulate the underlying XML, avoiding any external Python scripts.
