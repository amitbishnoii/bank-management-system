import express from "express"
import User from "../models/User.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).json({ message: "User created!", success: true })
    } catch (err) {
        res.status(500).json({ message: err.message, success: false })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false })
        } else {
            if (user.password === req.body.password) {
                return res.status(200).json({ message: "Login Succeed!", user, success: true })
            } else {
                return res.status(401).json({ message: "Incorrect password", success: false })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
})

export default router