export interface TextRunOptions {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  size?: number;
  color?: string;
  font?: string;
  superScript?: boolean;
  subScript?: boolean;
}

export interface ParagraphElement {
  type: "paragraph";
  children: TextRunOptions[];
  alignment?: "left" | "center" | "right" | "justified";
  spacing?: { before?: number; after?: number; line?: number };
  indent?: { left?: number; right?: number; firstLine?: number };
  numbering?: { template: "bullet" | "decimal" | "lowerLetter" | "upperLetter" | "lowerRoman" | "upperRoman"; level?: number };
}

export interface HeadingElement {
  type: "heading";
  children: TextRunOptions[];
  level: 1 | 2 | 3 | 4 | 5 | 6;
  alignment?: "left" | "center" | "right" | "justified";
}

export interface ListElement {
  type: "list";
  items: { children: TextRunOptions[]; level?: number }[];
  numbering?: "bullet" | "decimal" | "lowerLetter" | "upperLetter" | "lowerRoman" | "upperRoman";
}

export interface TableCell {
  children: DocumentElement[];
  width?: number;
  shading?: string;
  verticalAlign?: "top" | "center" | "bottom";
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableElement {
  type: "table";
  rows: TableRow[];
  width?: number;
  borders?: boolean;
  columnWidths?: number[];
}

export interface ImageElement {
  type: "image";
  path: string;
  width?: number;
  height?: number;
  alignment?: "left" | "center" | "right";
  altText?: string;
}

export interface PageBreakElement {
  type: "pageBreak";
}

export interface SectionOptions {
  orientation?: "portrait" | "landscape";
  margins?: { top?: number; right?: number; bottom?: number; left?: number; header?: number; footer?: number };
  pageNumber?: boolean;
  pageNumberStart?: number;
}

export type DocumentElement =
  | ParagraphElement
  | HeadingElement
  | ListElement
  | TableElement
  | ImageElement
  | PageBreakElement;

export interface DocumentConfig {
  title?: string;
  author?: string;
  description?: string;
  sections?: SectionOptions;
  elements: DocumentElement[];
}
