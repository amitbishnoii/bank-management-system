import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/admin/info/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) {
            res.status(404).json({ message: "user not found", success: false })
        } else {
            res.status(200).json({ message: "user found", success: true, userInfo: user })
        }
    }
    catch (err) {
        res.status(500).json({ message: `server error: ${err.message}`, success: false })
    }
})

router.put("/admin/:username/edit", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        }
        else {
            const editedUser = await User.findOneAndUpdate({ username: req.params.username }, {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            },
                { new: true });
            res.status(200).json({ message: "Edit Success!", editedUser, success: true })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.post("/admin/:username/blockUser", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        }
        else {
            await User.findOneAndUpdate({ username: req.params.username }, {
                $set: {
                    isBlocked: true
                }
            })
            res.status(200).json({ message: "User Blocked!", success: true })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.post("/admin/:username/unblockUser", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        }
        else {
            await User.findOneAndUpdate({ username: req.params.username }, {
                $set: {
                    isBlocked: false
                }
            })
            res.status(200).json({ message: "User Unblocked!", success: true })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.delete("/admin/:username/delete", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        }
        else {
            await User.findOneAndDelete({ username: req.params.username });
            res.status(200).json({ message: "User deleted!", success: true })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        } else {
            res.status(200).json({ user, success: true })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.get("/:username/dashboard", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) { res.status(404).json({ message: "User not found!", success: false }) }
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:username/transactions", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })

        if (!user) {
            res.status(404).json({ message: "User not found!", success: false });
        }
        else {
            res.status(200).json({ success: true, transactions: user.transactions })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body)
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
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

router.post("/:username/deposit", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        }
        else if (user.isBlocked) {
            res.status(403).json({ message: "Account is blocked", success: false })
        }
        else {
            await User.findOneAndUpdate(
                { username: req.params.username },
                {
                    $inc: { balance: req.body.amount },
                    $push: {
                        transactions: {
                            type: "deposit",
                            amount: req.body.amount,
                            recipient: "Self",
                            balanceAfter: user.balance + req.body.amount
                        }
                    }
                },
                { new: true }
            );
            res.status(200).json({ message: "Deposit Success!", current_balance: user.balance, success: true })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.post("/:username/withdraw", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json({ message: "User not found!", success: false })
        }
        else if (user.isBlocked) {
            res.status(403).json({ message: "Account is blocked", success: false })
        }
        else if (user.balance > req.body.amount) {
            await User.findOneAndUpdate(
                { username: req.params.username },
                {
                    $inc: { balance: -req.body.amount },
                    $push: {
                        transactions: {
                            type: "withdraw",
                            amount: req.body.amount,
                            recipient: "Self",
                            balanceAfter: user.balance - req.body.amount
                        }
                    }
                },
                { new: true }
            );
            res.status(200).json({ message: "Withdraw Success!", current_balance: user.balance, success: true })
        }
        else {
            res.status(400).json({ message: "Insufficient Balance!", success: false})
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(404).json({ message: "User not found", success: false })
        }
        else if (user.isBlocked) {
            res.status(403).json({ message: "Account is blocked", success: false })
        }
        else {
            const status = await bcrypt.compare(req.body.password, user.password)
            console.log(status);
            if (status) {
                res.status(200).json({ message: "Login Success!", user, success: true })
            } else {
                res.status(401).json({ message: "Incorrect password", success: false })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
})

router.post("/:username/transfer", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const reciever = await User.findOne({ accountNumber: req.body.accountNumber });

        if (!reciever) {
            res.status(404).json({ message: "User not Found, Check Account Number!", success: false })
        }

        else if (reciever.isBlocked) {
            res.status(403).json({ message: "Account is blocked", success: false })
        }

        else if (user.balance > req.body.transferAmount) {
            const withdraw = await User.findOneAndUpdate(
                { username: req.params.username },
                {
                    $inc: { balance: -req.body.transferAmount },
                    $push: {
                        transactions: {
                            type: "transfer",
                            amount: req.body.transferAmount,
                            recipient: status.username,
                            balanceAfter: user.balance - req.body.transferAmount
                        }
                    }
                },
                { new: true }
            );

            const deposit = await User.findOneAndUpdate(
                { accountNumber: req.body.accountNumber },
                {
                    $inc: { balance: req.body.transferAmount },
                    $push: {
                        transactions: {
                            type: "recieved",
                            amount: req.body.transferAmount,
                            sender: req.params.username,
                            balanceAfter: user.balance - req.body.transferAmount
                        }
                    }
                },
                { new: true }
            );
            res.status(200).json({ message: "Transfer Success!", withdraw, deposit, success: true })
        }
        else {
            res.status(400).json({ message: "Insufficient Balance!", success: false })
        }

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})


export default router