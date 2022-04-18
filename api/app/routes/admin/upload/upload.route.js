import express from 'express';
const uploadRouter = express.Router();
import uploadController from './upload.controller.js'

uploadRouter.post('/upload-image', uploadController.uploadImage)

export default uploadRouter