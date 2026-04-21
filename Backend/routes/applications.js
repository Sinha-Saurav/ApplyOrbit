import express from 'express'
import {
    getApplications,
    addApplications,
    deleteApplications,
    updateApplications
} from '../controllers/applicationControllers.js'
import protect from '../middleware/protect.js'

export const applicationRouter = express.Router()

applicationRouter.get('/', protect, getApplications)
applicationRouter.post('/', protect, addApplications)
applicationRouter.patch('/:id', protect, updateApplications)
applicationRouter.delete('/:id', protect, deleteApplications)