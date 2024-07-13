import express from "express"
import {dirname} from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"



const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();


app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.sendFile(__dirname +"/public/index.html")
    console.log("home page loaded")
})


app.post("/check", (req, res) => {
    const user_pass =  req.body["password"]
    if (user_pass == "ILoveJS"){
        res.sendFile(__dirname + "/public/secret.html")
    }
    else{
        res.send("Sorry Password is wrong")
    }
})


app.listen(port, () => {
    console.log(`Port is started ${port}`)
})





