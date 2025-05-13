import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt

        // console.log("Token in protectRoute middleware",token);
        if(!token) {
            return res.status(401).json({message: "Unauthorized - no token is provided"});
        }

        const verifyJwt = jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log("verifyJwt in protectRoute middleware",verifyJwt);

        if(!verifyJwt) {
            return res.status(401).json({message: "Unauthorized - invalid token"});
        }

        const user = await User.findById(verifyJwt.userId).select("-password");
        // console.log("User in protectRoute middleware",user);

        if(!user){
            return res.status(401).json({message: "Unauthorized - User not found"});
        }

        req.user = user;
        // console.log("User in request object",req.user);

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}