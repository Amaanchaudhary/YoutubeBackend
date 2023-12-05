import express from 'express';
// import { Hello } from './Controllers/Global.Controllers.js';
import router from './Routes/index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors'

const app = express();

dotenv.config()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// app.get("/hello" , Hello)

app.get("/" , function (req , res){
    res.send("Welcome to Youtube Backend Server")
})

app.use("/youtube/api/v1" , router)


mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected"))

app.listen(8000, () => console.log("app is running on 8000 port"))