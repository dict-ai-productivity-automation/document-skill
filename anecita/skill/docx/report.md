# Report Generation

## Template
Use `ReportTemplate` for structured reports with:
- Title page (title, author, date)
- Multiple sections with headings and body content
- Tables, images, paragraphs per section

```javascript
const { ReportTemplate } = require('anecita');

const report = new ReportTemplate(
    'Annual Report 2026',
    'Jane Doe',
);
report.build([
    {
        heading: 'Executive Summary',
        body: [
            { type: 'paragraph', text: 'This quarter exceeded targets...' },
        ],
    },
    {
        heading: 'Revenue Breakdown',
        body: [
            { type: 'table', headers: ['Quarter', 'Revenue'], rows: [['Q1', '$50K']] },
        ],
    },
]);
report.builder.save('report.docx');
```

## Style Notes
- Use `colors.PRIMARY` for headings, `colors.DARK` for body
- Tables use centered alignment with colored headers
- Import `docx.AlignmentType` for alignment options
