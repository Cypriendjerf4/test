import { Router } from 'express';
import { createQuote, getQuotes, getQuotePdf } from '../controllers/quoteController.js';
import { auth } from '../utils/auth.js';

const router = Router();

router.post('/', createQuote);
router.get('/', auth, getQuotes);
router.get('/:id/pdf', getQuotePdf);

export default router;
