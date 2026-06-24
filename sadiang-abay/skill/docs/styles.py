"""Academic style presets for DOCX generation.

This module provides predefined style configurations for different
academic citation styles (APA, IEEE, MLA, Custom).
"""

from typing import Dict, Any


def get_style_preset(style_name: str) -> Dict[str, Any]:
    """Get style preset configuration.

    Args:
        style_name: Style name ("apa", "ieee", "mla", "custom")

    Returns:
        Style configuration dictionary

    Raises:
        ValueError: If style name is invalid
    """
    style_name = style_name.lower()

    if style_name == "apa":
        return _get_apa_style()
    elif style_name == "ieee":
        return _get_ieee_style()
    elif style_name == "mla":
        return _get_mla_style()
    elif style_name == "custom":
        return _get_custom_style()
    else:
        raise ValueError(f"Invalid style name: {style_name}. Must be one of: apa, ieee, mla, custom")


def _get_apa_style() -> Dict[str, Any]:
    """Get APA style configuration.

    Returns:
        APA style configuration
    """
    return {
        "font": "Times New Roman",
        "font_size": 12,
        "heading_font": "Times New Roman",
        "line_spacing": 2.0,
        "margin": 1.0,
        "page_size": "letter",
        "citation_format": "author-date",
        "reference_format": "hanging_indent",
        "heading_style": "bold_title_case",
        "title_page": True,
        "abstract_box": True,
        "toc": True,
        "page_numbers": True,
        "running_head": False
    }


def _get_ieee_style() -> Dict[str, Any]:
    """Get IEEE style configuration.

    Returns:
        IEEE style configuration
    """
    return {
        "font": "Times New Roman",
        "font_size": 10,
        "heading_font": "Times New Roman",
        "line_spacing": 1.0,
        "margin": 1.0,
        "page_size": "letter",
        "citation_format": "bracketed_numbers",
        "reference_format": "numbered",
        "heading_style": "bold",
        "title_page": True,
        "abstract_box": True,
        "toc": True,
        "page_numbers": True,
        "running_head": False,
        "two_column": True
    }


def _get_mla_style() -> Dict[str, Any]:
    """Get MLA style configuration.

    Returns:
        MLA style configuration
    """
    return {
        "font": "Times New Roman",
        "font_size": 12,
        "heading_font": "Times New Roman",
        "line_spacing": 2.0,
        "margin": 1.0,
        "page_size": "letter",
        "citation_format": "author_page",
        "reference_format": "hanging_indent",
        "heading_style": "none",
        "title_page": True,
        "abstract_box": False,
        "toc": True,
        "page_numbers": True,
        "running_head": False
    }


def _get_custom_style() -> Dict[str, Any]:
    """Get custom style configuration.

    Returns:
        Custom style configuration
    """
    return {
        "font": "Arial",
        "font_size": 11,
        "heading_font": "Arial",
        "line_spacing": 1.5,
        "margin": 1.5,
        "page_size": "a4",
        "citation_format": "custom",
        "reference_format": "custom",
        "heading_style": "custom",
        "title_page": True,
        "abstract_box": True,
        "toc": True,
        "page_numbers": True,
        "running_head": True
    }
