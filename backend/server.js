import express from "express"
import cors from "cors"
import loginRouter from "./routes/userRoute.js"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use("/user", loginRouter)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongodb connected')).catch(err => { console.log(err) })

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to DB:", db.name);
});

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log('app listening on port: ', port);
})