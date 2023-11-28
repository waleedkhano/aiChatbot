import express from 'express';
import { getNotes, postNotes } from '../controllers/notesController';

const router = express.Router();


router.post('/postnotes', postNotes)
router.get('/getnotes', getNotes)

export default router; 