import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/:username/dashboard", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        res.status(200).json({success: true, user})        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body)
        if (!user) {
            res.status(404).json({message: "User not found!", success: false})
        }
        else {
            user.password = await bcrypt.hash(user.password, 10)
            await user.save()
            res.status(200).json({ message: "User created!", success: true })
        }
    } catch (err) {
        res.status(500).json({ message: err.message, success: false })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false })
        }
        else {
            const status = bcrypt.compare(req.body.password, user.password)
            if (status) {
                return res.status(200).json({ message: "Login Success!", user, success: true })
            } else {
                return res.status(401).json({ message: "Incorrect password", success: false })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
})

export default router