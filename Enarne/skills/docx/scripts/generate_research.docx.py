from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn

doc = Document()

# Set up document properties
doc.core_properties.author = "AI Research Assistant"
doc.core_properties.title = "Research on Programming Languages"
doc.core_properties.subject = "Programming Language Analysis"
doc.core_properties.keywords = "programming languages, research, analysis"

# Add title page
doc.add_heading('Research on Programming Languages', 0)
doc.add_paragraph('An in-depth analysis of major programming paradigms and their evolution', style='Intense Quote')
doc.add_paragraph('Generated on: ' + doc.core_properties.created.strftime('%B %d, %Y'))

# Add page break for title page
doc.add_page_break()

# Add main heading
doc.add_heading('Executive Summary', level=1)
doc.add_paragraph(
    'This research paper examines the landscape of modern programming languages, '
    'analyzing their characteristics, use cases, and evolutionary trends. '
    'The study covers functional, object-oriented, procedural, and concurrent programming paradigms.',
    style='Normal'
)

# Add section about programming language paradigms
doc.add_heading('Programming Language Paradigms', level=1)

doc.add_heading('1. Functional Programming', level=2)
doc.add_paragraph('Functional programming emphasizes the application of functions and avoids changing-state and mutable data. Key characteristics include:')

# Create a table for functional programming features
functional_table = doc.add_table(rows=5, cols=2)
functional_table.style = 'Light Shading Accent 1'
functional_table.rows[0].cells[0].text = 'Feature'
functional_table.rows[0].cells[1].text = 'Description'
functional_table.rows[1].cells[0].text = 'First-class functions'
functional_table.rows[1].cells[1].text = 'Functions can be passed as arguments and returned'
functional_table.rows[2].cells[0].text = 'Immutability'
functional_table.rows[2].cells[1].text = 'Data cannot be modified after creation'
functional_table.rows[3].cells[0].text = 'Pure functions'
functional_table.rows[3].cells[1].text = 'Same input always produces same output'
functional_table.rows[4].cells[0].text = 'Higher-order functions'
functional_table.rows[4].cells[1].text = 'Functions that operate on other functions'

# Add examples of functional languages
example_paragraph = doc.add_paragraph()
example_paragraph.add_run('Popular functional languages include ', style='Strong')
example_paragraph.add_run('Haskell, ', style='Strong')
example_paragraph.add_run('Erlang, ', style='Strong')
example_paragraph.add_run('Clojure, and Scala.', style='Strong')

# Add section on object-oriented programming
doc.add_heading('2. Object-Oriented Programming (OOP)', level=2)
doc.add_paragraph('OOP organizes software design around data, or objects, rather than functions and logic. Key principles include:')

# Create a table for OOP principles
oop_table = doc.add_table(rows=4, cols=2)
oop_table.style = 'Light Shading Accent 2'
oop_table.rows[0].cells[0].text = 'Principle'
oop_table.rows[0].cells[1].text = 'Definition'
oop_table.rows[1].cells[0].text = 'Encapsulation'
oop_table.rows[1].cells[1].text = 'Bundling data and methods within a class'
oop_table.rows[2].cells[0].text = 'Inheritance'
oop_table.rows[2].cells[1].text = 'Deriving new classes from existing ones'
oop_table.rows[3].cells[0].text = 'Polymorphism'
oop_table.rows[3].cells[1].text = 'Ability to process objects differently'

# Add examples of OOP languages
example_paragraph = doc.add_paragraph()
example_paragraph.add_run('Major OOP languages include ', style='Strong')
example_paragraph.add_run('Java, ', style='Strong')
example_paragraph.add_run('C++, ', style='Strong')
example_paragraph.add_run('Python, ', style='Strong')
example_paragraph.add_run('C#, and Ruby.', style='Strong')

# Add section on procedural programming
doc.add_heading('3. Procedural Programming', level=2)
doc.add_paragraph('Procedural programming solves problems via a list of prescribed actions (procedures or functions) that operate on data.')

# Create a table for procedural languages
procedural_table = doc.add_table(rows=4, cols=2)
procedural_table.style = 'Light Shading Accent 3'
procedural_table.rows[0].cells[0].text = 'Language'
procedural_table.rows[0].cells[1].text = 'Key Features'
procedural_table.rows[1].cells[0].text = 'C'
procedural_table.rows[1].cells[1].text = 'Low-level memory control, structured programming'
procedural_table.rows[2].cells[0].text = 'Pascal'
procedural_table.rows[2].cells[1].text = 'Structured programming, strong typing'
procedural_table.rows[3].cells[0].text = 'Fortran'
procedural_table.rows[3].cells[1].text = 'Scientific computing, array operations'

# Add section on concurrent programming
doc.add_heading('4. Concurrent Programming', level=2)
doc.add_paragraph('Concurrent programming enables multiple computations to execute simultaneously, improving performance and responsiveness.')

# Create a table for concurrent languages
concurrent_table = doc.add_table(rows=4, cols=2)
concurrent_table.style = 'Light Shading Accent 4'
concurrent_table.rows[0].cells[0].text = 'Language'
concurrent_table.rows[0].cells[1].text = 'Concurrency Model'
concurrent_table.rows[1].cells[0].text = 'Go'
concurrent_table.rows[1].cells[1].text = 'Goroutines and channels'
concurrent_table.rows[2].cells[0].text = 'Rust'
concurrent_table.rows[2].cells[1].text = 'Ownership and borrowing'
concurrent_table.rows[3].cells[0].text = 'Java'
concurrent_table.rows[3].cells[1].text = 'Threads and synchronized blocks'

# Add conclusion section
doc.add_heading('Conclusion', level=1)
doc.add_paragraph(
    'The programming language landscape continues to evolve, with new paradigms emerging '
    'while established ones adapt to modern computing needs. Understanding these paradigms '
    'is crucial for selecting the right tools for specific problems and for advancing '
    'software development practices.',
    style='Normal'
)

# Add a bibliography section
doc.add_heading('References', level=1)

references = [
    'Stroustrup, B. (2013). Programming: Principles and Practice Using C++. Addison-Wesley.',
    'Skinner, M. (2015). Programming Language Concepts. Springer.',
    'Wirth, N. (2005). The Programming Language Pascal. ACM Computing Surveys (CSUR).',
    'Gosling, J., Joy, B., & Steele, G. (2014). The Java Language Specification. Addison-Wesley.',
    'Hudak, P., et al. (2008). A History of Haskell: Being Lazy with Class. Proceedings of the Haskell Symposium.',
]

for i, ref in enumerate(references, 1):
    doc.add_paragraph(f'{i}. {ref}')

# Add page numbers to all pages
section = doc.sections[-1]
section.footer.paragraphs[0].text = f'Page {section.page_number} of {{page}}'

output_path = r"C:\Users\laila\OneDrive\Desktop\ENARNE\document-skill\enarne\skills\docx\research_on_programming_languages.docx"
doc.save(output_path)
print(f"Saved to {output_path}")
