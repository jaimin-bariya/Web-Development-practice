import express from "express"
import axios from "axios"



const app = express()
const PORT = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))



// make a random get request

app.get("/", async (req, res) => {

    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random")
        const result = response.data;

        res.render("index.ejs", {data: result})
    }

    catch (error) {
        console.log(`Get Error ${error.nessage} `)
        res.render("index.ejs", {error: error.message})
    }

})



app.post("/", async (req, res) => {
    const activityType = req.body.type;
    const activityMember = req.body.participants;
    console.log(activityMember)
    console.log(activityType)
    console.log(req.body)

    try {

        //https://bored-api.appbrewery.com/filter?type=education
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activityType}&participants=${activityMember}`)
        const result = response.data;


        res.render("index.ejs", {
            data: result[Math.floor(Math.random() * result.length)]
        })
    }
    catch (error) {
        console.log( `Error is ${error.message}`)
        res.render("index.ejs", {error: "No activity that match your criteria"})
    }




})



app.listen(PORT, () => {
    console.log("server is running")
})