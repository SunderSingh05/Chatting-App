import validator from "validator";
import User from "../models/User.model.js"
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../db/stream.js";

export async function signup(req,res){
    const {email,fullName,password} =req.body;

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }
        //used validator for validating email
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists , please use a new email"});
        }

        const index = Math.floor(Math.random() * 100) +1; //genarate a number randomly between 1 and 100
        const randomAvatar = `https://avatar.iran.liara.run/public/${index}.png`;
        
        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            });
            console.log(`stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.log("Error creating stream user:" ,error);
            
        }

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })

        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //prevent xss attacks
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success: true ,user:newUser})

    } catch (error) {
        console.log("Error in signup process",error);
        res.status(500).json({message: "internal server error"})
    }
}

export async function login(req,res){
    try {
        const {email , password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message: "Invalid email or password"});


        const isPasswordCorrect = await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message: "Invalid email or password"});


        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })


        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //prevent xss attacks
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        

        res.status(200).json({success: true , user});

    } catch (error) {
        console.log("Error in login controller" , error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({success: true, message: "Logout successful"})
}

export async function onboard(req,res){
    try {
        const userId = req.user._id;
        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location ){
            res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnBoarded: true,
        },{new:true})

        if(!updatedUser) {
            return res.status(404).json({message: "User not found"})
        }

        // update in stream too
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
            
        } catch (StreamError) {
            console.log(("Error in updating stream user during onboarding: " , StreamError.message));
            
        }

        res.status(200).json({success: true , user: updatedUser})

    } catch (error) {
        console.log("Onboarding error");
        res.status(500).json({message: "Internal server error"});
    }
}