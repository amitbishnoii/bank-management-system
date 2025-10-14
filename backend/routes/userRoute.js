import express from "express"

const router = express.Router()

router.post("/login", (req, res) => {
    const {username, password} = req.body

    if (username === "avrit" && password === "avrittoor") {
        console.log('hogya login');
        return res.json({message: "Login Successful!", success: true})
    } else {
        console.log('error');
        return res.json({message: "Login Failed!", success: false})
    }
})

export default router