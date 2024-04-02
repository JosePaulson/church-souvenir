import express from 'express'
import connectDB from './config/mongoDBConfig.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import housesRoutes from './routes/housesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { notFound, errorHandler } from './middlewares/errorHandler.js'
import path from 'path'


dotenv.config()
const port = process.env.PORT

connectDB()

const app = express()

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// app.get('/', (req, res)=>{
//     res.send('server started: PORT-' + port)
// })

app.use('/api/houses', housesRoutes)
app.use('/api/auth', authRoutes)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening at port', port)
})
