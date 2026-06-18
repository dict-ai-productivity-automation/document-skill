from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

doc.add_heading('Document Title', level=0)
doc.add_paragraph('Generated with python-docx')

doc.add_heading('Section 1', level=1)
doc.add_paragraph('Body text goes here.')

doc.add_heading('Section 2', level=1)

table = doc.add_table(rows=3, cols=3)
table.style = 'Light Grid Accent 1'
for i, row in enumerate(table.rows):
    for j, cell in enumerate(row.cells):
        cell.text = f'Row {i+1}, Col {j+1}'

output_path = r"C:\Users\laila\OneDrive\Desktop\ENARNE\document-skill\enarne\skills\docx\output.docx"
doc.save(output_path)
print(f"Saved to {output_path}")
