# Document Generator Project

This project generates `.docx` documents using AI and the `docx` skill.

## How it works

- The **docx skill** (`santos/skills/docx/SKILL.md`) provides instructions for generating DOCX files via `python-docx`.
- When asked to generate a document, the AI loads the skill and follows its guidance.
- Generated scripts go in `scripts/` unless otherwise specified.

## Workflow

1. User describes the document they want (meeting notes, report, letter, etc.)
2. AI loads the docx skill and writes a Python script using `python-docx`
3. AI runs the script to produce the `.docx` file
4. Output files go in `output/`
