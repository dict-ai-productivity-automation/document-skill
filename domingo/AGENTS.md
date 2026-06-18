# Agents

This project uses **skills** to generate, read, edit, and manipulate Microsoft Word (.docx) documents.

## Skills

- **docx** (`skills/docx/SKILL.md`) — Complete DOCX creation via `docx-js`, reading via `pandoc`, and XML-level editing via unpack/edit/pack workflow. Includes tracked changes, comments, images, tables, TOC, headers/footers, multi-column layouts, and more.

## Conventions

- The `docx` skill is auto-loaded when the user requests any Word document task (report, memo, letter, etc.). No manual loading needed.
- New documents: use JavaScript with the `docx` npm package (`npm install -g docx`), then validate with `python scripts/office/validate.py`.
- Editing existing documents: unpack → edit XML → repack workflow. Use the Edit tool for string replacements, never write Python scripts for edits.
- Author name for tracked changes and comments: "Claude" unless the user specifies otherwise.
- Use smart quote XML entities (`&#x201C;`, `&#x201D;`, `&#x2018;`, `&#x2019;`) for typographic quotes in XML edits.
- Always set page size explicitly (US Letter: 12240×15840 DXA). docx-js defaults to A4.
- Tables must use `WidthType.DXA` (never percentage). Set both table `columnWidths` and cell `width`.
- Lists: use numbering config with `LevelFormat.BULLET` / `LevelFormat.DECIMAL` — never unicode bullet characters.
- The `.git/opencode` file tracks the agent's cursor; no manual edits needed.
