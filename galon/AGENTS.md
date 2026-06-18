# AGENTS - Document Generator

## Overview
This project generates `.docx` documents using AI skills. The skill system lives under `galon/skills/`.

## Structure
- `galon/skills/<skill-name>/SKILL.md` — defines a reusable skill (instructions + approach)
- `galon/AGENTS.md` — this file, agent instructions for the project

## How to build a docx skill
1. A skill encapsulates both the prompt/instructions AND the code/tool approach for generating a specific type of document.
2. Skills live in `galon/skills/<name>/` and contain:
   - `SKILL.md` — the skill definition (purpose, usage, template, instructions)
   - Any supporting scripts (e.g., `generate.ps1`, `build.py`, templates)
3. All document generation goes through the skill system — never generate files manually.

## Conventions
- Use python-docx for creating Word documents.
- Keep skills modular: one skill = one document type.
- Reference skills by their folder name in prompts.
- Skill descriptions should be clear enough for AI to self-serve.
