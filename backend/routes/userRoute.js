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

router.post("/register", (req, res) => {
    const {firstName, lastName, username, phone, email, password} = req.body
    console.log(req.body);

    if (!username || !password || !firstName || !lastName || !phone || !email) {
        return res.json({message: "Registration Failed, All fields are required", success: false})        
    }

    let account_number = Math.floor(1000000000 + Math.random() * 9000000000);
       return res.json({
        message: "Account created successfully",
        success: true,
        account_number,
    });
})

export default router