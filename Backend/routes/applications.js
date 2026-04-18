import express from 'express'
import {
    getApplications,
    addApplications,
    deleteApplications,
    updateApplications
} from '../controllers/applicationControllers.js'

export const applicationRouter = express.Router()

applicationRouter.get('/', getApplications)
applicationRouter.post('/', addApplications)
applicationRouter.patch('/:id', updateApplications)
applicationRouter.delete('/:id', deleteApplications)