import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from skills.docx.generate import generate_docx

data = {
    "title": "Human Anatomy: A Comprehensive Research Overview",
    "author": "Research & Documentation Team",
    "subject": "Human Anatomy and Physiology",
    "keywords": ["anatomy", "physiology", "human body", "organ systems", "biology", "medicine"],
    "sections": [
        # ── Document header / footer ──────────────────────────────────────
        {
            "type": "header",
            "text": "Human Anatomy: A Comprehensive Research Overview",
            "alignment": "center",
        },
        {
            "type": "footer",
            "text": "© 2026 Research & Documentation Team  |  Page ",
            "page_numbers": True,
            "alignment": "center",
        },

        # ── Cover / Title block ───────────────────────────────────────────
        {"type": "heading", "level": 1, "text": "Human Anatomy"},
        {"type": "heading", "level": 2, "text": "A Comprehensive Research Overview"},
        {
            "type": "paragraph",
            "text": (
                "**Prepared by:** Research & Documentation Team\n"
                "**Date:** June 2026\n"
                "**Subject:** Human Anatomy and Physiology"
            ),
            "alignment": "left",
        },
        {"type": "page_break"},

        # ── Table of Contents (static) ────────────────────────────────────
        {"type": "heading", "level": 1, "text": "Table of Contents"},
        {
            "type": "numbered_list",
            "items": [
                "Introduction to Human Anatomy",
                "The Skeletal System",
                "The Muscular System",
                "The Nervous System",
                "The Cardiovascular System",
                "The Respiratory System",
                "The Digestive System",
                "The Endocrine System",
                "The Immune System",
                "Summary Comparison Table",
                "Conclusion",
                "References",
            ],
        },
        {"type": "page_break"},

        # ── 1. Introduction ───────────────────────────────────────────────
        {"type": "heading", "level": 1, "text": "1. Introduction to Human Anatomy"},
        {
            "type": "paragraph",
            "text": (
                "**Human anatomy** is the scientific discipline that investigates the "
                "structure of the human body. Derived from the Greek word *anatomē* "
                "(meaning 'dissection'), it forms the foundational pillar of all "
                "biomedical sciences. Modern anatomy encompasses *gross anatomy* "
                "(structures visible to the naked eye) and *microscopic anatomy* "
                "(histology and cytology), as well as *developmental anatomy* "
                "(embryology).[fn: Standring, S. (Ed.). (2020). *Gray's Anatomy*, 42nd ed. Elsevier.]"
            ),
            "alignment": "justify",
        },
        {
            "type": "paragraph",
            "text": (
                "The human body is organised into progressively complex levels: "
                "chemical → cellular → tissue → organ → organ system → organism. "
                "There are **11 major organ systems**, each responsible for specific "
                "homeostatic functions that collectively sustain life."
            ),
            "alignment": "justify",
        },
        {"type": "heading", "level": 3, "text": "1.1 Anatomical Terminology"},
        {
            "type": "paragraph",
            "text": (
                "Standardised directional terms allow unambiguous communication "
                "among clinicians and researchers. Key positional descriptors include:"
            ),
            "alignment": "justify",
        },
        {
            "type": "bullet_list",
            "items": [
                "**Superior / Inferior** — toward the head or toward the feet",
                "**Anterior / Posterior** — toward the front or toward the back",
                "**Medial / Lateral** — toward the midline or away from the midline",
                "**Proximal / Distal** — closer to or farther from the point of attachment",
                "**Superficial / Deep** — toward or away from the body surface",
            ],
        },

        # ── 2. Skeletal System ────────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "2. The Skeletal System"},
        {
            "type": "paragraph",
            "text": (
                "The adult human skeleton consists of **206 bones** that provide "
                "structural support, protect vital organs, facilitate movement, "
                "produce blood cells (haematopoiesis in red bone marrow), and store "
                "minerals such as calcium (Ca^2+^) and phosphorus (P)."
            ),
            "alignment": "justify",
        },
        {"type": "heading", "level": 2, "text": "2.1 Divisions of the Skeleton"},
        {
            "type": "paragraph",
            "text": "The skeleton is divided into two functional regions:",
            "alignment": "left",
        },
        {
            "type": "bullet_list",
            "items": [
                "**Axial Skeleton (80 bones):** skull, vertebral column, rib cage, sternum",
                "**Appendicular Skeleton (126 bones):** shoulder girdles, arms, hands, pelvic girdle, legs, feet",
            ],
        },
        {"type": "heading", "level": 2, "text": "2.2 Bone Classification by Shape"},
        {
            "type": "table",
            "headers": ["Bone Type", "Description", "Examples"],
            "rows": [
                ["Long", "Greater length than width; shaft + two epiphyses", "Femur, humerus, tibia"],
                ["Short", "Roughly cube-shaped; mostly spongy bone", "Carpals, tarsals"],
                ["Flat", "Thin, flattened, often curved", "Sternum, scapula, cranial bones"],
                ["Irregular", "Complex shape; does not fit other categories", "Vertebrae, hip bones"],
                ["Sesamoid", "Embedded within tendons", "Patella"],
                ["Sutural", "Small bones within cranial sutures", "Wormian bones"],
            ],
            "style": "Light Grid Accent 1",
            "header_row": True,
        },
        {
            "type": "paragraph",
            "text": (
                "Bone tissue itself is classified as *compact (cortical)* — the dense "
                "outer shell — or *spongy (cancellous)* — the porous inner lattice that "
                "houses red bone marrow."
            ),
            "alignment": "justify",
        },

        # ── 3. Muscular System ────────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "3. The Muscular System"},
        {
            "type": "paragraph",
            "text": (
                "The body contains more than **600 skeletal muscles** that account for "
                "approximately 40–50 % of total body mass in a healthy adult. Muscle "
                "tissue is classified into three types:"
            ),
            "alignment": "justify",
        },
        {
            "type": "numbered_list",
            "items": [
                "**Skeletal muscle** — striated, voluntary; attached to bones via tendons",
                "**Cardiac muscle** — striated, involuntary; forms the myocardium of the heart",
                "**Smooth muscle** — non-striated, involuntary; lines hollow organs (gut, vessels, bladder)",
            ],
        },
        {"type": "heading", "level": 2, "text": "3.1 Mechanism of Contraction"},
        {
            "type": "paragraph",
            "text": (
                "Skeletal muscle contraction follows the **sliding filament theory**: "
                "myosin heads (thick filaments) form cross-bridges with actin (thin "
                "filaments) and pull them toward the centre of the sarcomere, shortening "
                "the muscle. This process requires ATP hydrolysis and is triggered by "
                "a rise in intracellular Ca^2+^ following neural stimulation at the "
                "neuromuscular junction.[fn: Marieb, E. N., & Hoehn, K. (2022). *Human Anatomy & Physiology*, 11th ed. Pearson.]"
            ),
            "alignment": "justify",
        },
        {"type": "heading", "level": 2, "text": "3.2 Major Muscle Groups"},
        {
            "type": "table",
            "headers": ["Region", "Key Muscles", "Primary Action"],
            "rows": [
                ["Shoulder", "Deltoid, rotator cuff (SITS)", "Abduction, rotation of arm"],
                ["Chest", "Pectoralis major, serratus anterior", "Adduction, flexion of arm"],
                ["Back", "Trapezius, latissimus dorsi, erector spinae", "Extension, retraction of scapula"],
                ["Abdomen", "Rectus abdominis, obliques, transversus", "Trunk flexion, compression"],
                ["Thigh", "Quadriceps femoris, hamstrings, adductors", "Extension/flexion of knee"],
                ["Leg", "Gastrocnemius, soleus, tibialis anterior", "Plantar/dorsiflexion of foot"],
            ],
            "style": "Light Grid Accent 1",
            "header_row": True,
        },

        # ── 4. Nervous System ─────────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "4. The Nervous System"},
        {
            "type": "paragraph",
            "text": (
                "The nervous system is the body's master communication and control "
                "network, composed of approximately **86 billion neurons** and an "
                "equal number of glial (support) cells. It is subdivided into:"
            ),
            "alignment": "justify",
        },
        {
            "type": "bullet_list",
            "items": [
                "**Central Nervous System (CNS):** brain + spinal cord",
                "**Peripheral Nervous System (PNS):** all nerves outside the CNS",
                "  • *Somatic PNS* — voluntary control of skeletal muscles",
                "  • *Autonomic PNS* — involuntary control of visceral organs (sympathetic / parasympathetic)",
            ],
        },
        {"type": "heading", "level": 2, "text": "4.1 The Brain"},
        {
            "type": "paragraph",
            "text": (
                "The adult human brain weighs approximately **1.4 kg** and consumes "
                "~20 % of the body's total energy despite representing only ~2 % of "
                "body mass. Major structural divisions include:"
            ),
            "alignment": "justify",
        },
        {
            "type": "table",
            "headers": ["Region", "Sub-structures", "Key Functions"],
            "rows": [
                ["Cerebrum", "Frontal, parietal, temporal, occipital lobes", "Cognition, sensation, voluntary motor control, language"],
                ["Cerebellum", "Vermis, two hemispheres", "Balance, coordination, fine motor control"],
                ["Diencephalon", "Thalamus, hypothalamus, epithalamus", "Sensory relay, homeostasis, circadian rhythm"],
                ["Brainstem", "Midbrain, pons, medulla oblongata", "Vital reflexes: breathing, heart rate, consciousness"],
            ],
            "style": "Light Grid Accent 1",
            "header_row": True,
        },

        # ── 5. Cardiovascular System ──────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "5. The Cardiovascular System"},
        {
            "type": "paragraph",
            "text": (
                "The cardiovascular system consists of the **heart**, approximately "
                "**100,000 km of blood vessels**, and **~5 litres of blood** in an "
                "average adult. Its primary function is to transport oxygen (O~2~), "
                "nutrients, hormones, and metabolic waste products throughout the body."
            ),
            "alignment": "justify",
        },
        {"type": "heading", "level": 2, "text": "5.1 The Heart"},
        {
            "type": "paragraph",
            "text": (
                "The heart is a four-chambered muscular pump located in the "
                "*mediastinum* of the thoracic cavity. The **right side** receives "
                "deoxygenated blood and pumps it to the lungs (*pulmonary circuit*); "
                "the **left side** receives oxygenated blood and pumps it to the body "
                "(*systemic circuit*). A healthy resting heart beats **60–100 times "
                "per minute**, ejecting ~70 mL per beat (stroke volume) — ~5 L/min "
                "cardiac output.[fn: Hall, J. E. (2021). *Guyton and Hall Textbook of Medical Physiology*, 14th ed. Elsevier.]"
            ),
            "alignment": "justify",
        },
        {"type": "heading", "level": 2, "text": "5.2 Blood Vessel Hierarchy"},
        {
            "type": "bullet_list",
            "items": [
                "**Arteries** — carry blood *away* from the heart; thick elastic walls",
                "**Arterioles** — regulate blood flow into capillary beds",
                "**Capillaries** — single-cell-thick walls; site of gas and nutrient exchange",
                "**Venules** — collect blood from capillaries",
                "**Veins** — return blood *to* the heart; contain valves to prevent backflow",
            ],
        },

        # ── 6. Respiratory System ─────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "6. The Respiratory System"},
        {
            "type": "paragraph",
            "text": (
                "The respiratory system facilitates **gas exchange** between the "
                "atmosphere and the bloodstream. The lungs contain approximately "
                "**480 million alveoli**, yielding a total surface area of ~70 m^2^ — "
                "roughly the size of a tennis court — optimised for efficient O~2~/CO~2~ "
                "diffusion."
            ),
            "alignment": "justify",
        },
        {"type": "heading", "level": 2, "text": "6.1 Pathway of Air"},
        {
            "type": "numbered_list",
            "items": [
                "Nasal cavity / Oral cavity — filtration, humidification, warming",
                "Pharynx (throat) — shared passageway for air and food",
                "Larynx (voice box) — houses the vocal cords; contains the epiglottis",
                "Trachea (windpipe) — reinforced by C-shaped cartilage rings",
                "Primary bronchi → Secondary (lobar) bronchi → Tertiary (segmental) bronchi",
                "Bronchioles → Terminal bronchioles → Respiratory bronchioles",
                "Alveolar ducts → Alveolar sacs → **Alveoli** (site of gas exchange)",
            ],
        },
        {
            "type": "paragraph",
            "text": (
                "The **diaphragm** and external intercostal muscles drive inspiration "
                "by increasing thoracic volume, reducing intrapulmonary pressure below "
                "atmospheric pressure, and drawing air into the lungs (*Boyle's Law*)."
            ),
            "alignment": "justify",
        },

        # ── 7. Digestive System ───────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "7. The Digestive System"},
        {
            "type": "paragraph",
            "text": (
                "The gastrointestinal (GI) tract is a **9-metre-long** muscular tube "
                "that processes food through ingestion, mechanical and chemical "
                "digestion, absorption of nutrients, and elimination of waste."
            ),
            "alignment": "justify",
        },
        {
            "type": "table",
            "headers": ["Organ", "Length / Volume", "Primary Function"],
            "rows": [
                ["Oral cavity", "—", "Mastication; salivary amylase begins starch digestion"],
                ["Oesophagus", "~25 cm", "Peristaltic transport of bolus to stomach"],
                ["Stomach", "~1–1.5 L", "Protein digestion (pepsin, HCl); chyme formation"],
                ["Small intestine", "~6–7 m", "Majority of chemical digestion and nutrient absorption"],
                ["Large intestine", "~1.5 m", "Water/electrolyte absorption; faeces formation"],
                ["Rectum & Anus", "~15 cm", "Storage and controlled elimination of faeces"],
            ],
            "style": "Light Grid Accent 1",
            "header_row": True,
        },
        {
            "type": "paragraph",
            "text": (
                "Accessory digestive organs — the **liver**, **gallbladder**, and "
                "**pancreas** — produce bile and digestive enzymes that are delivered "
                "into the duodenum to aid in fat emulsification and macronutrient "
                "breakdown."
            ),
            "alignment": "justify",
        },

        # ── 8. Endocrine System ───────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "8. The Endocrine System"},
        {
            "type": "paragraph",
            "text": (
                "The endocrine system regulates body functions through **chemical "
                "messengers (hormones)** secreted directly into the bloodstream by "
                "ductless glands. Unlike the rapid-acting nervous system, hormonal "
                "effects may take minutes to hours and can persist for days."
            ),
            "alignment": "justify",
        },
        {
            "type": "table",
            "headers": ["Gland", "Location", "Key Hormones", "Primary Role"],
            "rows": [
                ["Hypothalamus", "Brain (diencephalon)", "CRH, TRH, GnRH, ADH, Oxytocin", "Master regulator; links nervous & endocrine systems"],
                ["Anterior pituitary", "Sella turcica, sphenoid bone", "GH, TSH, ACTH, FSH, LH, Prolactin", "Controls other endocrine glands"],
                ["Thyroid", "Anterior neck", "T3, T4, Calcitonin", "Metabolism, growth, Ca²⁺ balance"],
                ["Parathyroid (×4)", "Posterior thyroid surface", "PTH", "Raises blood calcium"],
                ["Adrenal cortex", "Superior pole of kidneys", "Cortisol, Aldosterone, Androgens", "Stress response, fluid/electrolyte balance"],
                ["Adrenal medulla", "Superior pole of kidneys", "Adrenaline (Epinephrine), Noradrenaline", "Fight-or-flight response"],
                ["Pancreas (islets)", "Retroperitoneum", "Insulin (β cells), Glucagon (α cells)", "Blood glucose regulation"],
                ["Gonads", "Pelvis / Scrotum", "Oestrogen, Progesterone, Testosterone", "Reproduction, secondary sex characteristics"],
            ],
            "style": "Light Grid Accent 1",
            "header_row": True,
        },

        # ── 9. Immune System ──────────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "9. The Immune System"},
        {
            "type": "paragraph",
            "text": (
                "The immune system provides a multi-layered defence against pathogens, "
                "abnormal cells, and foreign substances. It operates through two "
                "complementary branches:"
            ),
            "alignment": "justify",
        },
        {
            "type": "bullet_list",
            "items": [
                "**Innate immunity** (non-specific, immediate): physical barriers (skin, mucus), "
                "phagocytes (neutrophils, macrophages), natural killer cells, complement proteins, "
                "and inflammation",
                "**Adaptive immunity** (specific, memory-forming): mediated by **B lymphocytes** "
                "(antibody production — humoral immunity) and **T lymphocytes** "
                "(cell-mediated immunity via cytotoxic and helper T cells)",
            ],
        },
        {
            "type": "paragraph",
            "text": (
                "Primary lymphoid organs (**bone marrow**, **thymus**) are where immune "
                "cells mature; secondary lymphoid organs (**lymph nodes**, **spleen**, "
                "**tonsils**, gut-associated lymphoid tissue) are where immune responses "
                "are initiated.[fn: Abbas, A. K., Lichtman, A. H., & Pillai, S. (2022). *Cellular and Molecular Immunology*, 10th ed. Elsevier.]"
            ),
            "alignment": "justify",
        },

        # ── 10. Summary Comparison Table ──────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "10. Summary: The 11 Major Organ Systems"},
        {
            "type": "table",
            "headers": ["System", "Major Organs / Structures", "Key Function(s)"],
            "rows": [
                ["Skeletal", "Bones, cartilage, ligaments, joints", "Support, protection, haematopoiesis, mineral storage"],
                ["Muscular", "Skeletal, cardiac, smooth muscle", "Movement, posture, heat generation"],
                ["Nervous", "Brain, spinal cord, nerves, sense organs", "Communication, control, sensation"],
                ["Endocrine", "Hypothalamus, pituitary, thyroid, adrenals, pancreas", "Hormonal regulation of metabolism and homeostasis"],
                ["Cardiovascular", "Heart, arteries, veins, capillaries", "Transport of O₂, nutrients, hormones, and waste"],
                ["Lymphatic / Immune", "Lymph nodes, spleen, thymus, tonsils, lymph vessels", "Fluid balance, immunity, fat absorption"],
                ["Respiratory", "Nose, pharynx, larynx, trachea, bronchi, lungs", "Gas exchange (O₂ in / CO₂ out)"],
                ["Digestive", "Mouth, oesophagus, stomach, intestines, liver, pancreas", "Nutrient digestion and absorption"],
                ["Urinary", "Kidneys, ureters, bladder, urethra", "Waste excretion, fluid/electrolyte balance, pH regulation"],
                ["Reproductive (♂)", "Testes, epididymis, vas deferens, prostate, penis", "Sperm and hormone production"],
                ["Reproductive (♀)", "Ovaries, uterine tubes, uterus, vagina", "Egg production, gestation, hormone production"],
                ["Integumentary", "Skin, hair, nails, sweat/oil glands", "Protection, thermoregulation, sensation, vitamin D synthesis"],
            ],
            "style": "Light Grid Accent 1",
            "header_row": True,
        },

        # ── 11. Conclusion ────────────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "11. Conclusion"},
        {
            "type": "paragraph",
            "text": (
                "The human body represents one of nature's most extraordinary "
                "achievements — a deeply integrated system in which billions of cells "
                "cooperate across 11 major organ systems to maintain *homeostasis* "
                "and sustain life. Understanding anatomy is not merely an academic "
                "exercise; it is the cornerstone upon which clinical medicine, "
                "surgical practice, pharmacology, rehabilitation, and biomedical "
                "engineering are built."
            ),
            "alignment": "justify",
        },
        {
            "type": "paragraph",
            "text": (
                "Advances in **medical imaging** (MRI, CT, PET), **genomics**, and "
                "**computational modelling** continue to deepen our understanding of "
                "human anatomy — revealing structural nuances invisible to earlier "
                "generations of anatomists and opening new frontiers in personalised "
                "medicine and regenerative therapy."
            ),
            "alignment": "justify",
        },
        {
            "type": "paragraph",
            "text": (
                "Future research directions include the detailed mapping of the "
                "**human connectome** (brain wiring), elucidating the role of the "
                "**microbiome** in systemic physiology, and leveraging *in silico* "
                "digital twins for predictive patient-specific modelling."
            ),
            "alignment": "justify",
        },

        # ── 12. References ────────────────────────────────────────────────
        {"type": "page_break"},
        {"type": "heading", "level": 1, "text": "12. References"},
        {
            "type": "numbered_list",
            "items": [
                "Standring, S. (Ed.). (2020). *Gray's Anatomy: The Anatomical Basis of Clinical Practice* (42nd ed.). Elsevier.",
                "Marieb, E. N., & Hoehn, K. (2022). *Human Anatomy & Physiology* (11th ed.). Pearson.",
                "Hall, J. E. (2021). *Guyton and Hall Textbook of Medical Physiology* (14th ed.). Elsevier.",
                "Abbas, A. K., Lichtman, A. H., & Pillai, S. (2022). *Cellular and Molecular Immunology* (10th ed.). Elsevier.",
                "Moore, K. L., Dalley, A. F., & Agur, A. M. R. (2018). *Clinically Oriented Anatomy* (8th ed.). Wolters Kluwer.",
                "Netter, F. H. (2019). *Atlas of Human Anatomy* (7th ed.). Elsevier.",
                "Sobotta, J., & Paulsen, F. (2019). *Sobotta Atlas of Anatomy* (16th ed.). Elsevier.",
                "Martini, F. H., Timmons, M. J., & Tallitsch, R. B. (2021). *Human Anatomy* (9th ed.). Pearson.",
            ],
        },
    ],
}

output_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "output",
    "human_anatomy_research.docx",
)

result = generate_docx(output_path, data)
print(f"[OK] Document generated successfully!\nPath: {result}")
