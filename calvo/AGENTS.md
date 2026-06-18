# Agents

This file defines the subagents available for the Calvo document generator.

## docx-builder

Builds .docx files using the python-docx library. Delegates to the `skills/docx` skill for document creation.

**When to use:** When the user asks to generate, build, or create a .docx document.

**Skill:** `skills/docx/SKILL.md`

## skill-writer

Writes or improves skill markdown files (SKILL.md) in the `skills/` directory. Knows the SKILL.md format including parameters, examples, and instructions for the agent.

**When to use:** When the user asks to create or edit a skill file.

## project-inspector

Explores the codebase to understand structure, conventions, and dependencies before making changes.

**When to use:** For any new feature or refactor task that requires understanding the existing code.
