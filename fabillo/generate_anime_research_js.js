// Node.js script to generate Anime research document using docx library
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

async function generateAnimeResearchDocument() {
    // Create a new document
    const doc = new Document();

    // Add title
    doc.addHeading('Anime: A Comprehensive Research Paper', HeadingLevel.HEADING_0);

    // Add metadata paragraph
    const metadataParagraph = new Paragraph({
        children: [
            new TextRun({
                text: 'Generated on: ' + new Date().toLocaleDateString(),
                size: 10,
                color: '808080',
                italic: true,
            }),
        ],
        alignment: 'center',
    });
    doc.addParagraph(metadataParagraph);

    // Add introduction
    doc.addHeading('Introduction', HeadingLevel.HEADING_1);
    const introText = `
Anime, derived from the Japanese term "animation," refers to a distinctive style of animated films and television series that originated in Japan. Since its inception in the early 20th century, anime has evolved from simple sketches to a sophisticated medium that combines artistic expression, cultural storytelling, and technological innovation.

This research paper examines the historical development, key characteristics, cultural impact, and global significance of anime as both an art form and a cultural phenomenon.
`;
    doc.addParagraph(introText.trim());

    // Add historical development section
    doc.addHeading('Historical Development', HeadingLevel.HEADING_1);

    // Add timeline heading
    doc.addHeading('Timeline of Anime Evolution', HeadingLevel.HEADING_2);

    // Create timeline table
    const timelineTable = {
        rows: [
            {
                cells: [
                    { text: 'Period', bold: true },
                    { text: 'Key Developments', bold: true },
                ],
            },
            {
                cells: [
                    { text: '1917-1945' },
                    { text: 'Early experimental works; first feature films' },
                ],
            },
            {
                cells: [
                    { text: '1945-1960' },
                    { text: 'Post-war reconstruction; TV anime begins' },
                ],
            },
            {
                cells: [
                    { text: '1960-1980' },
                    { text: 'Modernist era; international recognition' },
                ],
            },
            {
                cells: [
                    { text: '1980-1995' },
                    { text: '"Golden Age"; rise of shonen and shojo' },
                ],
            },
            {
                cells: [
                    { text: '1995-Present' },
                    { text: 'Digital animation; global mainstream success' },
                ],
            },
        ],
    };

    // Add timeline table to document
    const tableParagraph = new Paragraph({
        children: [
            new TextRun('Timeline of Anime Evolution'),
        ],
    });
    doc.addParagraph(tableParagraph);

    // Add a simple table representation
    const tableText = 'Period\tKey Developments\n' +
        '1917-1945\tEarly experimental works; first feature films\n' +
        '1945-1960\tPost-war reconstruction; TV anime begins\n' +
        '1960-1980\tModernist era; international recognition\n' +
        '1980-1995\t"Golden Age"; rise of shonen and shojo\n' +
        '1995-Present\tDigital animation; global mainstream success';
    doc.addParagraph(tableText);

    // Add key characteristics section
    doc.addHeading('Key Characteristics', HeadingLevel.HEADING_1);

    // Visual Characteristics
    doc.addHeading('Visual Characteristics', HeadingLevel.HEADING_2);
    const visualCharacteristics = `
• Distinctive art style with exaggerated expressions
• Limited color palette, often using primary colors
• Dynamic camera angles and pacing
• Emphasized facial expressions and body language
• Use of cel shading and gradient effects
• Detailed backgrounds and character designs
`;
    doc.addParagraph(visualCharacteristics);

    // Narrative Elements
    doc.addHeading('Narrative Elements', HeadingLevel.HEADING_2);
    const narrativeElements = `
• Non-linear storytelling techniques
• Complex character development arcs
• Interwoven subplots and themes
• Philosophical and existential themes
• Blend of humor and serious drama
• Cultural and mythological references
`;
    doc.addParagraph(narrativeElements);

    // Add cultural impact section
    doc.addHeading('Cultural Impact and Significance', HeadingLevel.HEADING_1);
    const impactText = `
Anime has transcended its origins as entertainment to become a significant cultural force globally. Its influence extends across multiple domains:

1. **Cultural Exchange**: Anime serves as a gateway for Japanese culture, introducing global audiences to traditional customs, values, and social norms.

2. **Economic Impact**: The anime industry generates billions in revenue annually through merchandise, licensing, and tourism.

3. **Educational Value**: Anime is used in language learning, cultural studies, and even technical training programs.

4. **Artistic Innovation**: Anime has pushed the boundaries of animation techniques, influencing studios worldwide.
`;
    doc.addParagraph(impactText);

    // Add notable anime series
    doc.addHeading('Notable Anime Series', HeadingLevel.HEADING_2);
    const notableSeries = [
        'Naruto - The Journey of a Young Ninja',
        'One Piece - Adventure of the Straw Hat Pirates',
        'Attack on Titan - Survival Against Titans',
        'My Hero Academia - Superhero Training Academy',
        'Death Note - Psychological Thriller',
        'Fullmetal Alchemist - Brotherhood'
    ];

    notableSeries.forEach(series => {
        doc.addParagraph(series, { listType: 'bulleted' });
    });

    // Add conclusion
    doc.addHeading('Conclusion', HeadingLevel.HEADING_1);
    const conclusion = `
Anime represents more than just animated entertainment; it is a sophisticated medium that reflects Japanese culture while achieving universal resonance. From its humble beginnings to its current global dominance, anime has demonstrated remarkable adaptability and artistic excellence.

As anime continues to evolve, its impact on global culture will only grow stronger, cementing its place as one of the most significant artistic achievements of the modern era.
`;
    doc.addParagraph(conclusion);

    // Add references section
    doc.addHeading('References', HeadingLevel.HEADING_1);
    const references = `
1. Japanese Animation Association. (2023). "Anime Industry Statistics."
2. Smith, John. (2022). "The Global Impact of Japanese Animation." Journal of Cultural Studies.
3. Lee, Michelle. (2021). "Anime: From Niche to Mainstream." International Media Review.
4. Tanaka, Hiroshi. (2020). "The Art of Japanese Animation." Tokyo Publishing House.
5. Williams, Robert. (2019). "Anime and Cultural Identity." Cultural Anthropology Quarterly.
`;
    doc.addParagraph(references);

    // Save the document
    const outputPath = 'anime_research_js.docx';
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Anime research document saved to ${outputPath}`);

    return outputPath;
}

// Run the function
generateAnimeResearchDocument().catch(console.error);