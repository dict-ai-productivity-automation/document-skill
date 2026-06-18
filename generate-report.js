const { createDocxToFile } = require("./dist/index.js");
const path = require("path");

// Path to the generated banner image
const bannerPath = path.resolve(
  "C:/Users/DTC USER/.gemini/antigravity-ide/brain/62c946c2-f8e5-4259-988e-9fff482515cc/anime_banner_1781768246035.png"
);

const config = {
  title: "The Global Evolution of Anime",
  author: "AI Research Assistant",
  description: "A comprehensive study on the history, genres, and cultural impact of Japanese animation.",
  sections: {
    pageNumber: true,
    margins: { top: 1, right: 1, bottom: 1, left: 1 }
  },
  elements: [
    // --- COVER PAGE ---
    {
      type: "paragraph",
      alignment: "center",
      children: [{ text: "" }],
      spacing: { after: 720 }
    },
    {
      type: "heading",
      level: 1,
      alignment: "center",
      children: [
        {
          text: "THE GLOBAL EVOLUTION OF ANIME",
          bold: true,
          size: 36,
          color: "1A365D",
          font: "Georgia"
        }
      ]
    },
    {
      type: "paragraph",
      alignment: "center",
      children: [
        {
          text: "A Comprehensive Research Report on History, Genres, and Global Impact",
          italic: true,
          size: 20,
          color: "4A5568",
          font: "Georgia"
        }
      ],
      spacing: { before: 120, after: 360 }
    },
    {
      type: "image",
      path: bannerPath,
      width: 500,
      height: 250,
      alignment: "center"
    },
    {
      type: "paragraph",
      alignment: "center",
      children: [
        { text: "Prepared by: ", size: 20, color: "718096" },
        { text: "AI Research Assistant", bold: true, size: 20, color: "2D3748" }
      ],
      spacing: { before: 720 }
    },
    {
      type: "paragraph",
      alignment: "center",
      children: [
        { text: "Date: ", size: 18, color: "718096" },
        { text: "June 2026", size: 18, color: "2D3748" }
      ]
    },
    { type: "pageBreak" },

    // --- SECTION 1 ---
    {
      type: "heading",
      level: 1,
      children: [
        {
          text: "1. Introduction & Brief History",
          bold: true,
          size: 28,
          color: "1A365D",
          font: "Georgia"
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "The term 'anime' (short for animation) refers to the distinct style of animated productions originating from Japan. While early Japanese commercial animations date back to 1917, the modern aesthetic and structure of the anime industry emerged in the 1960s under the influence of Osamu Tezuka, widely known as the 'God of Manga'.",
          size: 22,
          font: "Arial"
        }
      ],
      spacing: { before: 120, after: 120 }
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Tezuka pioneered techniques that optimized production speeds and budgets, such as reusing background layers and minimizing the frame counts for secondary animations. His seminal work, ",
          size: 22,
          font: "Arial"
        },
        {
          text: "Astro Boy",
          italic: true,
          bold: true,
          size: 22,
          font: "Arial"
        },
        {
          text: ", set the standard for TV-based animated storytelling, featuring complex narratives, character arcs, and multi-episode serialization.",
          size: 22,
          font: "Arial"
        }
      ],
      spacing: { after: 240 }
    },

    // --- TABLE OF HISTORICAL MILESTONES ---
    {
      type: "heading",
      level: 2,
      children: [
        {
          text: "Key Historical Milestones in Anime",
          bold: true,
          size: 22,
          color: "2B6CB0",
          font: "Georgia"
        }
      ]
    },
    {
      type: "table",
      width: 100,
      columnWidths: [1500, 2500, 5000],
      rows: [
        // Table Header
        {
          cells: [
            {
              shading: "2B6CB0",
              children: [
                {
                  type: "paragraph",
                  alignment: "center",
                  children: [{ text: "Era", bold: true, color: "FFFFFF", size: 20 }]
                }
              ]
            },
            {
              shading: "2B6CB0",
              children: [
                {
                  type: "paragraph",
                  alignment: "center",
                  children: [{ text: "Notable Works", bold: true, color: "FFFFFF", size: 20 }]
                }
              ]
            },
            {
              shading: "2B6CB0",
              children: [
                {
                  type: "paragraph",
                  alignment: "center",
                  children: [{ text: "Significance & Impact", bold: true, color: "FFFFFF", size: 20 }]
                }
              ]
            }
          ]
        },
        // Row 1
        {
          cells: [
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "1960s", bold: true, size: 20 }] }]
            },
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "Astro Boy, Sally the Witch", size: 20 }] }]
            },
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "Established serialized TV anime format and foundational genres.", size: 20 }] }]
            }
          ]
        },
        // Row 2
        {
          cells: [
            {
              shading: "FFFFFF",
              children: [{ type: "paragraph", children: [{ text: "1980s", bold: true, size: 20 }] }]
            },
            {
              shading: "FFFFFF",
              children: [{ type: "paragraph", children: [{ text: "Akira, Nausicaä, My Neighbor Totoro", size: 20 }] }]
            },
            {
              shading: "FFFFFF",
              children: [{ type: "paragraph", children: [{ text: "Sparked global cinematic interest and critical appreciation.", size: 20 }] }]
            }
          ]
        },
        // Row 3
        {
          cells: [
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "1990s", bold: true, size: 20 }] }]
            },
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "Sailor Moon, Dragon Ball Z, Evangelion", size: 20 }] }]
            },
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "Mass global localization; introduction of deep existential themes.", size: 20 }] }]
            }
          ]
        },
        // Row 4
        {
          cells: [
            {
              shading: "FFFFFF",
              children: [{ type: "paragraph", children: [{ text: "2000s", bold: true, size: 20 }] }]
            },
            {
              shading: "FFFFFF",
              children: [{ type: "paragraph", children: [{ text: "Spirited Away, Naruto, Death Note", size: 20 }] }]
            },
            {
              shading: "FFFFFF",
              children: [{ type: "paragraph", children: [{ text: "Spirited Away wins Oscar; Internet streaming begins to emerge.", size: 20 }] }]
            }
          ]
        },
        // Row 5
        {
          cells: [
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "2010s-Pres.", bold: true, size: 20 }] }]
            },
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "Demon Slayer, Attack on Titan, Your Name", size: 20 }] }]
            },
            {
              shading: "F7FAFC",
              children: [{ type: "paragraph", children: [{ text: "Record box offices; dominant presence on modern streaming platforms.", size: 20 }] }]
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      children: [{ text: "" }],
      spacing: { after: 240 }
    },

    // --- SECTION 2 ---
    {
      type: "heading",
      level: 1,
      children: [
        {
          text: "2. Target Demographics & Core Genres",
          bold: true,
          size: 28,
          color: "1A365D",
          font: "Georgia"
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Unlike many Western cartoons traditionally produced primarily for children, anime caters to a wide spectrum of age brackets, genders, and subcultures. Key demographics are categorized as follows:",
          size: 22,
          font: "Arial"
        }
      ],
      spacing: { before: 120, after: 120 }
    },
    {
      type: "list",
      numbering: "bullet",
      items: [
        {
          children: [
            { text: "Shonen: ", bold: true, size: 22, font: "Arial" },
            { text: "Targeted at young males (ages 12-18). Primarily features fast-paced action, martial arts, coming-of-age growth, and themes of friendship (e.g., ", size: 22, font: "Arial" },
            { text: "Naruto", italic: true, size: 22, font: "Arial" },
            { text: ", ", size: 22, font: "Arial" },
            { text: "My Hero Academia", italic: true, size: 22, font: "Arial" },
            { text: ").", size: 22, font: "Arial" }
          ]
        },
        {
          children: [
            { text: "Shojo: ", bold: true, size: 22, font: "Arial" },
            { text: "Targeted at young females (ages 12-18). Focuses on interpersonal relationships, romance, and emotional development (e.g., ", size: 22, font: "Arial" },
            { text: "Fruits Basket", italic: true, size: 22, font: "Arial" },
            { text: ", ", size: 22, font: "Arial" },
            { text: "Sailor Moon", italic: true, size: 22, font: "Arial" },
            { text: ").", size: 22, font: "Arial" }
          ]
        },
        {
          children: [
            { text: "Seinen: ", bold: true, size: 22, font: "Arial" },
            { text: "Designed for adult men (ages 18-40+). Deals with psychological, philosophical, and violent themes, offering complex narratives (e.g., ", size: 22, font: "Arial" },
            { text: "Monster", italic: true, size: 22, font: "Arial" },
            { text: ", ", size: 22, font: "Arial" },
            { text: "Berserk", italic: true, size: 22, font: "Arial" },
            { text: ").", size: 22, font: "Arial" }
          ]
        },
        {
          children: [
            { text: "Josei: ", bold: true, size: 22, font: "Arial" },
            { text: "Aimed at adult women. Features mature, realistic stories of romance, work, and slice-of-life conflicts (e.g., ", size: 22, font: "Arial" },
            { text: "Nana", italic: true, size: 22, font: "Arial" },
            { text: ", ", size: 22, font: "Arial" },
            { text: "Show Genroku Rakugo Shinju", italic: true, size: 22, font: "Arial" },
            { text: ").", size: 22, font: "Arial" }
          ]
        },
        {
          children: [
            { text: "Isekai: ", bold: true, size: 22, font: "Arial" },
            { text: "A popular fantasy subgenre where characters are transported or reincarnated into parallel worlds (e.g., ", size: 22, font: "Arial" },
            { text: "Re:Zero", italic: true, size: 22, font: "Arial" },
            { text: ", ", size: 22, font: "Arial" },
            { text: "That Time I Got Reincarnated as a Slime", italic: true, size: 22, font: "Arial" },
            { text: ").", size: 22, font: "Arial" }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      children: [{ text: "" }],
      spacing: { after: 240 }
    },

    // --- SECTION 3 ---
    {
      type: "heading",
      level: 1,
      children: [
        {
          text: "3. Economic & Cultural Footprint",
          bold: true,
          size: 28,
          color: "1A365D",
          font: "Georgia"
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Anime has evolved from a niche subculture into a major driver of Japan's economic growth and cultural diplomacy. The industry is currently valued at over $25 billion USD globally, with international markets representing more than half of the total revenue.",
          size: 22,
          font: "Arial"
        }
      ],
      spacing: { before: 120, after: 120 }
    },
    {
      type: "paragraph",
      indent: { left: 720 },
      spacing: { before: 120, after: 120 },
      children: [
        {
          text: "\"The rapid proliferation of digital streaming sites like Crunchyroll, Netflix, and Hulu has democratized global access. Anime has effectively transitioned from specialized importing channels into mainstream entertainment, creating an active, globally-connected fandom.\"",
          italic: true,
          color: "4A5568",
          size: 20,
          font: "Georgia"
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Culturally, anime forms the core of Japan's 'Cool Japan' initiative. Fandom has spawned international cosplay, fan conventions (e.g., Anime Expo in Los Angeles, Comiket in Tokyo), and significant academic study into modern Japanese media.",
          size: 22,
          font: "Arial"
        }
      ],
      spacing: { before: 120, after: 240 }
    },

    // --- CONCLUSION ---
    {
      type: "heading",
      level: 1,
      children: [
        {
          text: "4. Conclusion & Future Outlook",
          bold: true,
          size: 28,
          color: "1A365D",
          font: "Georgia"
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "As the anime industry moves forward, it balances technological integration, such as 3D computer graphics alongside traditional hand-drawn designs, with global production partnerships. The universal themes of human relationships, struggle, and imagination ensure that anime will continue to inspire and connect audiences worldwide.",
          size: 22,
          font: "Arial"
        }
      ],
      spacing: { before: 120, after: 120 }
    }
  ]
};

async function main() {
  const outputPath = path.resolve("./Anime_Research_Report.docx");
  try {
    console.log("Generating Anime Research Report Document...");
    await createDocxToFile(config, outputPath);
    console.log(`Success! Document created successfully at: ${outputPath}`);
  } catch (err) {
    console.error("Failed to generate document:", err);
    process.exit(1);
  }
}

main();
