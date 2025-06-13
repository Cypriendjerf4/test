import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendQuoteEmail = async (quote, pdfPath) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: `${quote.clientInfo.email}, moi@monagence.com`,
    subject: 'Votre devis AKRO',
    text: `Merci pour votre demande. Prix: ${quote.price.toFixed(2)} €`,
    attachments: [
      { filename: 'devis.pdf', path: pdfPath }
    ]
  };
  await transporter.sendMail(mailOptions);
};
