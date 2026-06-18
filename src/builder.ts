import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  ImageRun,
  PageBreak,
  ShadingType,
  VerticalAlign,
  LevelFormat,
  convertInchesToTwip,
  Footer,
} from "docx";
import * as fs from "fs";
import type {
  DocumentConfig,
  DocumentElement,
  TextRunOptions,
  ParagraphElement,
  HeadingElement,
  ListElement,
  TableElement,
  ImageElement,
} from "./types";

function textRunOptions(options: TextRunOptions): TextRun {
  return new TextRun({
    text: options.text,
    bold: options.bold,
    italics: options.italic,
    underline: options.underline ? { type: "single" } : undefined,
    strike: options.strike,
    size: options.size ? options.size * 2 : undefined,
    color: options.color,
    font: options.font,
    superScript: options.superScript,
    subScript: options.subScript,
  });
}

const alignmentMap: Record<string, any> = {
  left: AlignmentType.LEFT,
  center: AlignmentType.CENTER,
  right: AlignmentType.RIGHT,
  justified: AlignmentType.JUSTIFIED,
};

const headingLevelMap: Record<number, any> = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

function spacingProps(spacing?: { before?: number; after?: number; line?: number }) {
  if (!spacing) return undefined;
  return {
    before: spacing.before,
    after: spacing.after,
    line: spacing.line,
  };
}

function buildParagraph(el: ParagraphElement): Paragraph {
  return new Paragraph({
    children: el.children.map(textRunOptions),
    alignment: el.alignment ? alignmentMap[el.alignment] : undefined,
    spacing: spacingProps(el.spacing),
    indent: el.indent,
    numbering: el.numbering
      ? { reference: el.numbering.template, level: el.numbering.level ?? 0 }
      : undefined,
  });
}

function buildHeading(el: HeadingElement): Paragraph {
  return new Paragraph({
    children: el.children.map(textRunOptions),
    heading: headingLevelMap[el.level],
    alignment: el.alignment ? alignmentMap[el.alignment] : undefined,
  });
}

function buildList(el: ListElement): Paragraph[] {
  const fmt = el.numbering ?? "bullet";
  return el.items.map(
    (item) =>
      new Paragraph({
        children: item.children.map(textRunOptions),
        numbering: { reference: fmt, level: item.level ?? 0 },
        spacing: { after: 60 },
      })
  );
}

function buildTableCell(cell: import("./types").TableCell): TableCell {
  const children: (Paragraph | Table)[] = [];
  for (const el of cell.children) {
    const built = buildElement(el);
    if (Array.isArray(built)) {
      children.push(...built);
    } else {
      children.push(built);
    }
  }
  return new TableCell({
    children,
    width: cell.width ? { size: cell.width, type: WidthType.DXA } : undefined,
    shading: cell.shading
      ? { fill: cell.shading, type: ShadingType.CLEAR }
      : undefined,
    verticalAlign: cell.verticalAlign
      ? cell.verticalAlign === "center"
        ? VerticalAlign.CENTER
        : cell.verticalAlign === "bottom"
          ? VerticalAlign.BOTTOM
          : VerticalAlign.TOP
      : undefined,
  });
}

function buildTable(el: TableElement): Table {
  const rows = el.rows.map(
    (row) =>
      new TableRow({
        children: row.cells.map(buildTableCell),
      })
  );
  return new Table({
    rows,
    width: el.width ? { size: el.width, type: WidthType.PERCENTAGE } : undefined,
    columnWidths: el.columnWidths,
  });
}

function buildImage(el: ImageElement): Paragraph {
  const imageBuffer = fs.readFileSync(el.path);
  return new Paragraph({
    children: [
      new ImageRun({
        data: imageBuffer,
        transformation: {
          width: el.width ?? 400,
          height: el.height ?? 300,
        },
        altText: { title: el.altText ?? "", name: "", description: "" },
      }),
    ],
    alignment: el.alignment ? alignmentMap[el.alignment] : undefined,
  });
}

function buildElement(el: DocumentElement): Paragraph | Paragraph[] | Table {
  switch (el.type) {
    case "paragraph":
      return buildParagraph(el);
    case "heading":
      return buildHeading(el);
    case "list":
      return buildList(el);
    case "table":
      return buildTable(el);
    case "image":
      return buildImage(el);
    case "pageBreak":
      return new Paragraph({ children: [new PageBreak()] });
  }
}

function buildNumberingConfig() {
  const templates = [
    { template: "bullet", format: LevelFormat.BULLET, text: "\u2022" },
    { template: "decimal", format: LevelFormat.DECIMAL, text: "%1." },
    { template: "lowerLetter", format: LevelFormat.LOWER_LETTER, text: "%1." },
    { template: "upperLetter", format: LevelFormat.UPPER_LETTER, text: "%1." },
    { template: "lowerRoman", format: LevelFormat.LOWER_ROMAN, text: "%1." },
    { template: "upperRoman", format: LevelFormat.UPPER_ROMAN, text: "%1." },
  ];

  return templates.map((cfg) => ({
    reference: cfg.template,
    levels: Array.from({ length: 3 }, (_, i) => ({
      level: i,
      format: cfg.format,
      text: cfg.text,
      alignment: AlignmentType.LEFT,
      indent: { left: 720 * (i + 1), hanging: 260 },
    })),
  }));
}

export async function createDocx(config: DocumentConfig): Promise<Buffer> {
  const children: (Paragraph | Table)[] = [];

  for (const el of config.elements) {
    const built = buildElement(el);
    if (Array.isArray(built)) {
      children.push(...built);
    } else {
      children.push(built);
    }
  }

  const pageProps: Record<string, any> = {};

  if (config.sections) {
    const s = config.sections;
    if (s.orientation === "landscape") {
      pageProps.size = { width: 15840, height: 12240 };
    }
    if (s.margins) {
      pageProps.margin = {
        top: s.margins.top != null ? convertInchesToTwip(s.margins.top) : undefined,
        right: s.margins.right != null ? convertInchesToTwip(s.margins.right) : undefined,
        bottom: s.margins.bottom != null ? convertInchesToTwip(s.margins.bottom) : undefined,
        left: s.margins.left != null ? convertInchesToTwip(s.margins.left) : undefined,
        header: s.margins.header != null ? convertInchesToTwip(s.margins.header) : undefined,
        footer: s.margins.footer != null ? convertInchesToTwip(s.margins.footer) : undefined,
      };
    }
    if (s.pageNumber || s.pageNumberStart) {
      pageProps.pageNumbers = {
        start: s.pageNumberStart ?? 1,
      };
    }
  }

  const footers: Record<string, Footer> = {};
  if (config.sections?.pageNumber) {
    const footer = new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: ["1"], size: 20 })],
        }),
      ],
    });
    footers.default = footer;
  }

  const doc = new Document({
    title: config.title,
    description: config.description,
    creator: config.author,
    numbering: { config: buildNumberingConfig() },
    sections: [
      {
        properties: {
          page: pageProps,
        },
        footers: Object.keys(footers).length > 0 ? footers : undefined,
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

export async function createDocxToFile(
  config: DocumentConfig,
  outputPath: string
): Promise<void> {
  const buffer = await createDocx(config);
  fs.writeFileSync(outputPath, buffer);
}
