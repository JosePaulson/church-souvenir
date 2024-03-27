import express from 'express'
import connectDB from './config/mongoDBConfig.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import housesRoutes from './routes/HousesRoutes.js'
import { notFound, errorHandler } from './middlewares/errorHandler.js'


dotenv.config()
const port = process.env.PORT

connectDB()

const app = express()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('server started: PORT-' + port)
})

app.use('/api/houses', housesRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening at port', port)
})
