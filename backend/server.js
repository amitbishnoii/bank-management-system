import express from "express"
import cors from "cors"
import loginRouter from "./routes/userRoute.js"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const port = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use("/api", loginRouter)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongodb connected')).catch(err => { console.log(err) })

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log('app listening on port: ', port);
})