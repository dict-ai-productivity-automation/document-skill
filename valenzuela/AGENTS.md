# Agent

## Project
Document generator that builds .docx files. Uses skills for modular document creation workflows.

## Skills
- `docx` — Generate .docx files with content, tables, images, and formatting

## Commands
- `generate` — Run the document generator
- `test` — Run tests
- `lint` — Lint and format code

## Conventions
- All docx generation logic lives in skill files under `skills/`
- Skills define prompts and instructions the agent follows when generating documents
- Use `python-docx` library for .docx creation
- Prefer modular, reusable skill definitions over monolithic scripts