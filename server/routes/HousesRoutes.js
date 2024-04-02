import express from 'express'
import {
	addHouse,
	deleteHouse,
	getHouses,
	getHousesByWard,
	updateHouse
} from '../controllers/housesController.js'
import {
	uploadFile
} from '../middlewares/multerMiddleware.js'
import {
	admin,
	protect
} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getHouses).post(protect, uploadFile, addHouse).put(protect, admin, uploadFile, updateHouse)
router.get('/wards/:id', getHousesByWard)
router.delete('/:id', protect, admin, deleteHouse)

export default router