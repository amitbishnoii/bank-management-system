import express from "express"
import cors from "cors"
import loginRouter from "./routes/userRoute.js"
import bodyParser from "body-parser"

const port = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use("/api", loginRouter)

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log('app listening on port: ', port);
})