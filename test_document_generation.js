// Test script to verify the document generation system works end-to-end
const { DocxBuilder, ReportTemplate, InvoiceTemplate, LetterTemplate } = require('./src/anecita');
const path = require('path');

console.log('Testing document generation system...\n');

// Test 1: Basic DocxBuilder functionality
console.log('Test 1: Basic DocxBuilder functionality');
try {
    const builder = new DocxBuilder();
    builder.addHeading('Test Document', 1);
    builder.addParagraph('This is a test paragraph.', {
        bold: true,
        size: 14,
        color: { r: 31, g: 78, b: 121 },
    });
    builder.addParagraph('');
    builder.addHeading('Test Table', 2);
    builder.addTable(['Header1', 'Header2'], [['Row1Col1', 'Row1Col2']]);
    builder.save('test_basic.docx');
    console.log('✓ Basic DocxBuilder test passed');
} catch (error) {
    console.error('✗ Basic DocxBuilder test failed:', error.message);
}

// Test 2: ReportTemplate functionality
console.log('\nTest 2: ReportTemplate functionality');
try {
    const report = new ReportTemplate('Annual Report 2026', 'Test Author');
    report.build([
        {
            heading: 'Executive Summary',
            body: [
                { type: 'paragraph', text: 'This is a test report.', bold: true },
            ],
        },
    ]);
    report.builder.save('test_report.docx');
    console.log('✓ ReportTemplate test passed');
} catch (error) {
    console.error('✗ ReportTemplate test failed:', error.message);
}

// Test 3: InvoiceTemplate functionality
console.log('\nTest 3: InvoiceTemplate functionality');
try {
    const invoice = new InvoiceTemplate('INV-001', 'Company Name', 'Client Name');
    invoice.build(
        lineItems: [
            { description: 'Test Item', qty: 2, unit_price: 100 },
        ],
        taxRate: 0.1,
        notes: 'Test invoice',
    );
    invoice.builder.save('test_invoice.docx');
    console.log('✓ InvoiceTemplate test passed');
} catch (error) {
    console.error('✗ InvoiceTemplate test failed:', error.message);
}

// Test 4: LetterTemplate functionality
console.log('\nTest 4: LetterTemplate functionality');
try {
    const letter = new LetterTemplate(
        'Sender Name\n123 Main St',
        'Recipient Name\n456 Oak Ave',
        'Test Subject'
    );
    letter.build(['Dear recipient,', 'Test content here.']);
    letter.builder.save('test_letter.docx');
    console.log('✓ LetterTemplate test passed');
} catch (error) {
    console.error('✗ LetterTemplate test failed:', error.message);
}

console.log('\nAll tests completed!');
console.log('\nGenerated files: test_basic.docx, test_report.docx, test_invoice.docx, test_letter.docx');

// Clean up test files
const fs = require('fs');
['test_basic.docx', 'test_report.docx', 'test_invoice.docx', 'test_letter.docx'].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Cleaned up: ${file}`);
    }
});