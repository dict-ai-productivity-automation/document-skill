const { Document } = require('docx');
const { Paragraph, TextRun, HeadingLevel } = require('docx');

const modules = {
    cover: require('./modules/cover'),
    toc: require('./modules/toc'),
    body: require('./modules/body'),
    headers_footers: require('./modules/headers_footers'),
};

class DocumentBuilder {
    constructor(config) {
        this.config = config;
        this.document = new Document();
        this.sections = config.sections || [];
    }

    build() {
        for (const section of this.sections) {
            const moduleName = section.module;
            const mod = modules[moduleName];
            if (mod) {
                mod(this.document, section);
            }
        }
        const outputPath = this.config.output || 'output/document.docx';
        this.document.save(outputPath);
        return outputPath;
    }
}

module.exports = { DocumentBuilder };