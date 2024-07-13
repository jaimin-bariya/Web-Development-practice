import express, { json } from "express"
import pg from "pg"


const app = express()
const port = 3000

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))



const gameState = {
    totalCapitalRows: 250,
    totalCurrentScore: 2,
    highSocre: 5,
    newQue: null,

}



// database connection 
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "jaimin16",
    port: 5432,
})




async function startServer() {


    try {
        await db.connect();
        console.log("Server is connected...")

        // fetching initial question 
        gameState.newQue = await nextQuestion();

        const scoreInfo = {
            current: gameState.totalCurrentScore,
            high: gameState.highSocre,
            country: gameState.newQue ? gameState.newQue.country : null 

        }


        // handling get request - first time page loading...
        app.get("/", async (req, res) => {


            res.render("index.ejs", {score: scoreInfo})

        
        })



        // handling post request after user guess
        app.post("/", async (req, res) => {


   
        
        
            // handle user_guess
        
            let user_guess = req.body.user_guess.trim()

            console.log(gameState.newQue)

            console.log(user_guess)
        
            console.log(gameState.newQue.capital)
        
        
            if (user_guess.toLowerCase() === gameState.newQue.capital.toLowerCase()) {
                gameState.totalCurrentScore++;
            }


            gameState.newQue = await nextQuestion()

            if (gameState.totalCurrentScore > gameState.highSocre) {
                gameState.highSocre = gameState.totalCurrentScore
            }

            const scoreInfo = {
                current: gameState.totalCurrentScore,
                high: gameState.highSocre,
                country: gameState.newQue ? gameState.newQue.country : null 

            }




            console.log(gameState.newQue)
            
            res.render("index.ejs", {score: scoreInfo})




        })


        // listining port number
        app.listen(port, () => {
            console.log("Server is running on " + port)
        })
        

  

    }
    catch (err) {
        console.error("error is " + err.stack)
    }

}






startServer()








// function to generate next question...
async function nextQuestion() {
    let question;

    let randomId = Math.floor((Math.random() * gameState.totalCapitalRows-1) + 1);

    console.log(randomId)


    try {
        const result = await db.query("SELECT * FROM capitals WHERE id = $1", [randomId]);

        if (result.rows.length > 0) {
            return result.rows[0]

        } else {
            console.log("No question found at id " + randomId)
            return null;
        }
    } catch (err) {
        console.error("got this error " + err.stack )
        return null;
    }




        db.end()



}