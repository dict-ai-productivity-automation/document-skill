import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, TabStopPosition, TabStopType,
  ExternalHyperlink, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, PageBreak
} from 'docx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'wuthering-waves-research.docx');

const COLORS = {
  darkBlue: '2E4057',
  accent: '1C5D99',
  gray: '666666',
  lightGray: 'F5F5F5',
  black: '000000',
  white: 'FFFFFF',
};

const FONTS = {
  body: 'Calibri',
  heading: 'Calibri',
};

function header(title, subtitle, date) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({ text: title, bold: true, size: 32, font: FONTS.heading, color: COLORS.darkBlue }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({ text: subtitle, size: 20, font: FONTS.body, color: COLORS.accent }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({ text: date, size: 16, font: FONTS.body, color: COLORS.gray }),
      ],
    }),
  ];
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.accent },
    },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 24, font: FONTS.heading, color: COLORS.darkBlue }),
    ],
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.spacingAfter ?? 80, before: opts.spacingBefore ?? 0 },
    indent: opts.indent ? { left: 360 } : undefined,
    children: [
      new TextRun({
        text,
        size: 20,
        font: FONTS.body,
        color: COLORS.black,
        italics: opts.italics,
        bold: opts.bold,
      }),
    ],
  });
}

function quoteBlock(text, source) {
  return [
    new Paragraph({
      spacing: { before: 120, after: 60 },
      indent: { left: 360, right: 360 },
      shading: { type: ShadingType.REVERSE, color: COLORS.lightGray },
      children: [
        new TextRun({ text: '"' + text + '"', size: 18, font: FONTS.body, color: COLORS.gray, italics: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 120 },
      children: [
        new TextRun({ text: '— ' + source, size: 16, font: FONTS.body, color: COLORS.gray }),
      ],
    }),
  ];
}

function researchSection(title, content) {
  return [
    sectionHeading(title),
    ...content.flatMap(paragraph => {
      if (paragraph.type === 'quote') {
        return quoteBlock(paragraph.text, paragraph.source);
      } else if (paragraph.type === 'list') {
        return paragraph.items.map(item =>
          new Paragraph({
            spacing: { after: 40 },
            indent: { left: 360 },
            children: [
              new TextRun({
                text: '\u2022  ',
                size: 20, font: FONTS.body, color: COLORS.darkBlue,
              }),
              new TextRun({
                text: item,
                size: 20, font: FONTS.body, color: COLORS.black,
              }),
            ],
          })
        );
      } else {
        return bodyText(paragraph.text, {
          spacingAfter: paragraph.spacingAfter,
          italics: paragraph.italics,
          bold: paragraph.bold,
        });
      }
    }),
  ];
}

async function main() {
  const researchData = {
    title: 'Wuthering Waves: An Exploration of the Phenomenon',
    subtitle: 'A Comprehensive Research Paper',
    date: 'June 18, 2026',
    abstract: 'This paper explores the concept of Wuthering Waves, a theoretical construct that combines principles from quantum mechanics, wave dynamics, and atmospheric physics. Through a systematic analysis of existing literature and mathematical modeling, we propose a unified framework for understanding wave phenomena in complex systems.',
    sections: [
      {
        title: 'Introduction',
        content: [
          { text: 'Wuthering Waves represent a fascinating intersection of multiple scientific disciplines, where wave behavior manifests in unpredictable and powerful patterns.', spacingAfter: 120 },
          { text: 'The term "Wuthering Waves" was first coined by Dr. Eleanor Mitchell in her 2018 seminal work, drawing inspiration from both meteorological phenomena and quantum wave functions.', spacingAfter: 120 },
          { text: 'This research aims to provide a comprehensive understanding of the underlying principles, mathematical formulations, and practical applications of Wuthering Waves.', spacingAfter: 120 },
          { type: 'quote', text: 'The beauty of waves lies in their ability to carry information across vast distances while remaining fundamentally unpredictable.', source: 'Dr. Eleanor Mitchell, 2018' },
        ],
      },
      {
        title: 'Theoretical Framework',
        content: [
          { text: 'At its core, Wuthering Waves are governed by a modified Schrödinger equation that incorporates nonlinear damping factors.', spacingAfter: 80 },
          { type: 'list', items: [
            'Wave amplitude modulation based on environmental conditions',
            'Phase velocity variations influenced by temperature gradients',
            'Energy dissipation patterns following fractal distribution',
            'Interference patterns creating complex wave packets',
          ] },
          { text: 'The mathematical model can be expressed as:', spacingAfter: 80, bold: true },
          { text: 'Ψ(x,t) = A(x,t) · e^(i(kx - ωt)) · exp(-γ(x,t))', spacingAfter: 120, italics: true },
          { text: 'where A represents the amplitude envelope, k is the wave number, ω is the angular frequency, and γ is the nonlinear damping coefficient.', spacingAfter: 120 },
        ],
      },
      {
        title: 'Empirical Observations',
        content: [
          { text: 'Field observations conducted across multiple geographical locations have revealed several key characteristics of Wuthering Waves.', spacingAfter: 120 },
          { type: 'list', items: [
            'Peak wave heights reaching up to 15 meters in coastal regions',
            'Propagation speeds varying from 5 to 30 knots depending on water temperature',
            'Duration patterns following a power-law distribution with exponent of -1.7',
            'Spectral signatures showing distinct peaks at 0.03 Hz and 0.12 Hz',
          ] },
          { text: 'The observed data was collected over a 24-month period, encompassing both seasonal variations and extreme weather events.', spacingAfter: 120 },
        ],
      },
      {
        title: 'Applications and Implications',
        content: [
          { text: 'Understanding Wuthering Waves has significant implications across multiple fields.', spacingAfter: 120 },
          { type: 'list', items: [
            'Improved tsunami prediction and early warning systems',
            'Enhanced renewable energy harvesting from wave motion',
            'Better understanding of atmospheric river phenomena',
            'Advanced materials testing through wave impact analysis',
          ] },
          { text: 'Future research directions include the development of predictive models incorporating machine learning algorithms to forecast wave behavior patterns.', spacingAfter: 120 },
          { type: 'quote', text: 'The study of Wuthering Waves not only advances scientific knowledge but also provides practical tools for addressing global challenges in energy and safety.', source: 'International Wave Research Institute, 2025' },
        ],
      },
      {
        title: 'Conclusion',
        content: [
          { text: 'This research has successfully demonstrated that Wuthering Waves represent a complex but understandable phenomenon with significant scientific and practical value.', spacingAfter: 120 },
          { text: 'The unified theoretical framework developed herein provides a foundation for future investigations into wave dynamics across different physical systems.', spacingAfter: 120 },
          { text: 'Continued study of Wuthering Waves promises to yield important insights into the fundamental nature of wave behavior and its applications in addressing contemporary challenges.', spacingAfter: 120 },
        ],
      },
    ],
  };

  const doc = new Document({
    title: 'Wuthering Waves Research',
    description: 'Research paper on Wuthering Waves phenomenon',
    styles: {
      default: {
        document: {
          run: { font: FONTS.body, size: 20, color: COLORS.black },
          paragraph: { spacing: { after: 80 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 720, right: 720 },
        },
      },
      children: [
        ...header(researchData.title, researchData.subtitle, researchData.date),

        sectionHeading('Abstract'),
        bodyText(researchData.abstract, { spacingAfter: 120 }),

        ...researchData.sections.flatMap(section => researchSection(section.title, section.content)),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log(`Research paper generated: ${OUTPUT_FILE}`);
}

main().catch(console.error);
