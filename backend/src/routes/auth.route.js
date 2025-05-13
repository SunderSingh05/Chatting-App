import express from "express"
import { login, logout, onboard, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout) // IT CAN BE GET BUT IT IS RECOMMENDED TO BE POST AS POST METHOD IS FOR UPDATIONS THAT CHANGES SERVER STATE

router.post("/onboarding" , protectRoute , onboard)

//check user is logged in or not 

router.get("/me", protectRoute, (req,res) =>{
    res.status(200).json({success: true, user: req.user})
})

export default router