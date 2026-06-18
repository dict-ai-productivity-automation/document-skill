# Letter Generation

## Template
Use `LetterTemplate` for formal correspondence with:
- Sender and recipient blocks
- Date, subject line (Re:)
- Body paragraphs, closing, signature

```javascript
const { LetterTemplate } = require('anecita');

const letter = new LetterTemplate(
    'Dr. Emily Carter\n789 Pine Road\nLos Angeles, CA 90001',
    'Prof. Michael Torres\n321 Cedar Lane\nChicago, IL 60601',
    'Conference Speaker Invitation',
);
letter.build(
    bodyParagraphs: [
        'Dear Prof. Torres,',
        'We would be honored to invite you as a keynote speaker at the '
        '2026 International Conference on Artificial Intelligence, '
        'scheduled for September 15-17 in Los Angeles.',
        'Your expertise in machine learning ethics would provide invaluable '
        'insights to our attendees. Please let us know your availability '
        'by August 1st.',
    ],
    closing: 'Warm regards',
    signatureName: 'Dr. Emily Carter',
);
letter.builder.save('letter.docx');
```

## Style Notes
- Wide margins for formal appearance
- Bold subject line in primary color
- Standard business letter formatting
- Use `margins.WIDE` for letter template
