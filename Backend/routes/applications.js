import express from 'express'
import {
    getApplications,
    addApplications,
    deleteAllApplications,
    deleteApplications,
    updateApplications
} from '../controllers/applicationControllers.js'
import protect from '../middleware/protect.js'

export const applicationRouter = express.Router()

applicationRouter.get('/', protect, getApplications)
applicationRouter.post('/', protect, addApplications)
applicationRouter.delete('/', protect, deleteAllApplications)
applicationRouter.patch('/:id', protect, updateApplications)
applicationRouter.delete('/:id', protect, deleteApplications)