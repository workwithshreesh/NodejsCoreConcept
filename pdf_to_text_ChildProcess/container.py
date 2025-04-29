import sys
import PyPDF2

def extract_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted
            # Save output to text file
            with open("output.txt", "w", encoding="utf-8") as out_file:
                out_file.write(text)
            print("Text extracted successfully and saved to output.txt")
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        extract_text(sys.argv[1])
    else:
        print("Please provide a PDF file path.", file=sys.stderr)
