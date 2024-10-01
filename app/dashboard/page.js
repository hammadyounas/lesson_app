"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import Form from "../components/Form";
import SkeletonLoader from "../components/Skeleton";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { PDFDocument, StandardFonts } from "pdf-lib";
import PptxGenJS from "pptxgenjs";
import MDEditor from "@uiw/react-md-editor";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.user);

  const [response, setResponse] = useState({
    response1: "",
    response2: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("preview");

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasResponses = response.response1 || response.response2;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const handleFormSubmit = (res1, res2) => {
    setResponse({ response1: res1, response2: res2 });
    setIsLoading(false);
  };

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
    const activeResponse =
      currentIndex === 0 ? response.response1 : response.response2;

    const textChunks = splitTextIntoChunks(activeResponse, MAX_CHARS_PER_SLIDE);
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
    const activeResponse =
      currentIndex === 0 ? response.response1 : response.response2;
    createDocxFromResponse(activeResponse);
  };

  const handleSaveAsPdf = () => {
    const activeResponse =
      currentIndex === 0 ? response.response1 : response.response2;
    createPdfFromResponse(activeResponse);
  };
  const clearResponse = () => {
    setResponse({
      response1: "",
      response2: "",
    });
  };

  const handleSwitch = (direction) => {
    if (direction === "right" && currentIndex < 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Go to response 2
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Go to response 1
    }
  };
  return (
    <div className="min-w-screen flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar className="md:w-1/4 w-full " />

      <div className="max-w-full md:w-full h-auto m-4 bg-gray-100 rounded-xl flex flex-col md:flex-row ">
        <div className="flex items-center  animate-fade-up justify-center shadow-lg rounded-xl m-2 max-w-full md:w-2/3">
          <Form
            onSubmit={handleFormSubmit}
            setIsLoading={setIsLoading}
            isloading={isloading}
          />
        </div>

        <div className="rounded-xl max-h-full animate-fade-up m-2 md:w-full max-w-full flex flex-col">
          {/* start of response Content */}
          {hasResponses && (
            <div className="flex flex-row-reverse justify-between items-center">
              <button
                className={`p-2 bg-red-600 rounded-xl font-bold text-white hover:bg-white hover:text-black ${
                  !hasResponses ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={clearResponse}
                disabled={!hasResponses} // Disable if no responses
              >
                Clear Response
              </button>
              <div className="flex items-center me-4 space-x-2">
                <button
                  type="button"
                  className="flex justify-center font-mono items-center w-[52px] h-[52px] text-gray-500 hover:text-white bg-white rounded-full border border-gray-200 shadow-sm hover:bg-red-500"
                  onClick={handleSaveAsPdf}
                  disabled={!hasResponses || isloading}
                >
                  PDF
                </button>
                <button
                  type="button"
                  className="flex justify-center font-mono items-center w-[52px] h-[52px] text-gray-500 hover:text-white bg-white rounded-full border border-gray-200 shadow-sm hover:bg-blue-500"
                  onClick={handleSaveAsWord}
                  disabled={!hasResponses || isloading}
                >
                  WORD
                </button>
                <button
                  type="button"
                  className="flex justify-center font-mono items-center w-[52px] h-[52px] text-gray-500 hover:text-white bg-white rounded-full border border-gray-200 shadow-sm hover:bg-orange-500"
                  onClick={handleSaveAsPPT}
                  disabled={!hasResponses || isloading}
                >
                  PPT
                </button>
              </div>
              <button
                className={`bg-black rounded-full p-1 ${
                  !hasResponses || currentIndex === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleSwitch("right")}
                disabled={!hasResponses || currentIndex === 1}
              >
                <ChevronRight />
              </button>
              <span className="text-black">{currentIndex + 1}/2</span>
              <button
                className={`bg-black rounded-full p-1 ${
                  !hasResponses || currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleSwitch("left")}
                disabled={!hasResponses || currentIndex === 0}
              >
                <ChevronLeft />
              </button>

              {/* Tab Navigation */}
              <div className="flex text-black border-b">
                <button
                  className={`p-2 ${
                    activeTab === "preview" ? "border-b-2 border-blue-600" : ""
                  } ${!hasResponses ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleTabChange("preview")}
                  disabled={!hasResponses} // Disable if no responses
                >
                  Preview
                </button>
                <button
                  className={`p-2 ${
                    activeTab === "edit" ? "border-b-2 border-blue-600" : ""
                  } ${!hasResponses ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleTabChange("edit")}
                  disabled={!hasResponses} // Disable if no responses
                >
                  Edit
                </button>
              </div>
            </div>
          )}
          <div className="max-w-full h-full rounded-xl m-1 flex flex-col justify-between overflow-auto">
            {/* Tab Content */}
            <div
              className={`p-4 bg-gray-200 w-full ${
                hasResponses ? "md:h-[800px]" : "md:h-full"
              } my-2 rounded-xl shadow-lg text-black text-xl md:text-md overflow-y-auto`}
            >
              {isloading ? (
                <SkeletonLoader />
              ) : activeTab === "edit" ? (
                <MDEditor
                  value={
                    currentIndex === 0 ? response.response1 : response.response2
                  }
                  onChange={(value) => {
                    setResponse((prev) => ({
                      ...prev,
                      [currentIndex === 0 ? "response1" : "response2"]: value,
                    }));
                  }}
                  height="100%"
                />
              ) : (
                <MDEditor.Markdown
                  source={
                    currentIndex === 0 ? response.response1 : response.response2
                  }
                  style={{
                    backgroundColor: "#E5E7EB",
                    color: "black",
                    padding: "5px",
                  }}
                />
              )}
            </div>
          </div>
          {/* End of response Content */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
