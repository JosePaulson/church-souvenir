import express from 'express'
import { addHouse, getHouses, getHousesByWard } from '../controllers/housesController.js'
import { uploadFile } from '../middlewares/multerMiddleware.js'

const router = express.Router()

router.get('/', getHouses).post('/', uploadFile, addHouse)
router.get('/wards/:id', getHousesByWard)

export default router