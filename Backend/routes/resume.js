import express from 'express'
import protect from '../middleware/protect.js'
import {
    upload,
    resumeParser,
    resumeAnalyzer
} from '../controllers/resumeController.js'

export const resumeRouter = express.Router();

resumeRouter.post('/upload', protect, upload.single("resume"), resumeParser)
resumeRouter.post('/analyze', protect, resumeAnalyzer)