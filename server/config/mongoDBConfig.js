import mongoose from "mongoose";

const connectDB = async()=>{
	try {
		await mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017") //MongooseServerSelectionError -fix
	} catch (error) {
		throw error
	}
}

export default connectDB