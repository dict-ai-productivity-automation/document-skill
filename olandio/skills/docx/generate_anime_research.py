from pathlib import Path
from docx import Document
from docx.shared import Pt, Cm, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml


def generate_anime_research(output_path: str):
    doc = Document()

    # Page setup for all sections
    for section in doc.sections:
        section.top_margin = Cm(2.54)
        section.bottom_margin = Cm(2.54)
        section.left_margin = Cm(2.54)
        section.right_margin = Cm(2.54)

    # Title
    title = doc.add_heading('Anime: A Research Overview', level=0)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Subtitle / metadata
    meta = doc.add_paragraph()
    meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = meta.add_run('Research Paper — Generated Document')
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(80, 80, 80)

    doc.add_paragraph()

    # Abstract
    doc.add_heading('Abstract', level=1)
    p = doc.add_paragraph(
        'This paper provides an overview of anime, covering its history, major genres, cultural impact, economics, and evolving international reception.'
    )
    p.paragraph_format.space_after = Pt(6)

    # Table of Contents placeholder (users can update TOC in Word)
    doc.add_paragraph('Table of Contents (update fields in Word to generate)', style='Intense Quote')

    doc.add_page_break()

    # Sections
    sections = [
        {
            'heading': 'History and Origins',
            'content': [
                'Anime originated in Japan in the early 20th century and developed distinct styles and production techniques after World War II.',
                'Notable early works and studios (e.g., Osamu Tezuka, Toei Animation) helped shape the medium and its storytelling approaches.'
            ]
        },
        {
            'heading': 'Major Genres and Themes',
            'content': [
                'Common genres include shounen (young male audience), shoujo (young female audience), seinen (adult men), josei (adult women), isekai (other world), mecha, slice-of-life, and more.',
                'Themes range from coming-of-age and friendship to complex social commentary and existential questions.'
            ]
        },
        {
            'heading': 'Artistic Style and Production',
            'content': [
                'Anime uses a variety of visual techniques: stylized character designs, expressive eyes, and dynamic camera work.',
                'Production pipelines typically separate key animation, in-betweening, coloring, and compositing; studios and freelance animators collaborate under tight schedules.'
            ]
        },
        {
            'heading': 'Cultural Impact and Reception',
            'content': [
                'Anime has influenced global pop culture, fashion, music, and fan communities; conventions and online platforms accelerate cultural exchange.',
                'Localization through dubbing/subtitles and streaming platforms expanded international accessibility.'
            ]
        },
        {
            'heading': 'Economics and Industry Trends',
            'content': [
                'Revenue streams include TV broadcasting, streaming, physical media, merchandise, and licensing.',
                'Crowdfunding, international partnerships, and global streaming deals have shifted production incentives and financing models.'
            ]
        },
        {
            'heading': 'Ethics, Representation, and Criticism',
            'content': [
                'Debates about representation, depiction of violence, gender, and cultural stereotypes are common in both academic and fan discourse.',
                'Creators and communities are increasingly engaging with constructive criticism and calls for inclusive storytelling.'
            ]
        },
        {
            'heading': 'Conclusion',
            'content': [
                'Anime remains a vibrant, evolving medium with significant creative and economic influence globally. Ongoing technological change and cross-cultural collaboration will continue to shape its future.'
            ]
        }
    ]

    for sec in sections:
        doc.add_heading(sec['heading'], level=2)
        for paragraph in sec['content']:
            p = doc.add_paragraph(paragraph)
            p.paragraph_format.space_after = Pt(6)

    # References (simple list)
    doc.add_heading('References', level=1)
    refs = [
        'Cavallaro, D. (2010). Anime and Memory: Aesthetic, Cultural, and Thematic Perspectives.',
        'Napier, S. J. (2005). Anime from Akira to Howl\'s Moving Castle: Experiencing Contemporary Japanese Animation.',
        'Denison, R. (2015). Anime: A Critical Introduction.'
    ]
    for r in refs:
        doc.add_paragraph(r, style='List Number')

    # Footer with page numbers
    for section in doc.sections:
        footer = section.footer
        footer_para = footer.paragraphs[0]
        footer_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        footer_run = footer_para.add_run()
        footer_run._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>'))
        footer_run = footer_para.add_run()
        footer_run._r.append(parse_xml(f'<w:instrText {nsdecls("w")} xml:space="preserve"> PAGE </w:instrText>'))
        footer_run = footer_para.add_run()
        footer_run._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>'))

    # Save
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out))
    return str(out)


if __name__ == '__main__':
    output = generate_anime_research(
        Path(__file__).parent.joinpath('output', 'anime_research.docx')
    )
    print(f'Generated: {output}')
