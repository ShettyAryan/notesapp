import env from 'dotenv';
env.config();
import config from './config.json' assert {type:"json"};
import mongoose from 'mongoose';

mongoose.connect(config.connectionString);

import User from './models/user.model.js';
import Note from './models/note.model.js';


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
        expiresIn : "36000m",
    });

    return res.json({
        error:false,
        user,
        accessToken,
        message: "Registration Successful",
    });
})

app.post("/login", async (req,res)=>{
    const {email, password} = req.body;

    if(!email){
        return res.status(400).json({message:"Email is required"})
    }
    if(!password){
        return res.status(400).json({message:"Password is required"})
    }

    const userInfo = await User.findOne({
        email:email

    })

    if(!userInfo){
        return res.status(400).json({message: "User not found"})
    }

    if (userInfo.email == email && userInfo.password == password){
        const user = {user:userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : "36000m",
        })
        return res.json({
            error:false,
            message: "Login Successful",
            email,
            accessToken,
        })

    }
    else{
        return res.status(400).json({
            error:true,
            message:"Invalid Credentials",
        })
    }

})

//Add Note
app.post("/add-note", authenticateToken, async (req,res)=>{

})


app.listen(8000);

export default app;