/**
 * Greek Methodologies Research - DOCX Generator
 * Uses docx v9+ API with proper modern syntax
 */

const fs = require('fs');
const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    ShadingType,
    VerticalAlign,
    Header,
    Footer,
    PageNumberElement,
    NumberFormat,
    convertInchesToTwip,
    UnderlineType,
    TabStopType,
    TabStopPosition,
} = require('./node_modules/docx');

// ─── Color Palette ───────────────────────────────────────────────────────────
const COLORS = {
    darkBlue:    '003366',
    medBlue:     '1F4E79',
    accent:      'C9A84C',  // gold
    lightBlue:   'D6E4F0',
    headerBg:    '1F4E79',
    altRow:      'EBF5FB',
    white:       'FFFFFF',
    bodyText:    '2C2C2C',
    mutedText:   '555555',
    tableHeader: 'FFFFFF',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function heading(text, level = 1) {
    const sizes = { 0: 52, 1: 36, 2: 28, 3: 24 };
    const colors = { 0: COLORS.darkBlue, 1: COLORS.medBlue, 2: COLORS.darkBlue, 3: COLORS.mutedText };
    const spaceBefore = { 0: 200, 1: 360, 2: 280, 3: 200 };
    const spaceAfter  = { 0: 160, 1: 160, 2: 120, 3: 80  };

    return new Paragraph({
        alignment: level === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { before: spaceBefore[level] ?? 200, after: spaceAfter[level] ?? 120 },
        children: [
            new TextRun({
                text,
                bold: true,
                size: sizes[level] ?? 24,
                color: colors[level] ?? COLORS.darkBlue,
                font: 'Calibri',
            }),
        ],
    });
}

function dividerLine() {
    return new Paragraph({
        spacing: { before: 40, after: 40 },
        border: { bottom: { color: COLORS.accent, size: 12, space: 0, style: BorderStyle.SINGLE } },
        children: [new TextRun({ text: '' })],
    });
}

function bodyParagraph(runs, indent = false) {
    return new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 80, after: 120, line: 280 },
        indent: indent ? { firstLine: convertInchesToTwip(0.3) } : undefined,
        children: runs,
    });
}

function run(text, opts = {}) {
    return new TextRun({
        text,
        font: 'Calibri',
        size: 22,
        color: opts.color ?? COLORS.bodyText,
        bold:   opts.bold   ?? false,
        italic: opts.italic ?? false,
        underline: opts.underline ? { type: UnderlineType.SINGLE, color: COLORS.darkBlue } : undefined,
    });
}

function bullet(text, level = 0) {
    return new Paragraph({
        bullet: { level },
        spacing: { before: 60, after: 60, line: 260 },
        children: [
            new TextRun({
                text,
                font: 'Calibri',
                size: 22,
                color: COLORS.bodyText,
            }),
        ],
    });
}

function numberedItem(text, level = 0) {
    return new Paragraph({
        numbering: { reference: 'greek-list', level },
        spacing: { before: 60, after: 60, line: 260 },
        children: [
            new TextRun({
                text,
                font: 'Calibri',
                size: 22,
                color: COLORS.bodyText,
            }),
        ],
    });
}

function styledTableCell(text, opts = {}) {
    const isHeader = opts.isHeader ?? false;
    return new TableCell({
        width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
        shading: {
            fill: isHeader ? COLORS.headerBg : (opts.altRow ? COLORS.altRow : COLORS.white),
            type: ShadingType.CLEAR,
            color: 'auto',
        },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
                children: [
                    new TextRun({
                        text,
                        bold: isHeader,
                        color: isHeader ? COLORS.tableHeader : COLORS.bodyText,
                        font: 'Calibri',
                        size: isHeader ? 22 : 20,
                    }),
                ],
            }),
        ],
    });
}

function makeTable(headers, rows) {
    const headerRow = new TableRow({
        tableHeader: true,
        children: headers.map(h =>
            styledTableCell(h, { isHeader: true, width: Math.floor(100 / headers.length) })
        ),
    });

    const dataRows = rows.map((row, ri) =>
        new TableRow({
            children: row.map(cell =>
                styledTableCell(cell, { altRow: ri % 2 === 0, width: Math.floor(100 / row.length) })
            ),
        })
    );

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
            top:    { style: BorderStyle.SINGLE, size: 4, color: COLORS.medBlue },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.medBlue },
            left:   { style: BorderStyle.SINGLE, size: 4, color: COLORS.medBlue },
            right:  { style: BorderStyle.SINGLE, size: 4, color: COLORS.medBlue },
            insideH:{ style: BorderStyle.SINGLE, size: 2, color: 'AAAAAA'      },
            insideV:{ style: BorderStyle.SINGLE, size: 2, color: 'AAAAAA'      },
        },
        rows: [headerRow, ...dataRows],
    });
}

