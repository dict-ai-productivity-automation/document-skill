function body(document, section) {
    const heading = new Paragraph()
        .addRun(section.title || 'Section')
        .heading(HeadingLevel.HEADING_1);
    document.addParagraph(heading);
    
    const content = section.content || '';
    const paragraphs = content.split('\n');
    for (const paraText of paragraphs) {
        if (paraText.trim()) {
            document.addParagraph(new Paragraph(paraText.trim()));
        }
    }
}

module.exports = body;