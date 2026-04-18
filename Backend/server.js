import express from 'express';
import cors from 'cors';
import { applicationRouter } from './routes/applications.js';

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/application', applicationRouter)

app.listen(PORT, ()=>{
    console.log(`App is listening at port ${PORT}`) 
})