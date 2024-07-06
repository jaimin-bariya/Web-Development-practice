import express from "express"



const app = express();

const today = new Date() // Date(---)
const day = today.getDay() // 6

app.get("/", (req, res) => {

    let userdayType = "it is a weekday"
    let useradvice = "Work Hard"


    if (day === 0 || day === 6 ){ //|| day in [1, 2, 3, 4, 5] for testing weekend plans
        userdayType = "It is a weekend"
        useradvice = "Gummo bahar jake yaar"
    }

    res.render("solution.ejs", {
        dayType: userdayType,
        advice: useradvice
    })
})


app.listen(3000, () => {

})
