const colors = {
    PRIMARY: { r: 0x1F, g: 0x4E, b: 0x79 },
    SECONDARY: { r: 0x2E, g: 0x75, b: 0xB6 },
    ACCENT: { r: 0x4C, g: 0xAF, b: 0x50 },
    DARK: { r: 0x33, g: 0x33, b: 0x33 },
    LIGHT: { r: 0xF5, g: 0xF5, b: 0xF5 },
    WHITE: { r: 0xFF, g: 0xFF, b: 0xFF },
    GRAY: { r: 0x66, g: 0x66, b: 0x66 },
    TABLE_BORDER: { r: 0xBF, g: 0xBF, b: 0xBF },
};

const sizes = {
    TITLE: 28,
    HEADING_1: 20,
    HEADING_2: 16,
    HEADING_3: 14,
    BODY: 11,
    SMALL: 9,
    TABLE_HEADER: 10,
    TABLE_CELL: 10,
};

const fonts = {
    BODY: "Calibri",
    HEADING: "Calibri",
    MONO: "Consolas",
};

const margins = {
    NORMAL: { top: 720, bottom: 720, left: 720, right: 720 }, // 1 inch in EMUs
    NARROW: { top: 360, bottom: 360, left: 360, right: 360 }, // 0.5 inch
    WIDE: { top: 1080, bottom: 720, left: 1080, right: 720 }, // 1.5 inches left/right
};

function rgbToHex(color) {
    return (color.r << 16 | color.g << 8 | color.b).toString(16).padStart(6, '0').toUpperCase();
}

module.exports = {
    colors,
    sizes,
    fonts,
    margins,
    rgbToHex,
};