# Document Generation with AI + Skills

This repository demonstrates how to build a document generator that creates .docx files using skills.

## Overview

The system consists of:

1. **Agent**: The `padernilla/AGENT.md` file defines an AI agent specialized in generating Word documents using the docx skill.

2. **Skill**: The `padernilla/skills/docx/SKILL.md` file contains the docx skill that provides instructions for creating, editing, and formatting .docx files programmatically using python-docx.

3. **Document Generator**: The `generate_greek_methodologies_research.py` script demonstrates how to create a comprehensive research document about Greek methodologies with proper formatting and layout.

## How to Use

### Prerequisites

- Python 3.10+
- python-docx library (install with: `pip install python-docx`)

### Running the Document Generator

1. Ensure Python and python-docx are installed:
   ```bash
   pip install python-docx
   ```

2. Run the document generation script:
   ```bash
   python generate_greek_methodologies_research.py
   ```

This will create a file named `greek_methodologies_research.docx` containing:

- A title and subtitle with custom formatting
- Introduction section
- Greek philosophical methodologies section with a comparison table
- Mathematical methodologies section with bullet points
- Scientific methodologies section with a data table
- Comparative analysis between Greek and modern methodologies
- Conclusion section
- Professional formatting throughout

## Skills Architecture

The skill-based approach allows for:

- **Modular design**: Each skill handles a specific type of document generation
- **Clear instructions**: Detailed documentation of tools, libraries, and methods
- **Reusable components**: Skills can be combined to create complex documents
- **Consistent output**: Standardized formats and validation

## Example Skill Usage

The docx skill provides:

- **Document creation**: Using `docx.Document()`
- **Content types**: Paragraphs, headings, tables, lists, images
- **Styling**: Font formatting, alignment, custom styles
- **Advanced features**: Headers/footers, templates, validation

## Generated Document Features

The example research document includes:

- Professional heading hierarchy
- Formatted tables for data presentation
- Bullet and numbered lists
- Custom styling and colors
- Page breaks for section separation
- Footers with page numbers
- Document metadata (title, author, subject)
- Comprehensive content on Greek methodologies

## Future Enhancements

Potential improvements include:

- Additional skills for other document formats (PDF, HTML)
- Template-based document generation
- Data import/export capabilities
- Version control for generated documents
- Collaboration features

## License

This repository is part of the document-skill project.