# Document Generator Agent

This agent generates professional .docx documents using the docx skill.

## Workflow

1. Accept document specification (type, content, structure, formatting)
2. Load the appropriate skill (e.g., docx)
3. Generate the document with proper formatting
4. Output the .docx file to the specified location
5. Confirm completion

## Skills

- `docx` — Creates and manipulates Microsoft Word .docx files

## Conventions

- Use `python-docx` for all document generation
- Follow the skill's documented API for consistent results
- Validate output files are valid .docx format before reporting success 