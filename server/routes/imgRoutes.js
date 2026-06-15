import express from 'express';
import { generateImage } from '../controllers/imgController.js';
import { protect } from '../middleware/authMiddleware.js';

const imgRoutes = express.Router();

imgRoutes.post('/generate', protect , generateImage);

export default imgRoutes;