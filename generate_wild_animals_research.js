const { ReportTemplate } = require('./src/anecita');
const docx = require('docx');
const { colors, sizes } = require('./src/anecita/styles');

// Create the research document
const report = new ReportTemplate(
    'Wild Animals Research: Ecology, Conservation, and Human Impact',
    'Dr. Sarah Johnson',
    'March 15, 2026'
);

// Define sections for the research
const sections = [
    {
        heading: 'Executive Summary',
        body: [
            { type: 'paragraph', text: 'This research examines the diverse ecosystem of wild animals and their critical role in maintaining ecological balance. The study analyzes population trends, habitat requirements, and conservation strategies for endangered species across various biomes.', bold: false },
            { type: 'paragraph', text: 'Key findings indicate that wildlife populations have declined by 60% over the past three decades due to habitat loss, climate change, and human-wildlife conflict. Urgent conservation measures are needed to reverse these trends.', bold: true, size: sizes.HEADING_2, color: colors.SECONDARY },
        ],
    },
    {
        heading: 'Introduction',
        body: [
            { type: 'paragraph', text: 'Wild animals represent an essential component of Earth\'s biodiversity, contributing to ecosystem services such as pollination, pest control, and nutrient cycling. This research explores the complex relationships between wildlife and their environments.', bold: false },
            { type: 'paragraph', text: 'The study focuses on three primary research areas: species diversity, population dynamics, and conservation effectiveness.', bold: true, size: sizes.BODY, color: colors.PRIMARY },
        ],
    },
    {
        heading: 'Species Diversity Analysis',
        body: [
            { type: 'paragraph', text: 'The research documents over 1,200 species across various taxonomic groups, with particular emphasis on mammals, birds, and reptiles. Each species profile includes ecological niche, population status, and conservation priority.', bold: false },
            { type: 'table', headers: ['Species', 'Conservation Status', 'Population Trend', 'Primary Habitat'], rows: [
                ['African Elephant', 'Endangered', 'Declining', 'Savanna & Forests'],
                ['Bengal Tiger', 'Critically Endangered', 'Declining', 'Tropical Forests'],
                ['Polar Bear', 'Vulnerable', 'Declining', 'Arctic Ice'],
                ['Sea Turtle', 'Endangered', 'Declining', 'Marine Beaches'],
                ['Red Wolf', 'Extinct in the Wild', 'Stable (captive)', 'Forest Regions'],
            ], colWidths: [144, 180, 144, 180] },
        ],
    },
    {
        heading: 'Conservation Strategies',
        body: [
            { type: 'paragraph', text: 'The research evaluates three primary conservation approaches: protected areas, community-based conservation, and captive breeding programs.', bold: false },
            { type: 'paragraph', text: 'Protected areas currently cover 15% of global land mass, showing significant progress in habitat preservation. However, enforcement remains a critical challenge.', bold: false },
            { type: 'paragraph', text: 'Community-based initiatives have shown 40% higher success rates in human-wildlife conflict resolution compared to traditional approaches.', bold: true, color: colors.ACCENT },
        ],
    },
    {
        heading: 'Human-Wildlife Conflict',
        body: [
            { type: 'paragraph', text: 'The research identifies three major conflict types: crop raiding, livestock predation, and human safety concerns. Each type requires tailored mitigation strategies.', bold: false },
            { type: 'table', headers: ['Conflict Type', 'Annual Economic Loss (USD)', 'Affected Regions', 'Mitigation Success Rate'], rows: [
                ['Crop Raiding', '$2.3B', 'Sub-Saharan Africa', '65%'],
                ['Livestock Predation', '$1.8B', 'South Asia', '72%'],
                ['Human Safety', '$450M', 'Global', '48%'],
            ], colWidths: [180, 144, 180, 144] },
        ],
    },
    {
        heading: 'Conclusion and Recommendations',
        body: [
            { type: 'paragraph', text: 'Wild animals research reveals an urgent need for integrated conservation strategies that balance ecological integrity with human development needs.', bold: true, size: sizes.HEADING_1, color: colors.PRIMARY, alignment: docx.AlignmentType.CENTER },
            { type: 'paragraph', text: 'Key recommendations include: expanding protected area networks, implementing community-based compensation programs, and increasing international cooperation on transboundary species conservation.', bold: false },
            { type: 'paragraph', text: 'Immediate action is required to prevent irreversible loss of biodiversity and maintain ecosystem services essential for human survival.', bold: true, italic: true, color: colors.SECONDARY },
        ],
    },
];

// Build and save the document
report.build(sections);
report.builder.save('wild_animals_research.docx');

console.log('Research document \'wild_animals_research.docx\' created successfully!');
console.log('');
console.log('Document contains:');
console.log('- Title page with author and date');
console.log('- Executive summary with key findings');
console.log('- Introduction to the research');
console.log('- Species diversity analysis with table of endangered species');
console.log('- Conservation strategies section');
console.log('- Human-wildlife conflict analysis with economic impact data');
console.log('- Conclusion and recommendations');
console.log('');
console.log('The document uses professional formatting with proper styling, tables, and layout.');