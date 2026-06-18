# Agent Instructions

## Available skills

- **docx** (`arana/skills/docx/SKILL.md`) — Generate `.docx` documents programmatically. Use when the user asks to create Word documents, reports, invoices, letters, or any other DOCX output.

## Workflow

1. The project is a TypeScript library at the root of the workspace.
2. Read `arana/skills/docx/SKILL.md` for the full API reference before generating documents.
3. Build the project with `npm run build` after any changes to `src/`.
4. When a user requests a document, construct the appropriate `DocumentConfig` and call `createDocxToFile()` to produce the output file.
5. Always ask the user for the output path or place the file in the project root with a descriptive name.
