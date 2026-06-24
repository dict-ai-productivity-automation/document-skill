"""Markdown and YAML frontmatter parser for academic documents.

This module parses Markdown files with YAML frontmatter into a structured
format suitable for DOCX generation.
"""

import yaml
import re
from pathlib import Path
from typing import Dict, List, Any


def parse_markdown(content: str) -> Dict[str, Any]:
    """Parse Markdown content with YAML frontmatter.

    Args:
        content: Raw Markdown content

    Returns:
        Dictionary containing parsed document data

    Raises:
        ValueError: If YAML frontmatter is invalid
    """
    # Extract YAML frontmatter
    yaml_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
    if not yaml_match:
        raise ValueError("Invalid YAML frontmatter format. Expected '---' at start and end.")

    yaml_content = yaml_match.group(1)
    markdown_content = yaml_match.group(2)

    try:
        frontmatter = yaml.safe_load(yaml_content)
    except yaml.YAMLError as e:
        raise ValueError(f"Invalid YAML frontmatter: {e}")

    # Validate required fields
    required_fields = ["title", "author", "date"]
    for field in required_fields:
        if field not in frontmatter:
            raise ValueError(f"Missing required field in YAML frontmatter: {field}")

    # Process references
    references = frontmatter.get("references", [])
    processed_references = []
    for ref in references:
        if isinstance(ref, dict):
            processed_references.append({
                "key": ref.get("key", ""),
                "text": ref.get("text", "")
            })
        else:
            # Handle simple string references
            processed_references.append({
                "key": f"ref{len(processed_references) + 1}",
                "text": str(ref)
            })

    # Extract sections from markdown
    sections = _extract_sections(markdown_content)

    return {
        "title": frontmatter["title"],
        "author": frontmatter["author"],
        "date": frontmatter["date"],
        "abstract": frontmatter.get("abstract", ""),
        "references": processed_references,
        "content": markdown_content,
        "sections": sections
    }


def _extract_sections(markdown_content: str) -> List[Dict[str, Any]]:
    """Extract sections from Markdown content.

    Args:
        markdown_content: Markdown content without frontmatter

    Returns:
        List of sections with level, title, and content
    """
    sections = []
    current_section = None
    current_content = []

    # Split by heading patterns
    lines = markdown_content.split('\n')
    for line in lines:
        # Check for heading patterns
        heading_match = re.match(r'^(#{1,6})\s+(.+)$', line)
        if heading_match:
            # Save previous section if exists
            if current_section is not None:
                sections.append({
                    "level": current_section["level"],
                    "title": current_section["title"],
                    "content": '\n'.join(current_content).strip()
                })

            # Start new section
            level = len(heading_match.group(1))
            title = heading_match.group(2)
            current_section = {
                "level": level,
                "title": title,
                "content": ""
            }
            current_content = []
        else:
            # Add to current section content
            if current_section is not None:
                current_content.append(line)

    # Add last section
    if current_section is not None:
        sections.append({
            "level": current_section["level"],
            "title": current_section["title"],
            "content": '\n'.join(current_content).strip()
        })

    return sections


def extract_citations(text: str) -> List[str]:
    """Extract citation references from text.

    Args:
        text: Text containing citations like [cite:key]

    Returns:
        List of citation keys
    """
    return re.findall(r'\[cite:([^\]]+)\]', text)


def format_reference(ref: Dict[str, str]) -> str:
    """Format a reference for output.

    Args:
        ref: Reference dictionary with key and text

    Returns:
        Formatted reference string
    """
    return ref["text"]
