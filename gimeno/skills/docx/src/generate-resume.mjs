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
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'resume.docx');

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

function header(name, title, contactLines) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({ text: name, bold: true, size: 52, font: FONTS.heading, color: COLORS.darkBlue }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: title, size: 24, font: FONTS.body, color: COLORS.accent, italics: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        ...contactLines.flatMap((line, i) => [
          new TextRun({ text: line, size: 18, font: FONTS.body, color: COLORS.gray }),
          ...(i < contactLines.length - 1 ? [new TextRun({ text: '  |  ', size: 18, font: FONTS.body, color: COLORS.gray })] : []),
        ]),
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

function experienceEntry(role, company, dates, bullets) {
  const children = [
    new TextRun({ text: role, bold: true, size: 22, font: FONTS.body, color: COLORS.black }),
    new TextRun({ text: `, ${company}`, size: 22, font: FONTS.body, color: COLORS.accent }),
  ];

  return [
    new Paragraph({
      spacing: { before: 160, after: 40 },
      tabStops: [
        { type: TabStopType.RIGHT, position: 9360 },
      ],
      children: [
        ...children,
        new TextRun({
          text: dates,
          size: 18, font: FONTS.body, color: COLORS.gray, italics: true,
          tab: true,
        }),
      ],
    }),
    ...bullets.map(bullet =>
      new Paragraph({
        spacing: { after: 40 },
        indent: { left: 360 },
        children: [
          new TextRun({
            text: '\u2022  ',
            size: 20, font: FONTS.body, color: COLORS.darkBlue,
          }),
          new TextRun({
            text: bullet,
            size: 20, font: FONTS.body, color: COLORS.black,
          }),
        ],
      })
    ),
  ];
}

function educationEntry(degree, school, year, gpa) {
  const rightText = gpa ? `${year}  |  GPA: ${gpa}` : year;
  return new Paragraph({
    spacing: { before: 120, after: 40 },
    tabStops: [
      { type: TabStopType.RIGHT, position: 9360 },
    ],
    children: [
      new TextRun({ text: degree, bold: true, size: 22, font: FONTS.body, color: COLORS.black }),
      new TextRun({ text: `  \u2014  ${school}`, size: 20, font: FONTS.body, color: COLORS.accent }),
      new TextRun({
        text: rightText,
        size: 18, font: FONTS.body, color: COLORS.gray, italics: true,
        tab: true,
      }),
    ],
  });
}

function skillCategory(category, skills) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 180 },
    children: [
      new TextRun({ text: `${category}: `, bold: true, size: 20, font: FONTS.body, color: COLORS.darkBlue }),
      new TextRun({ text: skills.join(', '), size: 20, font: FONTS.body, color: COLORS.black }),
    ],
  });
}

async function main() {
  const resumeData = {
    name: 'Alexandra Chen',
    title: 'Senior Software Engineer',
    contact: ['alex.chen@email.com', '(555) 123-4567', 'linkedin.com/in/alexchen', 'San Francisco, CA'],
    summary: 'Senior Software Engineer with 8+ years of experience building scalable distributed systems and leading cross-functional engineering teams. Passionate about cloud-native architecture, developer tooling, and mentoring the next generation of engineers.',
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        dates: '2021 \u2013 Present',
        bullets: [
          'Architected and led the migration of a monolithic payment platform to a microservices architecture, reducing deployment time by 80% and improving system reliability to 99.99% uptime.',
          'Managed a team of 5 engineers, establishing CI/CD pipelines, code review standards, and on-call rotations.',
          'Designed and implemented a real-time analytics pipeline processing 2M+ events/day using Kafka and Apache Flink.',
        ],
      },
      {
        role: 'Software Engineer II',
        company: 'DataStream Solutions',
        dates: '2018 \u2013 2021',
        bullets: [
          'Built the core RESTful API for a SaaS platform serving 500+ enterprise clients, handling 10K+ req/s at peak.',
          'Reduced database query latency by 60% through query optimization and introduction of Redis caching layer.',
          'Developed an internal CLI tool in Go adopted by 40+ engineers across 5 teams.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'StartupXYZ',
        dates: '2016 \u2013 2018',
        bullets: [
          'Delivered the MVP of a React Native mobile app, achieving 50K+ downloads in the first quarter.',
          'Implemented GraphQL API layer unifying data from 4 legacy services.',
        ],
      },
    ],
    education: [
      {
        degree: 'M.S. Computer Science',
        school: 'Stanford University',
        year: '2016',
        gpa: '3.9',
      },
      {
        degree: 'B.S. Computer Engineering',
        school: 'UC Berkeley',
        year: '2014',
        gpa: '3.7',
      },
    ],
    skills: {
      Languages: ['TypeScript', 'Python', 'Go', 'Java', 'SQL'],
      'Frameworks & Tools': ['React', 'Node.js', 'Django', 'Spring Boot', 'Kubernetes', 'Docker', 'Terraform'],
      'Data & Infra': ['PostgreSQL', 'Redis', 'Kafka', 'AWS', 'GCP', 'Datadog'],
    },
  };

  const doc = new Document({
    title: 'Resume',
    description: `Resume for ${resumeData.name}`,
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
          margin: { top: 720, bottom: 720, left: 900, right: 900 },
        },
      },
      children: [
        ...header(resumeData.name, resumeData.title, resumeData.contact),

        sectionHeading('Professional Summary'),
        bodyText(resumeData.summary, { spacingAfter: 120 }),

        sectionHeading('Experience'),
        ...resumeData.experience.flatMap(exp => experienceEntry(exp.role, exp.company, exp.dates, exp.bullets)),

        sectionHeading('Education'),
        ...resumeData.education.flatMap(edu => educationEntry(edu.degree, edu.school, edu.year, edu.gpa)),

        sectionHeading('Technical Skills'),
        ...Object.entries(resumeData.skills).map(([cat, skills]) => skillCategory(cat, skills)),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log(`Resume generated: ${OUTPUT_FILE}`);
}

main().catch(console.error);