function spacer(points = 160) {
    return new Paragraph({ spacing: { before: 0, after: points }, children: [new TextRun('')] });
}

function quoteBlock(lines) {
    return new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { left: convertInchesToTwip(0.5), right: convertInchesToTwip(0.5) },
        spacing: { before: 160, after: 160, line: 300 },
        border: {
            left: { color: COLORS.accent, size: 24, space: 8, style: BorderStyle.SINGLE },
        },
        shading: { fill: 'FEF9EF', type: ShadingType.CLEAR, color: 'auto' },
        children: lines.map((l, i) =>
            new TextRun({
                text: l + (i < lines.length - 1 ? '\n' : ''),
                font: 'Calibri',
                size: 22,
                italic: true,
                color: COLORS.mutedText,
            })
        ),
    });
}

// ─── Document Sections ───────────────────────────────────────────────────────

function buildDocument() {
    const children = [];

    // ── Cover / Title ──────────────────────────────────────────────────────
    children.push(spacer(400));
    children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
            new TextRun({
                text: 'GREEK METHODOLOGIES IN ANCIENT RESEARCH',
                bold: true,
                size: 56,
                color: COLORS.darkBlue,
                font: 'Calibri',
            }),
        ],
    }));
    children.push(dividerLine());
    children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 40 },
        children: [
            new TextRun({
                text: 'An Exploration of Systematic Inquiry and Knowledge Acquisition',
                italic: true,
                size: 28,
                color: COLORS.accent,
                font: 'Calibri',
            }),
        ],
    }));
    children.push(spacer(80));
    children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({ text: 'Research Paper  |  June 2026', size: 20, color: COLORS.mutedText, font: 'Calibri' }),
        ],
    }));
    children.push(spacer(600));

    // ── Table of Contents placeholder ──────────────────────────────────────
    children.push(new Paragraph({
        pageBreakBefore: true,
        children: [new TextRun('')],
    }));
    children.push(heading('Table of Contents', 1));
    children.push(dividerLine());
    spacer(80);
    const tocItems = [
        ['1.  Introduction', '3'],
        ['2.  Greek Philosophical Methodologies', '4'],
        ['3.  Mathematical Methodologies', '5'],
        ['4.  Scientific Methodologies', '6'],
        ['5.  Comparative Analysis', '7'],
        ['6.  Key Thinkers & Contributions', '8'],
        ['7.  Legacy & Modern Influence', '9'],
        ['8.  Conclusion', '10'],
    ];
    for (const [title, page] of tocItems) {
        children.push(new Paragraph({
            spacing: { before: 60, after: 60 },
            tabStops: [{ type: TabStopType.RIGHT, position: 9000 }],
            children: [
                new TextRun({ text: title, font: 'Calibri', size: 22, color: COLORS.bodyText }),
                new TextRun({ text: '\t' + page, font: 'Calibri', size: 22, color: COLORS.mutedText }),
            ],
        }));
    }

    // ── 1. Introduction ────────────────────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('1.  Introduction', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('The ancient Greeks stand as the undisputed architects of Western intellectual tradition. Their insistence on '),
        run('rational inquiry', { bold: true }),
        run(', systematic observation, and logical consistency laid the groundwork for virtually every branch of modern knowledge. From the bustling agora of Athens to the porticos of Alexandria, Greek thinkers crafted methods of investigation that transformed humanity\'s relationship with the natural world and with itself.'),
    ], true));
    children.push(bodyParagraph([
        run('This research paper examines the core methodologies employed by the ancient Greeks across three principal domains: '),
        run('philosophy', { bold: true }),
        run(', '),
        run('mathematics', { bold: true }),
        run(', and '),
        run('natural science', { bold: true }),
        run('. By analysing the methods of leading thinkers — Socrates, Plato, Aristotle, Euclid, Pythagoras, and Archimedes — we can appreciate the sophisticated and enduring intellectual frameworks they bequeathed to posterity.'),
    ], true));
    children.push(quoteBlock([
        '"Wonder is the beginning of wisdom." — Socrates',
    ]));

    // ── 2. Greek Philosophical Methodologies ──────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('2.  Greek Philosophical Methodologies', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('Greek philosophy pioneered several distinct methodological approaches, each designed to uncover truth through rigorous reasoning and disciplined dialogue. These methods were not merely academic exercises; they were living practices embedded in the culture and civic life of Greek city-states.'),
    ], true));
    children.push(spacer(80));

    children.push(heading('2.1  The Socratic Method (Elenchus)', 2));
    children.push(bodyParagraph([
        run('Socrates (470–399 BCE) developed the '),
        run('elenctic method', { bold: true, italic: true }),
        run(' — a form of cooperative argumentative dialogue intended to expose contradictions in an interlocutor\'s beliefs and stimulate critical thinking. Rather than lecturing, Socrates asked probing questions, exposing inconsistencies and guiding his interlocutors toward clearer insight.'),
    ], true));

    children.push(spacer(60));
    children.push(heading('2.2  Platonic Dialectic', 2));
    children.push(bodyParagraph([
        run('Plato (428–348 BCE) refined the Socratic method into a formal '),
        run('dialectical procedure', { bold: true }),
        run(' — a structured process of thesis, antithesis, and synthesis. In his dialogues, Plato used dialectic as the supreme philosophical tool for ascending from the world of appearances to the world of Ideas (Forms). His '),
        run('Theory of Forms', { bold: true }),
        run(' posited that true knowledge could only be achieved through rational contemplation, not sensory experience.'),
    ], true));

    children.push(spacer(60));
    children.push(heading('2.3  Aristotelian Logic', 2));
    children.push(bodyParagraph([
        run('Aristotle (384–322 BCE) broke decisively from Plato\'s pure rationalism by grounding his methodology in '),
        run('empirical observation and systematic classification', { bold: true }),
        run('. His '),
        run('Organon', { italic: true }),
        run(' established the rules of formal logic: syllogistic reasoning, the laws of non-contradiction and excluded middle, and the priority of definition and categorisation. Aristotle\'s method remains the foundation of modern scientific reasoning.'),
    ], true));

    children.push(spacer(80));
    children.push(makeTable(
        ['Methodology', 'Key Figure(s)', 'Period (BCE)', 'Core Principle'],
        [
            ['Socratic Elenchus',    'Socrates',         '470 – 399', 'Expose contradictions through dialogue'],
            ['Platonic Dialectic',   'Plato',            '428 – 348', 'Ascend from opinion to knowledge via reason'],
            ['Aristotelian Logic',   'Aristotle',        '384 – 322', 'Syllogism, categorisation, empirical method'],
            ['Stoic Logic',          'Chrysippus',       '279 – 206', 'Propositional logic and ethics'],
            ['Epicurean Empiricism', 'Epicurus',         '341 – 270', 'Sensation as the criterion of truth'],
        ]
    ));

    // ── 3. Mathematical Methodologies ─────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('3.  Mathematical Methodologies', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('Greek mathematics was elevated from practical calculation to an abstract, deductive science of breathtaking rigour. The Greeks distinguished between '),
        run('logistica', { italic: true }),
        run(' (practical arithmetic) and '),
        run('arithmetica', { italic: true }),
        run(' (theoretical number science), and it is in the latter that their greatest methodological innovations emerged.'),
    ], true));

    children.push(spacer(80));
    children.push(heading('3.1  The Axiomatic Method', 2));
    children.push(bodyParagraph([
        run('Euclid\'s '),
        run('Elements', { italic: true, bold: true }),
        run(' (c. 300 BCE) is the paradigmatic expression of the axiomatic method. Starting from a small set of self-evident '),
        run('postulates and common notions', { bold: true }),
        run(', Euclid derived hundreds of geometric theorems through chains of logical deduction — a structure that governed mathematics for over two millennia and directly inspired Newton\'s '),
        run('Principia Mathematica', { italic: true }),
        run('.'),
    ], true));

    children.push(spacer(60));
    children.push(heading('3.2  Proof by Contradiction (Reductio ad Absurdum)', 2));
    children.push(bodyParagraph([
        run('The Greeks pioneered '),
        run('reductio ad absurdum', { italic: true, bold: true }),
        run(' — demonstrating that assuming the opposite of a proposition leads to a logical contradiction, thereby establishing the original proposition as true. This technique, used memorably by Euclid to prove the infinitude of primes, became a cornerstone of mathematical proof.'),
    ], true));

    children.push(spacer(80));
    children.push(heading('Major Mathematical Contributions', 2));
    children.push(spacer(40));
    children.push(bullet('Euclidean Geometry — systematic study of plane and solid geometry via postulates'));
    children.push(bullet('Number Theory — investigation of prime numbers, perfect numbers, and integer relationships'));
    children.push(bullet('Geometric Algebra — algebraic problems expressed and solved through geometric constructions'));
    children.push(bullet('The Method of Exhaustion — forerunner of integral calculus (Eudoxus, Archimedes)'));
    children.push(bullet('Conic Sections — study of ellipses, parabolas, and hyperbolas (Apollonius)'));
    children.push(bullet('Combinatorics & Ratio Theory — advanced study of proportions and ratios (Eudoxus)'));

    children.push(spacer(80));
    children.push(makeTable(
        ['Mathematician', 'Period (BCE)', 'Field', 'Key Contribution'],
        [
            ['Thales',        '624 – 546', 'Geometry',       'First geometric proofs; intercept theorem'],
            ['Pythagoras',    '570 – 495', 'Number Theory',  'Pythagorean theorem; figurate numbers'],
            ['Euclid',        'fl. 300',   'Geometry',       'Elements — axiomatic geometry'],
            ['Archimedes',    '287 – 212', 'Calculus (pre)', 'Method of exhaustion; π approximation'],
            ['Apollonius',    '262 – 190', 'Conic Sections', 'Conics treatise; ellipse, parabola, hyperbola'],
            ['Eratosthenes',  '276 – 194', 'Measurement',   'Earth\'s circumference; Sieve of Eratosthenes'],
        ]
    ));

    // ── 4. Scientific Methodologies ──────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('4.  Scientific Methodologies', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('Greek natural philosophy ('),
        run('physis', { italic: true }),
        run(') marked humanity\'s first sustained attempt to explain natural phenomena through reason rather than mythology. While the pre-Socratics offered competing cosmological models, it was Aristotle who synthesised observation and logic into a unified scientific methodology.'),
    ], true));

    children.push(spacer(80));
    children.push(heading('4.1  The Four Causes Framework', 2));
    children.push(bodyParagraph([
        run('Aristotle\'s '),
        run('Four Causes', { bold: true }),
        run(' provided a systematic framework for explaining any phenomenon:'),
    ]));
    children.push(bullet('Material Cause — what a thing is made of (e.g., bronze for a statue)'));
    children.push(bullet('Formal Cause — the pattern or form it embodies (e.g., the shape of the statue)'));
    children.push(bullet('Efficient Cause — the agent or process that brings it about (e.g., the sculptor)'));
    children.push(bullet('Final Cause — its purpose or telos (e.g., the statue honours a god)'));

    children.push(spacer(80));
    children.push(heading('4.2  Observation and Classification', 2));
    children.push(bodyParagraph([
        run('In biology, Aristotle described over 500 animal species with remarkable accuracy, establishing methods of '),
        run('systematic classification', { bold: true }),
        run(' that anticipate Linnaean taxonomy. His '),
        run('Historia Animalium', { italic: true }),
        run(' and '),
        run('De Partibus Animalium', { italic: true }),
        run(' combined field observation with theoretical interpretation — a truly proto-scientific approach.'),
    ], true));

    children.push(spacer(80));
    children.push(makeTable(
        ['Scientific Domain', 'Greek Pioneer(s)', 'Method Used', 'Legacy'],
        [
            ['Astronomy',       'Aristarchus, Hipparchus', 'Geometric modelling',  'Heliocentric hypothesis; star catalogues'],
            ['Biology',         'Aristotle',               'Classification',        'First systematic zoology'],
            ['Medicine',        'Hippocrates',             'Clinical observation',  'Hippocratic Corpus; medical ethics'],
            ['Physics',         'Archimedes',              'Experimentation',       'Law of the lever; hydrostatics'],
            ['Geography',       'Eratosthenes',            'Measurement',           'Accurate Earth circumference'],
            ['Optics',          'Euclid, Ptolemy',         'Geometric ray tracing', 'Foundations of optics'],
        ]
    ));

    // ── 5. Comparative Analysis ──────────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('5.  Comparative Analysis: Greek vs. Modern Methodologies', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('While Greek methodologies were revolutionary for their time, comparing them with modern scientific practice illuminates both their enduring contributions and their historical limitations.'),
    ], true));

    children.push(spacer(80));
    children.push(makeTable(
        ['Dimension', 'Greek Methodology', 'Modern Scientific Method'],
        [
            ['Foundation',      'Philosophical first principles',          'Empirical data and hypothesis testing'],
            ['Evidence',        'Observation + logical reason',            'Controlled experimentation + statistical analysis'],
            ['Validation',      'Logical consistency and peer dialogue',   'Peer review, replication, falsifiability'],
            ['Mathematics',     'Geometry-dominant, deductive',            'Calculus, statistics, computational modelling'],
            ['Instrumentation', 'Naked-eye and basic tools',               'Precision instruments, sensors, computers'],
            ['Collaboration',   'School-based (Academy, Lyceum)',          'Global networked research communities'],
            ['Publication',     'Scrolls, oral tradition',                 'Journals, open-access repositories'],
        ]
    ));

    // ── 6. Key Thinkers ──────────────────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('6.  Key Thinkers & Contributions', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('The following table summarises the most influential Greek thinkers and their primary methodological contributions:'),
    ]));
    children.push(spacer(80));
    children.push(makeTable(
        ['Thinker', 'Period (BCE)', 'Domain', 'Methodological Innovation'],
        [
            ['Thales',          '624 – 546', 'Philosophy / Science', 'Natural explanations; geometric proof'],
            ['Pythagoras',      '570 – 495', 'Mathematics / Music',  'Numerical relationships; harmonic ratios'],
            ['Socrates',        '470 – 399', 'Philosophy',           'Elenctic dialogue; ethical inquiry'],
            ['Hippocrates',     '460 – 370', 'Medicine',             'Clinical observation; prognosis'],
            ['Plato',           '428 – 348', 'Philosophy',           'Dialectic; Theory of Forms'],
            ['Aristotle',       '384 – 322', 'All fields',           'Logic; classification; four causes'],
            ['Euclid',          'fl. 300',   'Mathematics',          'Axiomatic geometry (Elements)'],
            ['Archimedes',      '287 – 212', 'Mathematics / Physics','Method of exhaustion; hydrostatics'],
            ['Eratosthenes',    '276 – 194', 'Geography / Math',     'Earth\'s circumference; prime number sieve'],
            ['Apollonius',      '262 – 190', 'Mathematics',          'Conic sections'],
            ['Hipparchus',      '190 – 120', 'Astronomy',            'Star catalogue; trigonometry'],
        ]
    ));

    // ── 7. Legacy & Modern Influence ─────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('7.  Legacy & Modern Influence', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('The methodological legacy of the ancient Greeks is woven into the fabric of every modern intellectual discipline. The following domains owe their foundational frameworks directly to Greek methodological innovations:'),
    ], true));
    children.push(spacer(80));

    const legacyDomains = [
        ['Modern Logic & Philosophy', 'Aristotle\'s syllogistic logic underpins formal logic, set theory, and the philosophy of science.'],
        ['Mathematics', 'The axiomatic method is the standard of rigour in all branches of pure mathematics today.'],
        ['Scientific Method', 'Aristotle\'s insistence on observation, hypothesis, and explanation anticipates the hypothetico-deductive model of science.'],
        ['Medicine', 'Hippocratic principles of clinical observation, prognosis, and medical ethics form the basis of modern bioethics and evidence-based medicine.'],
        ['Political Science', 'Aristotle\'s comparative study of constitutions in the Politics is recognised as the first systematic political science.'],
        ['Literary Theory', 'Aristotle\'s Poetics established the categories of tragedy, comedy, and narrative that still structure literary criticism.'],
    ];

    for (const [domain, description] of legacyDomains) {
        children.push(heading(domain, 3));
        children.push(bodyParagraph([
            run(description),
        ]));
    }

    // ── 8. Conclusion ────────────────────────────────────────────────────
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('8.  Conclusion', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    children.push(bodyParagraph([
        run('The ancient Greeks\' greatest achievement was not any single discovery but rather the invention of systematic methodology itself — the idea that knowledge could be pursued through structured, repeatable, and communicable methods rather than divine revelation or brute intuition. '),
        run('From the dialectical conversations of Socrates to the axiomatic rigour of Euclid and the empirical breadth of Aristotle, Greek methodologies established the epistemological standards by which all subsequent knowledge has been measured.'),
    ], true));
    children.push(bodyParagraph([
        run('The endurance of these methods across more than two millennia testifies to their fundamental soundness. Modern science has extended, refined, and in many areas superseded Greek conclusions — but it has done so using tools and standards of reasoning that the Greeks themselves pioneered. In this deepest sense, every laboratory, every proof, and every philosophical argument today stands on Greek foundations.'),
    ], true));

    // Key takeaways box
    children.push(spacer(120));
    children.push(new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
        spacing: { before: 160, after: 80 },
        children: [
            new TextRun({ text: 'Key Takeaways', bold: true, size: 26, color: COLORS.darkBlue, font: 'Calibri' }),
        ],
    }));
    const takeaways = [
        'Systematic methodology over anecdotal evidence was the defining Greek innovation',
        'Logical deduction — not just observation — was the primary tool of knowledge validation',
        'The integration of observation and reason created the template for empirical science',
        'Emphasis on clear definitions and terminology enabled cumulative, progressive knowledge',
        'Structured argumentation and proof established standards of intellectual rigour still operative today',
        'Greek schools (Academy, Lyceum, Garden) institutionalised collaborative research',
    ];
    for (const t of takeaways) {
        children.push(bullet(t));
    }

    children.push(spacer(200));

    // References
    children.push(new Paragraph({ pageBreakBefore: true, children: [new TextRun('')] }));
    children.push(heading('References', 1));
    children.push(dividerLine());
    children.push(spacer(80));
    const refs = [
        'Aristotle. (c. 350 BCE). Organon (R. Smith, Trans.). Hackett Publishing.',
        'Aristotle. (c. 350 BCE). Nicomachean Ethics (T. Irwin, Trans.). Hackett Publishing.',
        'Barnes, J. (Ed.). (1984). The Complete Works of Aristotle. Princeton University Press.',
        'Euclid. (c. 300 BCE). Elements (T. L. Heath, Trans.). Dover Publications.',
        'Heath, T. L. (1921). A History of Greek Mathematics (Vols. 1–2). Oxford: Clarendon Press.',
        'Irwin, T. (1988). Aristotle\'s First Principles. Oxford University Press.',
        'Lloyd, G. E. R. (1970). Early Greek Science: Thales to Aristotle. Norton.',
        'Lloyd, G. E. R. (1973). Greek Science after Aristotle. Norton.',
        'Plato. (c. 380 BCE). The Republic (G. M. A. Grube, Trans.). Hackett Publishing.',
        'Vlastos, G. (1991). Socrates: Ironist and Moral Philosopher. Cornell University Press.',
    ];
    for (const ref of refs) {
        children.push(new Paragraph({
            spacing: { before: 60, after: 60, line: 260 },
            indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
            children: [
                new TextRun({ text: ref, font: 'Calibri', size: 20, color: COLORS.mutedText }),
            ],
        }));
    }

    // ── Assemble Document ────────────────────────────────────────────────
    const doc = new Document({
        creator: 'Research Team',
        title: 'Greek Methodologies in Ancient Research',
        subject: 'Investigation of Ancient Greek Research Methods',
        keywords: 'Greek, methodologies, research, philosophy, science, history',
        description: 'A comprehensive academic research paper on Greek philosophical, mathematical, and scientific methodologies.',
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top:    convertInchesToTwip(1.0),
                            bottom: convertInchesToTwip(1.0),
                            left:   convertInchesToTwip(1.25),
                            right:  convertInchesToTwip(1.25),
                        },
                    },
                },
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                border: { bottom: { color: COLORS.accent, size: 6, space: 4, style: BorderStyle.SINGLE } },
                                spacing: { after: 80 },
                                children: [
                                    new TextRun({
                                        text: 'Greek Methodologies in Ancient Research',
                                        font: 'Calibri',
                                        size: 18,
                                        color: COLORS.mutedText,
                                        italic: true,
                                    }),
                                ],
                            }),
                        ],
                    }),
                },
                footers: {
                    default: new Footer({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                border: { top: { color: COLORS.accent, size: 6, space: 4, style: BorderStyle.SINGLE } },
                                spacing: { before: 80 },
                                children: [
                                    new TextRun({ text: '— ', font: 'Calibri', size: 18, color: COLORS.mutedText }),
                                    new PageNumberElement(),
                                    new TextRun({ text: ' —', font: 'Calibri', size: 18, color: COLORS.mutedText }),
                                ],
                            }),
                        ],
                    }),
                },
                children,
            },
        ],
    });

    return doc;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('Building document...');
    const doc = buildDocument();
    console.log('Packing document...');
    const buffer = await Packer.toBuffer(doc);
    const outputPath = 'greek_methodologies_research.docx';
    fs.writeFileSync(outputPath, buffer);
    console.log(`\n✅  Document saved: ${outputPath}`);
    console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}

main().catch(err => {
    console.error('❌  Error generating document:', err);
    process.exit(1);
});
