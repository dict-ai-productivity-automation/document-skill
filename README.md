# Document Generation with AI + Skills

Build `.docx` documents using composable skill modules. Each module (cover, TOC, body, headers/footers) can be mixed and matched via a simple YAML/JSON config.

## Quick Start

```bash
npm install docx yaml
node build_node.js --config sample_config.yml
```

## Structure

- `build_node.js` — Node.js CLI entry point
- `nodejs_builder/` — builder package with composable modules
- `skills/docx/SKILL.md` — skill instructions for AI agents
- `output/` — generated documents
