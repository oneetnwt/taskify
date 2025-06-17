import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// Routes Import
import authRoutes from './routes/authRoute.js'
import taskRoutes from './routes/taskRoute.js'
import connectDB from './db/connectDB.js'

// Loading .env values
dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// App Routes
app.get('/', (req, res) => {
    res.send("Welcome to Taskify API")
})
app.use('/auth', authRoutes)
app.use('/api', taskRoutes)

// Entry point
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    connectDB();
})