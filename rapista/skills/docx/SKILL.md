# docx Skill

Build a `.docx` document from a YAML/JSON config file using JavaScript/Node.js.

## Usage

```bash
npm install docx yaml
node build_node.js --config <config.yml>
```

## Config Structure

```yaml
output: "output/document.docx"
sections:
  - module: cover
    title: "My Document"
    subtitle: "Generated with docx"
  - module: toc
    title: "Table of Contents"
  - module: body
    title: "Introduction"
    content: "This is the body content."
  - module: headers_footers
    header_text: "Confidential"
    footer_text: "Page "
```

## Modules

| Module          | Purpose                        |
|-----------------|--------------------------------|
| `cover`         | Title page with styling        |
| `toc`           | Table of contents page         |
| `body`          | Main content with headings     |
| `headers_footers` | Header and footer for all pages |

## Module Components

Each module is composable. Add `sections` entries to combine them in order.

## Output

All generated files go under `output/`.

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
└── AGENTS.md                  # Agent instructions
```

**Flow**: `build_node.js --config <file>` → loads YAML/JSON → creates `DocumentBuilder` → loops over `sections` → dispatches each to its module function → saves `.docx` to `output/`.

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