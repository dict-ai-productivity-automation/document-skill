# Agents

## Project Overview

This project builds a document generator that creates `.docx` files using opencode skills. The goal is to define skills that can compose, format, and generate Word documents from structured content.

## Skills

Skills are located under `padillo/skills/`. Each skill directory contains a `SKILLS.md` file that defines its behavior and instructions.

### Available Skills

- `docx` — Skill for generating DOCX documents. Defines how to create, style, and populate Word documents.

## Workflow

1. Define or extend a skill in `padillo/skills/<name>/SKILLS.md`
2. Use the skill via the opencode skill tool when building documents
3. Skills can reference each other for composable document generation

## Commands

- `opencode` — Run opencode with the project's skill context
- `npx opencode .` — Run opencode directly in the project root
