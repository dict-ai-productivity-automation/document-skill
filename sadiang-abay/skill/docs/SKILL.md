# SKILL

# Academic DOCX Generator — Design Spec

## Overview

A skill-based academic document generator that converts Markdown to professionally formatted `.docx` files. The project consists of a Python CLI tool (`python-docx`) and a skill definition (`skill/docs/SKILL.md`) that guides AI assistants in writing structured academic Markdown and using the generator.

## Architecture

```
User describes paper
       ↓
Skill (SKILL.md) guides AI to write structured Markdown
       ↓
generate.py converts Markdown → DOCX
       ↓
Output: formatted academic .docx
```

### Files

- `skill/docs/SKILL.md` — Skill definition teaching how to write academic Markdown and use the generator
- `src/generate.py` — Python CLI entry point
- `src/parser.py` — Markdown/ YAML frontmatter parser
- `src/builder.py` — DOCX document builder (styles, sections, tables, etc.)
- `src/styles.py` — Academic style presets (fonts, spacing, margins)
- `requirements.txt` — Dependencies (`python-docx`, `pyyaml`, `markdown`)
- `AGENTS.md` — Project-level agent instructions

## Input Format (Markdown + YAML Frontmatter)

```markdown
---
title: "Paper Title"
author: "Author Name"
date: "2026"
abstract: |
  Brief summary of the paper...
references:
  - key: smith2020
    text: "Smith, J. (2020). Title. Journal."
---

## Introduction

Content here [cite:smith2020].
```

### Format Rules

- `# Title` — Document title (used for title page, not a section heading)
- `## Section` — Heading 1 (major sections: Introduction, Methodology, etc.)
- `### Subsection` — Heading 2
- `#### Sub-subsection` — Heading 3
- `[cite:key]` — In-text citation, matched to references list
- `![caption](path)` — Figure with caption
- Standard Markdown tables, lists, code blocks supported

## CLI Tool

```
python generate.py input.md -o output.docx [options]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output` | Output DOCX path | `output.docx` |
| `--font` | Body font | `Times New Roman` |
| `--font-size` | Body font size (pt) | `12` |
| `--heading-font` | Heading font | `Times New Roman` |
| `--line-spacing` | Line spacing | `1.5` |
| `--style` | Style preset (`apa`, `ieee`, `mla`, `custom`) | `apa` |
| `--margin` | Page margins (inches) | `1` |
| `--page-size` | Page size (`letter`, `a4`) | `letter` |
| `--toc` | Include table of contents | `true` |
| `--page-numbers` | Include page numbers | `true` |
| `--running-head` | Include running head | `false` |

## DOCX Output Features

- **Title page** — centered title, author, date, abstract box
- **Table of contents** — auto-generated from heading hierarchy
- **Section headings** — Heading 1/2/3 styles with numbering (1., 1.1, 1.1.1)
- **Body text** — justified, 1.5 line spacing, 0.5in first-line indent
- **Citations** — `[cite:key]` → bracketed references (e.g., [1] or Smith, 2020)
- **Reference list** — appended at end, formatted per selected style
- **Tables** — bordered, header row shading, captions above
- **Figures** — centered images with captions below
- **Code blocks** — monospace font, shaded background
- **Lists** — ordered and unordered with proper indentation
- **Headers/footers** — page numbers (bottom-center), optional running head
- **Page setup** — 1-inch margins, letter/A4 option

## Style Presets

### APA (default)
- Font: Times New Roman 12pt
- Spacing: double
- Margins: 1 inch
- Headings: bold, title case
- Citations: author-date (Smith, 2020)
- References: hanging indent, alphabetized

### IEEE
- Font: Times New Roman 10pt
- Spacing: single, double between paragraphs
- Columns: two-column layout
- Citations: bracketed numbers [1]
- References: numbered in order of appearance

### MLA
- Font: Times New Roman 12pt
- Spacing: double
- Heading: author, instructor, course, date (left)
- Citations: author-page (Smith 23)
- Works Cited: hanging indent, alphabetized

## Error Handling

- Missing input file → clear error message
- Invalid YAML → warn with line number, use defaults
- Unmatched `[cite:key]` → warn, render as literal text
- Missing image path → warn, skip figure
- Unsupported Markdown → warn, render as plain text

## Testing

- Unit tests for `parser.py`, `builder.py`, `styles.py`
- Integration test: sample.md → verify DOCX structure (sections, styles, TOC)
- Style preset tests: APA/IEEE/MLA output matches expected formatting

---

## Self-Review Notes

- No TBDs or TODOs
- All sections internally consistent
- Scope is focused: one generator, one skill, one input format
- Requirements are explicit with no ambiguity
