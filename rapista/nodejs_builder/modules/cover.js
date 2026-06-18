function cover(document, section) {
    document.addParagraph();
    document.addParagraph();
    
    const title = new Paragraph()
        .addRun(section.title || 'Title')
        .bold(true)
        .size(26)
        .center();
    document.addParagraph(title);
    
    if (section.subtitle) {
        document.addParagraph();
        const subtitle = new Paragraph()
            .addRun(section.subtitle)
            .size(16)
            .center();
        document.addParagraph(subtitle);
    }
    
    document.addSectionBreak();
}

module.exports = cover;