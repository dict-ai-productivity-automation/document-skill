package com.santos;

import org.apache.poi.xwpf.usermodel.*;

import java.io.File;
import java.io.FileOutputStream;

public class MythicalCreaturesDocxGenerator {

    public static void main(String[] args) {
        try (XWPFDocument document = new XWPFDocument()) {
            
            // Title
            XWPFParagraph title = document.createParagraph();
            title.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun titleRun = title.createRun();
            titleRun.setText("Research on Mythical Creatures");
            titleRun.setBold(true);
            titleRun.setFontSize(24);

            // Introduction
            XWPFParagraph introHeader = document.createParagraph();
            XWPFRun introHeaderRun = introHeader.createRun();
            introHeaderRun.setText("Introduction");
            introHeaderRun.setBold(true);
            introHeaderRun.setFontSize(16);

            XWPFParagraph introBody = document.createParagraph();
            XWPFRun introBodyRun = introBody.createRun();
            introBodyRun.setText("Mythical creatures have captivated human imagination for centuries. They appear in legends, folklore, and mythologies across diverse cultures worldwide. This document explores a few of the most prominent mythical beings.");

            // Dragons
            XWPFParagraph dragonHeader = document.createParagraph();
            XWPFRun dragonHeaderRun = dragonHeader.createRun();
            dragonHeaderRun.setText("Dragons");
            dragonHeaderRun.setBold(true);
            dragonHeaderRun.setFontSize(16);

            XWPFParagraph dragonBody = document.createParagraph();
            XWPFRun dragonBodyRun = dragonBody.createRun();
            dragonBodyRun.setText("Dragons are perhaps the most universally recognized mythical creatures. In Western traditions, they are often depicted as fearsome, fire-breathing, winged reptiles. In Eastern traditions, such as in Chinese mythology, they are revered as benevolent symbols of power, water, and good fortune.");

            // Unicorns
            XWPFParagraph unicornHeader = document.createParagraph();
            XWPFRun unicornHeaderRun = unicornHeader.createRun();
            unicornHeaderRun.setText("Unicorns");
            unicornHeaderRun.setBold(true);
            unicornHeaderRun.setFontSize(16);

            XWPFParagraph unicornBody = document.createParagraph();
            XWPFRun unicornBodyRun = unicornBody.createRun();
            unicornBodyRun.setText("A symbol of purity and grace, the unicorn is typically described as a white horse-like creature with a single, spiraling horn projecting from its forehead. Folklore suggests that only the pure of heart could ever tame a unicorn.");

            // Phoenixes
            XWPFParagraph phoenixHeader = document.createParagraph();
            XWPFRun phoenixHeaderRun = phoenixHeader.createRun();
            phoenixHeaderRun.setText("Phoenix");
            phoenixHeaderRun.setBold(true);
            phoenixHeaderRun.setFontSize(16);

            XWPFParagraph phoenixBody = document.createParagraph();
            XWPFRun phoenixBodyRun = phoenixBody.createRun();
            phoenixBodyRun.setText("The phoenix is an immortal bird associated with Greek mythology that cyclically regenerates or is otherwise born again. Associated with the sun, a phoenix obtains new life by arising from the ashes of its predecessor. It is a powerful symbol of rebirth and resilience.");

            // Conclusion
            XWPFParagraph conclusionHeader = document.createParagraph();
            XWPFRun conclusionHeaderRun = conclusionHeader.createRun();
            conclusionHeaderRun.setText("Conclusion");
            conclusionHeaderRun.setBold(true);
            conclusionHeaderRun.setFontSize(16);

            XWPFParagraph conclusionBody = document.createParagraph();
            XWPFRun conclusionBodyRun = conclusionBody.createRun();
            conclusionBodyRun.setText("The enduring appeal of mythical creatures lies in what they represent. They embody human fears, hopes, values, and the sheer power of storytelling. While they may not exist in the physical world, they certainly live on in our cultural legacy.");

            // Ensure output directory exists
            File outputDir = new File("output");
            if (!outputDir.exists()) {
                outputDir.mkdirs();
            }

            // Save to output folder
            String outputPath = "output/Mythical_Creatures_Research.docx";
            try (FileOutputStream out = new FileOutputStream(new File(outputPath))) {
                document.write(out);
                System.out.println("Document successfully generated at: " + outputPath);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
