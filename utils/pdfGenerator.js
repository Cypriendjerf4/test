import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateQuotePDF = (quote) => {
  const doc = new PDFDocument();
  const filePath = `./public/pdfs/${quote._id}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Devis AKRO', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Reference produit: ${quote.productReference}`);
  doc.text(`Prix: ${quote.price.toFixed(2)} €`);
  doc.text(`Date: ${quote.createdAt.toDateString()}`);
  doc.end();

  return filePath;
};
