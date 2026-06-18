const docx = require('docx');
const { Paragraph, TextRun, HeadingLevel, Packer } = docx;
const fs = require('fs');

const doc = new docx.Document({ 
    sections: [{
        children: [
            new Paragraph({
                children: [
                    new TextRun({ text: 'Hello World', bold: true, size: 32 })
                ]
            })
        ]
    }]
});

Packer.toBuffer(doc).then(b => { 
    fs.writeFileSync('test.docx', b); 
    console.log('File written successfully'); 
}).catch(e => console.error('Error:', e));
