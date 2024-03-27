import express from 'express'
import { addHouse, getHouses } from '../controllers/housesController.js'
import { uploadFile } from '../middlewares/multerMiddleware.js'

const router = express.Router()

router.get('/', getHouses).post('/', uploadFile, addHouse)

export default router