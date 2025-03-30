import env from 'dotenv';
env.config();
import config from './config.json' assert {type:"json"};
import mongoose from 'mongoose';

mongoose.connect(config.connectionString);


import express from 'express';
import cors from 'cors';

const app = express();

import jwt from 'jsonwebtoken';
import  authenticateToken  from "./utilities.js";


app.use(express.json());

app.use(cors({
    origin:'*',

}))

app.get("/",(req,res)=>{
    res.json({data:"hello"});
})

app.listen(8000);

export default app;