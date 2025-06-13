import Quote from '../models/Quote.js';
import { generateQuotePDF } from '../utils/pdfGenerator.js';
import { sendQuoteEmail } from '../utils/email.js';

const BASE_PRICE = 13.20;
const PRICE_MODIFIERS = {
  Gaine_tissee: 1.50,
  GAINE_NORMALE: 0,
  NOIR: 0, ROUGE: 0.50, BLEU: 0.50, VERT: 0.50, ORANGE: 0.50, GRIS: 0, JAUNE: 0.50, BLANC: 0.50,
  SIMPLE: 0, DOUBLE: 15.00,
  TA: 0, Boucle: 1.50, PIER_O: 3.00,
  'Petite Boucle': 0, TA: 0.50, PIER_O: 2.00,
  OUI: 0, NON: -1.00,
  length: 0.05
};

const calcPrice = (data) => {
  let price = BASE_PRICE;
  price += PRICE_MODIFIERS[data.productFamily];
  price += PRICE_MODIFIERS[data.ropeColor];
  price += PRICE_MODIFIERS[data.ropeType];
  price += PRICE_MODIFIERS[data.configType];
  price += PRICE_MODIFIERS[data.mainConnector];
  price += PRICE_MODIFIERS[data.ceMarking];
  price += PRICE_MODIFIERS[data.strand1Termination];
  if (data.ropeType === 'DOUBLE') {
    price += PRICE_MODIFIERS[data.strand2Termination];
  }
  price += data.totalLength * PRICE_MODIFIERS.length;
  return price;
};

export const createQuote = async (req, res) => {
  try {
    const data = req.body;
    const price = calcPrice(data);
    const quote = await Quote.create({ ...data, price });
    const pdfPath = generateQuotePDF(quote);
    await sendQuoteEmail(quote, pdfPath);
    res.status(201).json(quote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuotePdf = async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) return res.status(404).send('Not found');
  const pdfPath = `./public/pdfs/${quote._id}.pdf`;
  res.download(pdfPath);
};
