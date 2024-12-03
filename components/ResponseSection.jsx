// components/ResponseSection.js
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import SkeletonLoader from "./Skeleton";
import { Download, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setResponse, clearResponse } from "../redux/slices/responseSlice";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { PDFDocument, StandardFonts } from "pdf-lib";
import PptxGenJS from "pptxgenjs";
import ConfirmationModal from "./ui/ConfirmationModal";

const ResponseSection = ({
  handleEditToggle,
  isEditing,
  setIsEditing,
  isLoading,
  disableEdit,
  showForm,
  setIsModalOpen
}) => {
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.response);
  const hasResponse = response !== "";
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (hasResponse) setIsEditing(false);
  }, [hasResponse]);

  const parseResponse = (response) => {
    const sections = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      // Handle different types of lines based on the Gemini response format
      if (line.startsWith("# ")) {
        sections.push({ type: "heading1", text: line.replace(/^#\s*/, "") });
      } else if (line.startsWith("## ")) {
        sections.push({ type: "heading2", text: line.replace(/^##\s*/, "") });
      } else if (line.startsWith("### ")) {
        sections.push({ type: "heading3", text: line.replace(/^###\s*/, "") });
      } else if (line.startsWith("* ")) {
        const lastSection = sections[sections.length - 1];
        if (lastSection && lastSection.type === "list") {
          lastSection.items.push(line.replace(/^\*\s*/, ""));
        } else {
          sections.push({ type: "list", items: [line.replace(/^\*\s*/, "")] });
        }
      } else if (line.trim() === "") {
        // Skip empty lines
      } else {
        // For regular paragraphs, we also handle **bold** markers
        const formattedText = line.split(/(\*\*.*?\*\*)/).map((text) => {
          if (text.startsWith("**") && text.endsWith("**")) {
            return { text: text.replace(/\*\*/g, ""), bold: true };
          }
          return { text, bold: false };
        });
        sections.push({ type: "paragraph", text: formattedText });
      }
    });

    return sections;
  };
  const createPdfFromResponse = async (responseContent) => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]); // Add an initial page
    const { height: pageHeight } = page.getSize();
    const margin = 50;
    const maxWidth = 500; // Adjust based on margins and page size
    let yPosition = pageHeight - margin; // Start from the top of the page

    // Define font options
    const fontSize = 12;
    const heading1Size = 18;
    const heading2Size = 16;
    const heading3Size = 14;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Function to draw text with wrapping and styling
    const drawText = (text, font, size) => {
      const words = text.split(" ");
      let line = "";
      const lines = [];

      for (const word of words) {
        const testLine = `${line}${word} `;
        const testWidth = font.widthOfTextAtSize(testLine, size);

        if (testWidth > maxWidth && line !== "") {
          lines.push(line.trim());
          line = `${word} `;
        } else {
          line = testLine;
        }
      }

      lines.push(line.trim());
      return lines;
    };

    // Function to add a line to the page with proper formatting
    const addLineToPage = (line, font, size) => {
      if (yPosition < margin + size) {
        page = pdfDoc.addPage([600, 800]);
        yPosition = pageHeight - margin;
      }

      page.drawText(line, {
        x: margin,
        y: yPosition,
        size,
        font,
      });

      yPosition -= size + 4;
    };

    // Parse the response content and add it to the PDF
    const sections = parseResponse(responseContent);

    sections.forEach((section) => {
      let lines;
      switch (section.type) {
        case "paragraph":
          section.text.forEach((part) => {
            const fontToUse = part.bold ? boldFont : font;
            const size = part.bold ? fontSize : fontSize;
            lines = drawText(part.text, fontToUse, size);
            lines.forEach((line) => addLineToPage(line, fontToUse, size));
          });
          break;
        case "list":
          section.items.forEach((item) => {
            lines = drawText(`• ${item}`, font, fontSize);
            lines.forEach((line) => addLineToPage(line, font, fontSize));
          });
          break;
        case "heading1":
          lines = drawText(section.text, boldFont, heading1Size);
          lines.forEach((line) => addLineToPage(line, boldFont, heading1Size));
          yPosition -= 10; // Extra spacing for headings
          break;
        case "heading2":
          lines = drawText(section.text, boldFont, heading2Size);
          lines.forEach((line) => addLineToPage(line, boldFont, heading2Size));
          yPosition -= 8; // Extra spacing for headings
          break;
        case "heading3":
          lines = drawText(section.text, boldFont, heading3Size);
          lines.forEach((line) => addLineToPage(line, boldFont, heading3Size));
          yPosition -= 6; // Extra spacing for headings
          break;
        default:
          // Handle unknown types or fallback
          lines = drawText(section.text, font, fontSize);
          lines.forEach((line) => addLineToPage(line, font, fontSize));
          break;
      }
    });

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    saveAs(
      new Blob([pdfBytes], { type: "application/pdf" }),
      "lesson-plan.pdf"
    );
  };

  const createDocxFromResponse = async (responseContent) => {
    const doc = new Document({
      sections: [],
    });
    const sections = parseResponse(responseContent);

    const formattedContent = sections.map((section) => {
      switch (section.type) {
        case "heading1":
          return new Paragraph({
            text: section.text,
            heading: HeadingLevel.HEADING_1,
          });
        case "heading2":
          return new Paragraph({
            text: section.text,
            heading: HeadingLevel.HEADING_2,
          });
        case "heading3":
          return new Paragraph({
            text: section.text,
            heading: HeadingLevel.HEADING_3,
          });
        case "list":
          return new Paragraph({
            children: section.items.map(
              (item) => new TextRun({ text: item, bullet: { level: 0 } })
            ),
          });
        case "paragraph":
          return new Paragraph({
            children: section.text.map(
              (part) =>
                new TextRun({
                  text: part.text,
                  bold: part.bold,
                })
            ),
          });
        default:
          return new Paragraph({
            text: section.text,
          });
      }
    });

    doc.addSection({ children: formattedContent });

    // Save the document
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "lesson-plan.docx");
    });
  };

  const MAX_CHARS_PER_SLIDE = 500;

  const handleSaveAsPPT = () => {
    const textChunks = splitTextIntoChunks(response, MAX_CHARS_PER_SLIDE);
    const ppt = new PptxGenJS();

    textChunks.forEach((chunk) => {
      const slide = ppt.addSlide();
      slide.addText(chunk, {
        x: 0.5,
        y: 0.5,
        w: "80%", // Adjust width as needed
        h: "80%", // Adjust height as needed
        fontSize: 18,
        align: "left", // Align text to the left
        valign: "top", // Align text to the top
        wrap: true, // Enable text wrapping
      });
    });

    ppt.writeFile({ fileName: "lesson-plan.pptx" });
  };

  // Function to split text into chunks of specified size
  const splitTextIntoChunks = (text, maxChars) => {
    const chunks = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      let endIndex = currentIndex + maxChars;
      if (endIndex > text.length) endIndex = text.length;

      // Ensure the chunk does not cut off in the middle of a word
      if (endIndex < text.length) {
        const lastSpaceIndex = text.lastIndexOf(" ", endIndex);
        if (lastSpaceIndex > currentIndex) endIndex = lastSpaceIndex;
      }

      chunks.push(text.substring(currentIndex, endIndex).trim());
      currentIndex = endIndex + 1; // Skip past the space
    }

    return chunks;
  };

  const handleSaveAsWord = () => {
    createDocxFromResponse(response);
  };

  const handleSaveAsPdf = () => {
    createPdfFromResponse(response);
  };

  // const handleDelete = () => {
  //   setResponse("");
  //   dispatch(clearResponse());
  //   setIsEditing(true);
  //   setIsModalOpen(false); // Close modal after confirming
  // };

  return (
    <>
      {/* <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        showForm={showForm}
      /> */}
      {hasResponse && (
        <div className="flex flex-col md:flex-row-reverse md:justify-between items-center mb-4">
          <button
            className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mt-2 md:mt-0"
            onClick={() => setIsModalOpen(true)} // Open modal on delete click
          >
            <Trash2 color="black" className="hover:animate-bounce" />
          </button>
          {/* <button
            className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mt-2 md:mt-0"
            onClick={() => {
              setResponse("");
              dispatch(clearResponse());
              setIsEditing(true);
            }}
          >
            <Trash2 color="black" />
          </button> */}

          <button
            className={`${disableEdit ? "opacity-50 cursor-pointer" : ""
              } p-2  rounded-xl font-bold flex gap-2 text-gray-800  hover:text-black hover:underline transition duration-300`}
            onClick={handleEditToggle}
          // disabled={disableEdit}
          >
            {isEditing ? "Preview" : <>Update Lesson Plan <Edit /></>}
          </button>



          <div className="flex items-end space-x-2 mt-2 md:mt-0">
            <Download className="h-9 w-9 rounded-full p-2 bg-gray-200" stroke="black" />
            <button
              type="button"
              className="flex justify-center items-center w-[52px] h-[52px] rounded-full"
              onClick={handleSaveAsPdf}
              disabled={isLoading}
            >
              <img
                src="pdf.png"
                className="h-9 w-9 transition-transform duration-300 ease-in-out transform hover:scale-125"
              />
            </button>
            <button
              type="button"
              className="flex justify-center font-mono items-center w-[52px] h-[52px] rounded-full"
              onClick={handleSaveAsWord}
              disabled={isLoading}
            >
              <img
                src="doc.png"
                className="h-9 w-9 transition-transform duration-300 ease-in-out transform hover:scale-125"
              />
            </button>
            <button
              type="button"
              className="flex justify-center font-mono items-center w-[52px] h-[52px] rounded-full"
              onClick={handleSaveAsPPT}
              disabled={isLoading}
            >
              <img
                src="ppt.png"
                className="h-9 w-9 transition-transform duration-300 ease-in-out transform hover:scale-125"
              />
            </button>
          </div>
        </div>
      )}
      <div className="max-w-full h-full rounded-xl flex flex-col justify-between overflow-auto">
        <div
          className={`p-4 shadow-lg shadow-gray-400 bg-gray-50 w-full ${hasResponse ? "md:h-[800px] md:max-h-full bg-gray-50" : "md:h-full"
            } my-2 rounded-xl shadow-md text-black text-xl md:text-md overflow-y-auto`}
        >
          {isLoading ? (
            <SkeletonLoader />
          ) : hasResponse ? (
            isEditing ? (
              <MDEditor
                value={response}
                onChange={(value) => setResponse(value)}
                height="100%"
              />
            ) : (
              <MDEditor.Markdown
                source={response}
                style={{
                  backgroundColor: "#f9fafb",
                  // backgroundColor: "#E5E7EB",
                  color: "black",
                  padding: "5px",
                }}
              />
            )
          ) : (
            <div className="flex space-x-2 justify-center items-center h-screen">
              {/* <img src="no-content3.png" className="h-60 w-60 rounded-2xl"/> */}
              {/* <span className="sr-only">Loading...</span>
              <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResponseSection;
