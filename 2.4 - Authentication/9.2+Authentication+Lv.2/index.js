import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import bcrypt from 'bcrypt'

// const variables
const app = express();
const port = 3000;
const salrRounds = 3;


// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', "ejs")


// create DB credentials 
const db = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  database: 'Auth level 1',
  password: 'jaimin16',
})

try {

  db.connect()
  console.log("Database connected...")

} catch {
  console.error("Database Connection Error")
}




app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

  console.log(req.body)
  const email = req.body.username;
  const pass = req.body.password;

  // add email and password to the database



  bcrypt.hash(pass, salrRounds, async (err, hash) => {

    const response = await db.query("SELECT * FROM users WHERE email = $1 AND user_pass = $2", [email, hash])

    if (response.rows.length === 1) {
      res.render("secrets.ejs")

    } else {

      if (err) {
        console.error("Hashing failed...")
      }

      const result = await db.query("INSERT INTO users (email, user_pass) VALUES ($1, $2) RETURNING *", [email, hash])
      console.log(result.rows[0])
      res.render("secrets.ejs")
    }


  })

  
  
  

  
});

app.post("/login", async (req, res) => {
  console.log(req.body)
  const email = req.body.username;
  const pass = req.body.password;


  const result = await db.query("SELECT * FROM users WHERE email = $1", [email])

  console.log(result.rows[0])
  
  const hashPass = result.rows[0].user_pass
    

    const comp = await bcrypt.compare(pass, hashPass)





    if (comp) {
      console.log("Loged in...")
      res.render("secrets.ejs")

    } else {
      
      let emailWrong = await db.query("SELECT * FROM users WHERE email = $1", [email])

      if (emailWrong.rows.length === 1) {
        console.log("Your Password is wrong")
        res.redirect("/login")
      } else {
        res.redirect("/register")
      }
    }
      


  






});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
