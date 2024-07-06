import express from "express"

const app = express()
const portN = 3000



// DIRECT WAY
app.get("/", (req, res)=> {
    res.send("<h1> This is Home Page</h1>")

})

app.get("/about", (req, res)=> {
    res.send("<h1> This is about Page</h1>")
})


app.get("/contact", (req, res)=> {
    res.send("<h1> This is contact Page</h1>")

})

app.listen(portN, () => {
    console.log(`Server is running on port number ${portN} `)
})


