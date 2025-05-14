import express from 'express';
import { getReadings, addReading } from '../controllers/phController.js';

const router = express.Router();

router.get('/', getReadings);
router.post('/', addReading);

export default router;
