import asyncHandler from "../utils/asyncHandler.js";
import getImageUrl from "../middlewares/multerMiddleware.js";
import House from "../models/houseModel.js";

//@desc     get all houses
//@route    GET /api/houses
//@access   Public
const getHouses = asyncHandler(async(req, res) => {
	const houses = await House.find({})
	if(houses){
		res.status(200).json(houses)
	}else{
		res.status(500)
		throw new Error("Server error")
	}
})
//@desc     get all houses
//@route    GET /api/houses
//@access   Public
const getHousesByWard = asyncHandler(async(req, res) => {
	const houses = await House.find({'ward': req.params.id})
	if(houses){
		res.status(200).json(houses)
	}else{
		res.status(500)
		throw new Error("Server error")
	}
})

//@desc     create new house
//@route    POST /api/houses
//@access   Private
async function addHouse (req, res) {
    const imgUrl = await getImageUrl(req)
	const {
		house,
		ward,
		members
	} = req.body
	if(house && ward && imgUrl){
		const h = await House.create({
			house,
			ward,
			image: imgUrl,
			members: JSON.parse(members)
		})
		await h.save()
		res.status(201).json({"message": "success, house created"})
	}else if(!imgUrl){
		res.status(500)
		throw new Error("Cloudinary error, image could not be uploaded.")
	}else{
		res.status(400)
		throw new Error("House or Ward detail missing, try again")
	}
}

export {
	getHouses,
	getHousesByWard,
	addHouse,
}