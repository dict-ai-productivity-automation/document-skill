# Agent

## Project
Document generator that builds `.docx` files using composable skill modules. Users provide a YAML/JSON config describing the document structure; the system assembles a Word document from reusable building blocks (cover page, TOC, body sections, headers/footers).

## Architecture

```
rapista/
├── build_node.js              # Node.js CLI entry point
├── nodejs_builder/
│   ├── __init__.js            # Exports build(config) -> str
│   ├── builder.js             # DocumentBuilder: iterates sections, dispatches to modules
│   └── modules/               # Module implementations (cover, toc, body, headers_footers)
├── skills/
│   └── docx/
│       └── SKILL.md           # Skill documentation
├── output/                    # Generated .docx files land here
├── sample_config.yml          # Example config
└── AGENTS.md                  # This file
```

**Flow**: `build_node.js --config <file>` → loads YAML/JSON → creates `DocumentBuilder` → loops over `sections` → dispatches each to its module function → saves `.docx` to `output/`.

## Available Skills

### docx
Build a complete `.docx` document. Uses the `docx` npm package to assemble a Word document from composable modules. Accepts a JSON/YAML config describing the document structure, styling, and content sources.

**Modules** (defined in `nodejs_builder/modules/`):

| Module            | Function               | Config Keys                            |
|-------------------|------------------------|----------------------------------------|
| `cover`           | `cover()`              | `title`, `subtitle`                    |
| `toc`             | `toc()`                | `title` (default: "Table of Contents") |
| `body`            | `body()`               | `title`, `content`                     |
| `headers_footers` | `headers_footers()`    | `header_text`, `footer_text`           |

## Commands

### Setup
```bash
npm install docx yaml
```

### Build a document
```bash
node build_node.js --config sample_config.yml
```

### Add a new module
1. Define a function in `nodejs_builder/modules/` that accepts `(document, section)`.
2. Import and register it in `nodejs_builder/builder.js` by adding to the `modules` object.

## Agent Instructions
- When working on document generation, load the `docx` skill from `skills/docx/SKILL.md`.
- Follow the skill's instructions for creating and combining document components.
- When adding new module types, define the function in `nodejs_builder/modules/` and register it in `builder.js`.
- All generated files go under `output/`.
- For configs, use `sample_config.yml` as the template.
- Use `build_node.js` with `--config` to build; the helper `nodejs_builder.build(config)` is also importable for programmatic use.
