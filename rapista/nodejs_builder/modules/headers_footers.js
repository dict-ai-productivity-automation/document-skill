function headers_footers(document, section) {
    for (let i = 0; i < document.sectionProperties.length; i++) {
        const sectionObj = document.sectionProperties[i];
        
        if (sectionObj.header) {
            const header = sectionObj.header;
            header.paragraphs = header.paragraphs || [];
            const p = header.paragraphs[0] || new Paragraph();
            p.addRun(section.header_text || '');
            header.paragraphs[0] = p;
        }
        
        if (sectionObj.footer) {
            const footer = sectionObj.footer;
            footer.paragraphs = footer.paragraphs || [];
            const pf = footer.paragraphs[0] || new Paragraph();
            pf.addRun(section.footer_text || '');
            pf.center();
            footer.paragraphs[0] = pf;
        }
    }
}

module.exports = headers_footers;