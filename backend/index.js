import env from 'dotenv';
env.config();
import config from './config.json' assert {type:"json"};
import mongoose from 'mongoose';

mongoose.connect(config.connectionString);

import User from './models/user.model.js'


import express from 'express';
import cors from 'cors';

const app = express();

import jwt from 'jsonwebtoken';
import  authenticateToken  from "./utilities.js";


app.use(express.json());

app.use(cors({
    origin:'*',

}));

app.get("/",(req,res)=>{
    res.json({data:"hello"});
});

app.post("/create-account", async(req, res) =>{
    const {fullName, email, password} = req.body;

    if(!fullName){
        return res.status(400).json({error: true, message:"Full name is required"})
    }
    if(!email){
        return res.status(400).json({error: true, message:"Email is required"})
    }
    if(!password){
        return res.status(400).json({error: true, message:"Password is required"})
    }

    const isUser = await User.findOne({email: email});
    if(isUser){
        return res.json({
            error:true,
            message:"User already exists",
        })
    }

    const user = new User({
        fullName,
        email,
        password,
    })
    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : "30m",
    });
})



app.listen(8000);

export default app;