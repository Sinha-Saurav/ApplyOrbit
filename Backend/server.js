import express from 'express';
import cors from 'cors';
import { applicationRouter } from './routes/applications.js';
import authRouter from "./routes/auth.js"

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/applications', applicationRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`App is listening at port ${PORT}`) 
})