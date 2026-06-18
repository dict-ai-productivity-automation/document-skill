#!/usr/bin/env node
/**
 * Generate a research document about programming with proper formatting and layout.
 *
 * This script creates a professional research paper about programming using the docx npm package.
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');

/**
 * Create a comprehensive research document about programming.
 * @param {string} outputPath - Path to save the output .docx file
 */
function createProgrammingResearchDocument(outputPath = "programming_research.docx") {
    // Create a new document
    const doc = new Document();

    // Add title
    doc.addParagraph('A Comprehensive Research on Programming Languages and Paradigms', {
        heading: HeadingLevel.HEADING_0,
        alignment: 'center',
        bold: true,
        color: '002B65',
        size: 32,
    });

    // Add author and date
    doc.addParagraph('Dr. Alex Chen\nDepartment of Computer Science\nResearch Publication: January 15, 2026', {
        alignment: 'center',
        bold: true,
    });

    // Add page break
    doc.addSectionBreak();

    // Abstract
    doc.addParagraph('Abstract', {
        heading: HeadingLevel.HEADING_1,
    });

    const abstractText = 'This research paper explores the evolution and impact of programming languages in modern software development. The study examines various programming paradigms, language design principles, and their applications across different domains. Through comprehensive analysis of syntax, semantics, and runtime characteristics, this paper provides insights into optimal language selection for specific use cases and future language design considerations.';
    doc.addParagraph(abstractText);

    // Add page break
    doc.addSectionBreak();

    // Introduction
    doc.addParagraph('1. Introduction', {
        heading: HeadingLevel.HEADING_1,
    });

    const introText = 'Programming languages serve as the fundamental tools through which humans communicate with computers. The choice of programming language significantly influences software development productivity, code maintainability, and system performance. This paper investigates the historical development of programming languages, examining how different paradigms have shaped software engineering practices and influenced the creation of complex systems across various industries.';
    doc.addParagraph(introText);

    // Key Programming Paradigms
    doc.addParagraph('2. Key Programming Paradigms', {
        heading: HeadingLevel.HEADING_1,
    });

    // Create a simple table for paradigms
    const paradigmsTable = doc.addTable([
        ['Paradigm', 'Characteristics', 'Popular Languages'],
        ['Procedural', 'Step-by-step instructions, functions, sequence', 'C, Pascal, BASIC'],
        ['Object-Oriented', 'Classes, objects, inheritance, polymorphism', 'Java, C++, Python'],
        ['Functional', 'First-class functions, immutability, recursion', 'Haskell, Lisp, Clojure'],
        ['Logic', 'Rules, facts, pattern matching', 'Prolog, Datalog'],
        ['Concurrent', 'Parallel execution, message passing', 'Go, Erlang, Scala'],
    ], {
        alignment: 'center',
    });

    // Style table header
    const headerRow = paradigmsTable.getRow(0);
    headerRow.getCells().forEach(cell => {
        cell.children.forEach(child => {
            if (child instanceof Paragraph) {
                child.children.forEach(run => {
                    if (run instanceof TextRun) {
                        run.bold = true;
                        run.size = 16;
                        run.color = 'FFFFFF';
                    }
                });
            }
        });
    });

    // Add space after table
    doc.addParagraph();

    // Historical Evolution
    doc.addParagraph('3. Historical Evolution', {
        heading: HeadingLevel.HEADING_1,
    });

    const evolutionText = 'The evolution of programming languages can be traced through several distinct eras. The first generation (1940s-1950s) featured machine and assembly languages, requiring programmers to work directly with hardware specifications. The second generation (1950s-1960s) introduced high-level languages like FORTRAN and COBOL, which abstracted hardware details and enabled more complex computations. The third generation (1960s-1980s) brought structured programming with languages like C, emphasizing code organization and modularity. The fourth generation (1980s-present) has seen the rise of object-oriented and functional programming paradigms, along with scripting languages that prioritize developer productivity and rapid prototyping.';
    doc.addParagraph(evolutionText);

    // Performance Analysis
    doc.addParagraph('4. Performance Considerations', {
        heading: HeadingLevel.HEADING_1,
    });

    // Create performance comparison table
    const performanceTable = doc.addTable([
        ['Language', 'Execution Speed', 'Memory Usage', 'Development Speed'],
        ['C/C++', 'High', 'Low', 'Medium'],
        ['Java', 'High', 'Medium', 'High'],
        ['Python', 'Medium', 'High', 'Very High'],
        ['JavaScript', 'Medium', 'Medium', 'Very High'],
    ], {
        alignment: 'center',
    });

    // Add space after table
    doc.addParagraph();

    // Conclusion
    doc.addParagraph('5. Conclusion', {
        heading: HeadingLevel.HEADING_1,
    });

    const conclusionText = 'The research demonstrates that no single programming language can optimally serve all software development needs. The choice of programming language must balance multiple factors including performance requirements, development timelines, team expertise, and maintenance considerations. Future programming language design should focus on creating more intuitive syntax, better memory management, and enhanced support for emerging paradigms such as quantum computing and edge AI applications.';
    doc.addParagraph(conclusionText);

    // References
    doc.addParagraph('References', {
        heading: HeadingLevel.HEADING_1,
    });

    const references = [
        'Stroustrup, B. (2013). Programming: Principles and Practice Using C++. Addison-Wesley.',
        'Knuth, D.E. (1997). The Art of Computer Programming, Volume 1: Fundamental Algorithms.',
        'Wirth, N. (2005). Programming in Modula-2. Springer.',
        'Hudak, P., et al. (2008). A History of Haskell: Being Lazy with Class. Proceedings of the Haskell Symposium.',
        'Bjarne, Stroustrup. (2014). Programming is for Everybody. Communications of the ACM.',
        'Deitel, H.M., & Deitel, P.J. (2015). Java: How to Program. Pearson.',
        'Van Rossum, G. (2009). Python Programming: An Introduction to Computer Science. Franklin, Beedle.',
        'Gosling, J., Joy, B., & Steele, G. (2000). The Java Language Specification. Addison-Wesley.',
    ];

    references.forEach(ref => {
        doc.addParagraph(ref, {
            bullet: {
                level: 0,
            },
        });
    });

    // Save the document
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(outputPath, buffer);
        console.log(`Document saved as: ${outputPath}`);
    }).catch((error) => {
        console.error('Error generating document:', error);
    });
}

// Execute if run directly
if (require.main === module) {
    const outputPath = process.argv[2] || 'programming_research.docx';
    createProgrammingResearchDocument(outputPath);
}

module.exports = { createProgrammingResearchDocument };
