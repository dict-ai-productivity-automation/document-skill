// Greek Methodologies Research Document Generator
// Using docx-builder library

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } = require('docx');

function createGreekMethodologiesDocument() {
    // Create a new document
    const doc = new Document();

    // Add title
    doc.addSectionBreak();
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Greek Methodologies in Ancient Research',
                bold: true,
                size: 36,
                color: '003366',
                alignment: 'center',
            }),
        ],
        alignment: 'center',
    }));

    // Add subtitle
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'An Exploration of Systematic Inquiry and Knowledge Acquisition',
                italic: true,
                size: 24,
                alignment: 'center',
            }),
        ],
        alignment: 'center',
    }));

    doc.addSectionBreak();

    // Add introduction
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Introduction',
                bold: true,
                size: 32,
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'The ancient Greeks established foundational methodologies that continue to influence modern scientific inquiry. ',
            }),
            new TextRun({
                text: 'Their systematic approach to knowledge acquisition encompassed philosophical, mathematical, and empirical investigation. ',
                bold: true,
            }),
            new TextRun({
                text: 'This research examines the key methodologies that defined Greek scholarly practices.',
            }),
        ],
    }));

    doc.addSectionBreak();

    // Add Greek Philosophical Methodologies section
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Greek Philosophical Methodologies',
                bold: true,
                size: 28,
            }),
        ],
    }));

    // Create table for philosophical methodologies
    const philosophicalTable = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Methodology', bold: true })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Key Figures', bold: true })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Core Principles', bold: true })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Dialectic Method' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Socrates, Plato' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Thesis-Antithesis-Synthesis' })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Empirical Observation' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Aristotle' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Systematic Data Collection' })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Mathematical Reasoning' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Pythagoras, Euclid' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Axiomatic Proofs' })] })],
                    }),
                ],
            }),
        ],
    });

    doc.addParagraph(philosophicalTable);

    doc.addSectionBreak();

    // Add Mathematical Methodologies section
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Mathematical Methodologies',
                bold: true,
                size: 28,
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Greek mathematics was characterized by rigorous logical deduction and formal proof. ',
            }),
            new TextRun({
                text: 'The axiomatic method, developed through Euclid\'s Elements, established a template for mathematical reasoning that persists today. ',
                bold: true,
            }),
            new TextRun({
                text: 'Key mathematical methodologies included the use of definitions, postulates, and common notions as foundations for proofs.',
            }),
        ],
    }));

    // Add bullet list
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Major Mathematical Contributions',
                bold: true,
                size: 24,
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Euclidean Geometry - The systematic study of plane and solid geometry',
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Number Theory - Study of integer properties and relationships',
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Geometric Algebra - Integration of algebraic concepts with geometric representation',
            }),
        ],
    }));

    doc.addSectionBreak();

    // Add Scientific Methodologies section
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Scientific Methodologies',
                bold: true,
                size: 28,
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Aristotelian science represents one of the earliest systematic attempts at empirical investigation. ',
            }),
            new TextRun({
                text: 'Through his work in the Organon, Aristotle established methodologies for logical analysis and categorization of knowledge. ',
                bold: true,
            }),
            new TextRun({
                text: 'His approach combined observation with logical deduction, creating a framework that influenced scientific inquiry for centuries.',
            }),
        ],
    }));

    // Create table for scientific methods
    const scientificTable = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Method', bold: true })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Application', bold: true })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Systematic Classification' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Biology, Zoology' })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Causal Explanation' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Physics, Metaphysics' })] })],
                    }),
                ],
            }),
        ],
    });

    doc.addParagraph(scientificTable);

    doc.addSectionBreak();

    // Add Comparative Analysis section
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Comparative Analysis: Greek vs. Modern Methodologies',
                bold: true,
                size: 28,
            }),
        ],
    }));

    // Create comparison table
    const comparisonTable = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Aspect', bold: true })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Greek Methodology', bold: true })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Foundation' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Philosophical Inquiry' })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Evidence' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Observation + Reason' })] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Validation' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Logical Consistency' })] })],
                    }),
                ],
            }),
        ],
    });

    doc.addParagraph(comparisonTable);

    doc.addSectionBreak();

    // Add Conclusion section
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Conclusion',
                bold: true,
                size: 28,
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'The Greek methodologies established enduring principles that continue to shape modern research practices. ',
            }),
            new TextRun({
                text: 'From the dialectic method to empirical observation, Greek scholars developed systematic approaches to knowledge acquisition that emphasized logical reasoning, evidence-based inquiry, and structured argumentation. ',
                bold: true,
            }),
            new TextRun({
                text: 'These methodologies formed the foundation upon which modern scientific and academic practices are built.',
            }),
        ],
    }));

    // Add summary box
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Key Takeaways:',
                bold: true,
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Systematic methodology over anecdotal evidence',
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Logical deduction as primary validation tool',
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Integration of observation and reason',
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Emphasis on clear definitions and terminology',
            }),
        ],
    }));

    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: '• Structured argumentation and proof',
            }),
        ],
    }));

    // Add footer with page numbers
    doc.addParagraph(new Paragraph({
        children: [
            new TextRun({
                text: 'Page 1',
                size: 20,
                alignment: 'center',
            }),
        ],
        alignment: 'center',
    }));

    // Save the document
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('greek_methodologies_research_js.docx', buffer);
        console.log("Document 'greek_methodologies_research_js.docx' created successfully with JavaScript!");
        console.log("Document contains " + doc.paragraphs.length + " paragraphs");
        console.log("Document contains " + doc.tables.length + " tables");
    }).catch((error) => {
        console.error('Error creating document:', error);
    });
}

// Run the function
createGreekMethodologiesDocument();