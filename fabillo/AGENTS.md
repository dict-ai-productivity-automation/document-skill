# Agents

## docx-builder

An agent that generates .docx files programmatically using the `docs/skills/docx/` skill. It accepts structured document definitions (titles, headings, paragraphs, tables, images, lists) and produces a valid Office Open XML (.docx) file.

### Responsibilities

- Receive a document specification from the user (or calling agent) describing content, structure, and formatting.
- Use the `docx` skill to build the document using JavaScript/Node.js.
- Save the output file to the path specified by the caller.
- Report success or failure including the output file path.

### Invocation

This agent is invoked automatically when a task involves generating a .docx file. Trigger phrases include:
- "generate a docx"
- "create a Word document"
- "build a .docx report"
- "make a document with ..."

### Workflow

1. Parse the document request: title, sections (headings + body), tables, images, lists, styling preferences.
2. Consult the `docx` skill for the correct JavaScript/Node.js API usage.
3. Write a Node.js script that builds the document.
4. Run the script to produce the `.docx` file.
5. Return the file path and a brief summary of what was generated.
