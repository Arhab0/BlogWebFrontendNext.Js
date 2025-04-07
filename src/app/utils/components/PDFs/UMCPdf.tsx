"use client";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import {
  changeDateFormat,
  formatWithoutTimeZoneOffset,
} from "../../../../../Helper/DateFormats";

interface Props {
  footerTxt: string;
  divColor: string;
  sessionName: string;
  data: StudentRecord[];
}

interface StudentRecord {
  StudentID: string;
  CourseCode: string;
  CenterCode: string;
  ExamDate: string;
  Charges: string;
}

const DownloadPDF = ({ footerTxt, divColor, sessionName, data }: Props) => {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    try {
      setLoading(true);
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
      const fontColorGray = rgb(71 / 255, 85 / 255, 105 / 255);
      const fontColorBlack = rgb(0, 0, 0);
      const imageUrl = "/logo.png";
      const imageResponse = await fetch(imageUrl);
      const imageBytes = await imageResponse.arrayBuffer();
      const image = await pdfDoc.embedPng(imageBytes);

      // Page dimensions
      const pageWidth = 595;
      const pageHeight = 842;
      const rowHeight = 24;
      const headerHeight = 100;
      const footerHeight = 40;

      // Calculate maximum number of records per page dynamically
      const maxRecordsPerPage = Math.floor(
        (pageHeight - headerHeight - footerHeight) / rowHeight
      );
      const totalPages = Math.ceil(data.length / maxRecordsPerPage);

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const { width, height } = page.getSize();

        // Header
        const headerText = "ALLAMA IQBAL OPEN UNIVERSITY";
        const sessionLabel = "Session : ";
        const headerFontSize = 24;
        const sessionFontSize = 10;
        const headerY = height - 40;
        const sessionY = height - 60;
        const imageSize = 45;

        page.drawText(headerText, {
          x:
            width / 2 -
            fontBold.widthOfTextAtSize(headerText, headerFontSize) / 2,
          y: headerY,
          size: headerFontSize,
          font: fontBold,
          color: rgb(45 / 255, 176 / 255, 103 / 255),
        });

        const sessionLabelWidth = font.widthOfTextAtSize(
          sessionLabel,
          sessionFontSize
        );
        page.drawText(sessionLabel, {
          x:
            width / 2 -
            (sessionLabelWidth +
              font.widthOfTextAtSize(sessionName, sessionFontSize)) /
              2,
          y: sessionY,
          size: sessionFontSize,
          font,
          color: fontColorBlack,
        });

        page.drawText(sessionName, {
          x:
            width / 2 -
            (sessionLabelWidth +
              font.widthOfTextAtSize(sessionName, sessionFontSize)) /
              2 +
            sessionLabelWidth,
          y: sessionY,
          size: sessionFontSize,
          font: fontBold,
          color: fontColorBlack,
        });

        page.drawImage(image, {
          x: width - imageSize - 20,
          y: sessionY - 5,
          width: imageSize,
          height: imageSize,
        });

        page.drawLine({
          start: { x: 20, y: sessionY - 10 },
          end: { x: width - 20, y: sessionY - 10 },
          thickness: 0.5,
          color: fontColorGray,
        });

        // Table Properties
        const tableStartY = height - 100;
        const headers = [
          "S.No",
          "Student ID",
          "Course",
          "Center",
          "Exam Date",
          "Charges",
        ];

        const tableWidth = width * 0.93; // 80% of page width
        const tableStartX = (width - tableWidth) / 2; // Center table
        const colWidths = [
          tableWidth * 0.08,
          tableWidth * 0.15,
          tableWidth * 0.15,
          tableWidth * 0.15,
          tableWidth * 0.15,
          tableWidth * 0.32,
        ]; // Adjusted column widths

        let xPos = tableStartX;
        let yPos = tableStartY;

        // Draw Table Headers
        headers.forEach((header, index) => {
          page.drawRectangle({
            x: xPos,
            y: yPos - 2,
            width: colWidths[index],
            height: rowHeight,
            borderColor: fontColorGray,
            borderWidth: 0.5,
          });

          page.drawText(header, {
            x:
              xPos +
              colWidths[index] / 2 -
              fontBold.widthOfTextAtSize(header, 10) / 2, // Center horizontally
            y: yPos + rowHeight / 2 - 5, // Center vertically
            size: 10,
            font: fontBold,
            color: fontColorBlack,
          });

          xPos += colWidths[index];
        });

        // Draw Table Rows
        yPos -= rowHeight;
        const pageData = data.slice(
          pageIndex * maxRecordsPerPage,
          (pageIndex + 1) * maxRecordsPerPage
        );

        pageData.forEach((record, rowIndex) => {
          let xOffset = tableStartX;
          const values = [
            String(pageIndex * maxRecordsPerPage + rowIndex + 1 + " ."),
            record.StudentID,
            record.CourseCode,
            record.CenterCode,
            record.ExamDate,
            record.Charges,
          ];

          values.forEach((text, colIndex) => {
            page.drawText(text, {
              x: xOffset + 5,
              y: yPos + rowHeight / 2 - 5, // Center vertically
              size: 10,
              font,
              color: fontColorBlack,
            });

            page.drawRectangle({
              x: xOffset,
              y: yPos - 2,
              width: colWidths[colIndex],
              height: rowHeight,
              borderColor: fontColorGray,
              borderWidth: 0.5,
            });

            xOffset += colWidths[colIndex];
          });

          yPos -= rowHeight;
        });

        // Footer
        const footerFontSize = 8;
        const footerY = 30;
        const footerText = "UMC REPORT ( " + footerTxt + " )";
        const pageNumberLabel = "P A G E ";
        const pageNumber = `${pageIndex + 1} / ${totalPages}`;
        const pageNumberLabelWidth = font.widthOfTextAtSize(
          pageNumberLabel,
          footerFontSize
        );
        const pageNumberX =
          width -
          font.widthOfTextAtSize(pageNumberLabel + pageNumber, footerFontSize) -
          20;

        page.drawText(pageNumberLabel, {
          x: pageNumberX,
          y: footerY,
          size: footerFontSize,
          font,
          color: fontColorGray,
        });

        page.drawText(pageNumber, {
          x: pageNumberX + pageNumberLabelWidth,
          y: footerY,
          size: footerFontSize,
          font: fontBold,
          color: fontColorBlack,
        });

        page.drawText(footerText, {
          x: 20,
          y: footerY,
          size: footerFontSize,
          font,
          color: fontColorGray,
        });

        page.drawLine({
          start: { x: 20, y: footerY + 10 },
          end: { x: width - 20, y: footerY + 10 },
          thickness: 0.5,
          color: fontColorGray,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(
        blob,
        `${footerTxt}-Report ${sessionName} ${changeDateFormat(
          formatWithoutTimeZoneOffset(new Date())
        )}`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      className={`${
        divColor === "blue"
          ? "text-white btnHeight text-nowrap flex-1 text-xs font-normal font-alata w-full py-2 px-4 rounded shadow hover:cursor-pointer focus:outline-none hover:bg-themeColorHover bg-themeColor disabled:opacity-50"
          : "text-themeColor btnHeight text-nowrap flex-1 text-xs font-normal font-alata w-full py-2 px-4 rounded shadow hover:cursor-pointer focus:outline-none focus:ring-2  hover:bg-[#f5f5f5] bg-white disabled:opacity-50"
      }`}
      disabled={loading}
    >
      {loading ? "Generating..." : "Download Report"}
    </button>
  );
};

export default DownloadPDF;
