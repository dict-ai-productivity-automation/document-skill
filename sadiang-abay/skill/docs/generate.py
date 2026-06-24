#!/usr/bin/env python3
"""Academic DOCX Generator - CLI Entry Point

This script converts Markdown with YAML frontmatter to professionally
formatted DOCX files for academic papers.
"""

import argparse
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from parser import parse_markdown
from builder import build_docx
from styles import get_style_preset


def main():
    parser = argparse.ArgumentParser(
        description="Convert academic Markdown to DOCX"
    )
    parser.add_argument("input", help="Input Markdown file path")
    parser.add_argument("-o", "--output", default="output.docx", help="Output DOCX file path")
    parser.add_argument("--font", default="Times New Roman", help="Body font")
    parser.add_argument("--font-size", type=int, default=12, help="Body font size (pt)")
    parser.add_argument("--heading-font", default="Times New Roman", help="Heading font")
    parser.add_argument("--line-spacing", type=float, default=1.5, help="Line spacing")
    parser.add_argument("--style", default="apa", choices=["apa", "ieee", "mla", "custom"], help="Style preset")
    parser.add_argument("--margin", type=float, default=1.0, help="Page margins (inches)")
    parser.add_argument("--page-size", default="letter", choices=["letter", "a4"], help="Page size")
    parser.add_argument("--toc", action="store_true", default=True, help="Include table of contents")
    parser.add_argument("--page-numbers", action="store_true", default=True, help="Include page numbers")
    parser.add_argument("--running-head", action="store_true", default=False, help="Include running head")

    args = parser.parse_args()

    try:
        # Parse input file
        print(f"Parsing {args.input}...")
        content = Path(args.input).read_text(encoding="utf-8")
        data = parse_markdown(content)

        # Get style preset
        style_config = get_style_preset(args.style)

        # Build DOCX
        print(f"Building DOCX with {args.style} style...")
        build_docx(
            data,
            args.output,
            font=args.font,
            font_size=args.font_size,
            heading_font=args.heading_font,
            line_spacing=args.line_spacing,
            margin=args.margin,
            page_size=args.page_size,
            include_toc=args.toc,
            include_page_numbers=args.page_numbers,
            include_running_head=args.running_head,
            **style_config
        )

        print(f"Successfully generated {args.output}")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
