import { Console } from "console"
import exp from "constants"
import express from "express"


const app = express()
const PORT = 3000;

// app.use(express.static())
app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("index.ejs")
})


app.get("/jokes", (req, res) => {
    res.json(data);
})


app.get("/jokes/:id", (req, res) => {
    const jokesId = parseInt(req.params.id)
    const joke = data.find(i => i.id === jokesId);

    if (joke) {
        res.json(joke)  
    }
    else {
        res.status(404).send("Id Not found / Resources not found")
    }
})


app.post("/createjoke", (req, res) => {


    const newjoke = {
        id: data.length + 1,
        name: req.body.name,
        college: req.body.college,

    }

    data.push(newjoke)
    res.status(201).send(newjoke);

})



app.put("/jokes/:id", (req, res) => {

    const jokesId = parseInt(req.params.id);

    const joke = data.find(i => i.id === jokesId)

    if (joke) {
        joke.name = req.body.name;
        joke.college = req.body.college;
        res.json(joke)
    }
    else {
        res.status(404).send("Resouce not found")
    }

})



app.delete("/jokes/:id", (req, res) => {
    const jokesId = parseInt(req.params.id);
    const indexNum = data.findIndex(i => i.id === jokesId);

    if (indexNum !== -1) {
        data.splice(indexNum, 1); // Remove 1 element at indexNum
        res.status(204).send("Item is deleted successfully...");
    } else {
        res.status(404).send("ID not found in data");
    }
});



app.patch("/jokes/:id", (req,res) => {
    const jokesId = parseInt(req.params.id);

    const joke = data.find(i => i.id === jokesId)

    if (joke) {
        
        if (req.body.name) {
            joke.name = req.body.name
        }

        if (req.body.console){
            joke.college = req.body.college
        }


        res.json(joke)
    }
})



app.listen(PORT, () => {
    console.log("Server is running...")
})







const data = [
    {id: 1, name: "jaimin", college: "PU"},
    {id: 2, name: "Khusal", college: "MSU"},
    {id: 3, name: "Raj", college: "Pune"},
]