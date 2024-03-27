import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	work: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
	},
	blood: {
		type: String,
	},
	email: {
		type: String,
	},
	HOH: {
		type: Boolean,
		required: true
	}
})

const houseSchema = new mongoose.Schema({
	house: {
		type: String,
		required: true,
	},
	ward: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true
	},
	members: [memberSchema]
})

const House = mongoose.model('House', houseSchema)

export default House