function toc(document, section) {
    const heading = new Paragraph()
        .addRun(section.title || 'Table of Contents')
        .heading(HeadingLevel.HEADING_1);
    document.addParagraph(heading);
    
    document.addParagraph(new Paragraph('Table of contents will be inserted here.'));
    
    document.addSectionBreak();
}

module.exports = toc;