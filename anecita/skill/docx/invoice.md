# Invoice Generation

## Template
Use `InvoiceTemplate` for professional invoices with:
- Invoice number, company/client info
- Line items table (qty, unit price, total)
- Subtotal, tax, grand total calculation

```javascript
const { InvoiceTemplate } = require('anecita');

const invoice = new InvoiceTemplate(
    'INV-2026-001',
    'Acme Corp\n123 Main St\nNew York, NY 10001',
    'Client Name\n456 Oak Ave',
);
invoice.build(
    lineItems: [
        { description: 'Web Development', qty: 40, unit_price: 150 },
        { description: 'Hosting (Monthly)', qty: 1, unit_price: 29.99 },
    ],
    taxRate: 0.08,
    notes: 'Payment due within 30 days.',
);
invoice.builder.save('invoice.docx');
```

## Style Notes
- Right-aligned title with invoice number
- Auto-calculated totals section
- Use `docx.AlignmentType.RIGHT` for right alignment
