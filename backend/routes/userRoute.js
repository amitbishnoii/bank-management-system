import express from "express"
import User from "../models/User.js"

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).json({message: "User created!", success:true})
    } catch(err) {
        res.status(500).json({ message: err.message, success: false })
    }
})

export default router