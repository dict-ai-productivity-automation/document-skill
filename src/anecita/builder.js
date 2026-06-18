const docx = require('docx');
const { createParagraph, createTextRun } = docx;
const { colors, sizes, fonts, margins, rgbToHex } = require('./styles');

class DocxBuilder {
    constructor() {
        this.document = new docx.Document();
        this._setupDefaultStyles();
    }

    _setupDefaultStyles() {
        const normalStyle = this.document.styles.getStyleById('Normal');
        if (normalStyle) {
            normalStyle.font = { name: fonts.BODY };
            normalStyle.size = sizes.BODY;
            normalStyle.color = colors.DARK;
            normalStyle.paragraphFormat = {
                spaceAfter: sizes.BODY,
                lineSpacing: 1.15,
            };
        }
    }

    setMargins(marginType = 'NORMAL') {
        const margin = margins[marginType] || margins.NORMAL;
        this.document.setMargins(margin.top, margin.bottom, margin.left, margin.right);
        return this;
    }

    addHeading(text, level = 1) {
        const heading = new docx.Heading(text, level);
        const run = heading.getChildren()[0].getChildren()[0];
        run.font = { color: rgbToHex(colors.PRIMARY), name: fonts.HEADING };
        this.document.addHeading(heading);
        return heading;
    }

    addParagraph(text, options = {}) {
        const paragraphOptions = {
            alignment: options.alignment || docx.AlignmentType.LEFT,
            spacing: {
                after: options.spacingAfter || 0,
            },
        };

        const paragraph = new docx.Paragraph(paragraphOptions);
        const run = new docx.TextRun(text);
        run.bold = options.bold || false;
        run.italic = options.italic || false;
        run.font = { name: fonts.BODY };
        run.size = options.size || sizes.BODY;
        run.color = options.color ? rgbToHex(options.color) : rgbToHex(colors.DARK);
        paragraph.addRun(run);
        this.document.addParagraph(paragraph);
        return paragraph;
    }

    addMixedParagraph(parts, options = {}) {
        const paragraphOptions = {
            alignment: options.alignment || docx.AlignmentType.LEFT,
            spacing: {
                after: options.spacingAfter || 0,
            },
        };

        const paragraph = new docx.Paragraph(paragraphOptions);
        parts.forEach(part => {
            const run = new docx.TextRun(part.text);
            run.bold = part.bold || false;
            run.italic = part.italic || false;
            run.font = { name: part.font || fonts.BODY };
            run.size = part.size || sizes.BODY;
            run.color = part.color ? rgbToHex(part.color) : rgbToHex(colors.DARK);
            paragraph.addRun(run);
        });
        this.document.addParagraph(paragraph);
        return paragraph;
    }

    addTable(headers, rows, colWidths = null, headerColor = colors.PRIMARY) {
        const tableRows = [];

        const headerRow = new docx.TableRow({});
        headers.forEach((header, index) => {
            const cell = new docx.TableCell({});
            const paragraph = new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
            });
            const run = new docx.TextRun(header);
            run.bold = true;
            run.font = { name: fonts.BODY };
            run.size = sizes.TABLE_HEADER;
            run.color = colors.WHITE;
            paragraph.addRun(run);
            cell.addParagraph(paragraph);

            const shading = {
                fill: rgbToHex(headerColor),
            };
            cell.shading = shading;

            headerRow.addCell(cell);
        });
        tableRows.push(headerRow);

        rows.forEach(rowData => {
            const row = new docx.TableRow({});
            rowData.forEach(cellText => {
                const cell = new docx.TableCell({});
                const paragraph = new docx.Paragraph({});
                const run = new docx.TextRun(cellText.toString());
                run.font = { name: fonts.BODY };
                run.size = sizes.TABLE_CELL;
                run.color = colors.DARK;
                paragraph.addRun(run);
                cell.addParagraph(paragraph);
                row.addCell(cell);
            });
            tableRows.push(row);
        });

        const table = new docx.Table(tableRows);
        table.align = docx.AlignmentType.CENTER;
        this.document.addTable(table);
        return table;
    }

    addImage(imagePath, options = {}) {
        const imageOptions = {
            width: options.width || 100,
            height: options.height || 100,
        };

        const image = new docx.Image(imagePath, imageOptions);
        const paragraph = new docx.Paragraph({
            alignment: options.alignment || docx.AlignmentType.CENTER,
        });
        paragraph.addImage(image);
        this.document.addParagraph(paragraph);
        return image;
    }

    addPageBreak() {
        this.document.addSectionBreak();
        return this;
    }

    addHorizontalRule() {
        const paragraph = new docx.Paragraph({
            spacing: {
                before: 360,
                after: 360,
            },
        });
        paragraph.addRun('');
        paragraph.getChildren()[0].border = {
            bottom: {
                style: docx.BorderStyle.SINGLE,
                size: 6,
                color: colors.TABLE_BORDER,
            },
        };
        this.document.addParagraph(paragraph);
        return paragraph;
    }

    addHeader(text, alignment = docx.AlignmentType.LEFT) {
        const section = this.document.getSection(0);
        const header = section.getHeader();
        const paragraph = new docx.Paragraph({
            alignment: alignment,
        });
        const run = new docx.TextRun(text);
        run.font = { name: fonts.BODY };
        run.size = sizes.SMALL;
        run.color = colors.GRAY;
        paragraph.addRun(run);
        header.addParagraph(paragraph);
        return paragraph;
    }

    addFooter(text, alignment = docx.AlignmentType.LEFT) {
        const section = this.document.getSection(0);
        const footer = section.getFooter();
        const paragraph = new docx.Paragraph({
            alignment: alignment,
        });
        const run = new docx.TextRun(text);
        run.font = { name: fonts.BODY };
        run.size = sizes.SMALL;
        run.color = colors.GRAY;
        paragraph.addRun(run);
        footer.addParagraph(paragraph);
        return paragraph;
    }

    save(path) {
        return this.document.save(path);
    }
}

module.exports = DocxBuilder;