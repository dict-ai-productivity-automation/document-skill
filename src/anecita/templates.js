const DocxBuilder = require('./builder');
const { colors, sizes, margins } = require('./styles');
const docx = require('docx');

class ReportTemplate {
    constructor(title, author = null, dateStr = null) {
        this.builder = new DocxBuilder();
        this.title = title;
        this.author = author;
        this.dateStr = dateStr || new Date().toISOString().split('T')[0];
    }

    build(sections) {
        this.builder.setMargins(margins.NORMAL);
        this._addTitlePage();
        this.builder.addPageBreak();
        sections.forEach(section => {
            this.builder.addHeading(section.heading, 1);
            (section.body || []).forEach(item => {
                if (item.type === 'paragraph') {
                    this.builder.addParagraph(item.text, {
                        bold: item.bold,
                        size: item.size,
                        color: item.color,
                        alignment: item.alignment,
                    });
                } else if (item.type === 'table') {
                    this.builder.addTable(item.headers, item.rows, item.colWidths);
                } else if (item.type === 'image') {
                    this.builder.addImage(item.path, {
                        width: item.width,
                        height: item.height,
                        alignment: item.alignment || docx.AlignmentType.CENTER,
                    });
                }
            });
        });
        return this.builder;
    }

    _addTitlePage() {
        this.builder.addParagraph('');
        this.builder.addParagraph('');
        this.builder.addParagraph('');
        this.builder.addParagraph(this.title, {
            bold: true,
            size: sizes.TITLE,
            color: colors.PRIMARY,
            alignment: docx.AlignmentType.CENTER,
            spacingAfter: Pt(24),
        });
        if (this.author) {
            this.builder.addParagraph(`Author: ${this.author}`, {
                size: sizes.HEADING_3,
                color: colors.GRAY,
                alignment: docx.AlignmentType.CENTER,
            });
        }
        this.builder.addParagraph(`Date: ${this.dateStr}`, {
            size: sizes.BODY,
            color: colors.GRAY,
            alignment: docx.AlignmentType.CENTER,
        });
    }
}

class InvoiceTemplate {
    constructor(invoiceNumber, companyName, clientName, dateStr = null) {
        this.builder = new DocxBuilder();
        this.invoiceNumber = invoiceNumber;
        this.companyName = companyName;
        this.clientName = clientName;
        this.dateStr = dateStr || new Date().toISOString().split('T')[0];
    }

    build(lineItems, taxRate = 0.0, notes = null) {
        this.builder.setMargins(margins.NORMAL);
        this._addHeader();
        this.builder.addHorizontalRule();
        this._addInfoBlock();
        this.builder.addHeading('Invoice Details', 2);
        const subtotal = this._addLineItemsTable(lineItems);
        this._addTotals(subtotal, taxRate);
        if (notes) {
            this.builder.addParagraph('');
            this.builder.addParagraph(`Notes: ${notes}`, {
                italic: true,
                color: colors.GRAY,
            });
        }
        return this.builder;
    }

    _addHeader() {
        this.builder.addParagraph('INVOICE', {
            bold: true,
            size: sizes.TITLE,
            color: colors.PRIMARY,
            alignment: docx.AlignmentType.RIGHT,
        });
        this.builder.addParagraph(`#${this.invoiceNumber}`, {
            size: sizes.HEADING_2,
            color: colors.GRAY,
            alignment: docx.AlignmentType.RIGHT,
        });
    }

    _addInfoBlock() {
        const info = [
            { text: this.companyName, bold: true, size: sizes.HEADING_3 },
            { text: `Date: ${this.dateStr}`, size: sizes.BODY },
            { text: `Bill To: ${this.clientName}`, size: sizes.BODY },
        ];
        info.forEach(item => {
            this.builder.addParagraph(item.text, {
                bold: item.bold,
                size: item.size,
                color: colors.DARK,
            });
        });
    }

    _addLineItemsTable(lineItems) {
        const headers = ['#', 'Description', 'Qty', 'Unit Price', 'Total'];
        const rows = [];
        let subtotal = 0;
        lineItems.forEach((item, index) => {
            const qty = item.qty || 1;
            const unitPrice = item.unit_price || 0;
            const total = qty * unitPrice;
            subtotal += total;
            rows.push([
                (index + 1).toString(),
                item.description,
                qty.toString(),
                `$${unitPrice.toFixed(2)}`,
                `$${total.toFixed(2)}`,
            ]);
        });
        this.builder.addTable(headers, rows);
        return subtotal;
    }

    _addTotals(subtotal, taxRate) {
        const tax = subtotal * taxRate;
        const grandTotal = subtotal + tax;
        this.builder.addParagraph('');
        const lines = [
            ['Subtotal:', `$${subtotal.toFixed(2)}`],
            [`Tax (${(taxRate * 100).toFixed(0)}%):`, `$${tax.toFixed(2)}`],
            ['Total:', `$${grandTotal.toFixed(2)}`],
        ];
        lines.forEach(([label, value], index) => {
            const isBold = label === 'Total:';
            this.builder.addMixedParagraph([
                { text: label, bold: isBold, size: sizes.BODY, color: colors.DARK },
                { text: `  ${value}`, bold: isBold, size: sizes.BODY, color: colors.PRIMARY },
            ], {
                alignment: docx.AlignmentType.RIGHT,
            });
        });
    }
}

class LetterTemplate {
    constructor(sender, recipient, subject, dateStr = null) {
        this.builder = new DocxBuilder();
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.dateStr = dateStr || new Date().toISOString().split('T')[0];
    }

    build(bodyParagraphs, closing = 'Sincerely', signatureName = null) {
        this.builder.setMargins(margins.WIDE);
        this._addSenderBlock();
        this.builder.addParagraph('');
        this.builder.addParagraph(this.dateStr);
        this.builder.addParagraph('');
        this._addRecipientBlock();
        this.builder.addParagraph('');
        this.builder.addParagraph(`Re: ${this.subject}`, {
            bold: true,
            size: sizes.HEADING_3,
            color: colors.PRIMARY,
        });
        this.builder.addParagraph('');
        bodyParagraphs.forEach(para => {
            this.builder.addParagraph(para, { size: sizes.BODY });
            this.builder.addParagraph('');
        });
        this.builder.addParagraph('');
        this.builder.addParagraph(closing);
        this.builder.addParagraph('');
        this.builder.addParagraph('');
        this.builder.addParagraph(signatureName || this.sender, { bold: true });
        return this.builder;
    }

    _addSenderBlock() {
        this.sender.split('\n').forEach(line => {
            this.builder.addParagraph(line, { size: sizes.BODY, color: colors.DARK });
        });
    }

    _addRecipientBlock() {
        this.recipient.split('\n').forEach(line => {
            this.builder.addParagraph(line, { size: sizes.BODY, color: colors.DARK });
        });
    }
}

module.exports = {
    ReportTemplate,
    InvoiceTemplate,
    LetterTemplate,
};