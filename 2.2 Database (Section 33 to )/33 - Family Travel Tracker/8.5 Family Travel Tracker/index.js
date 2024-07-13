import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Family Travel Tracker",
  password: "jaimin16",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];



app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  console.log(currentUser)
  console.log(countries)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});



app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log(input)

  try {
    const result = await db.query(
      "SELECT code FROM countries WHERE LOWER(country_name) = $1;",
      [input.toLowerCase()]
    );

   

    const data = result.rows[0];
    const countryCode = data.code;

    console.log(countryCode)
    try {
      await db.query(
        "INSERT INTO visited_countries (code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.error("Country already Visited")
      console.error(err.stack)
      // console.log(err);
    }
  } catch (err) {
    // console.log(err);
    console.error("Country not found in DB")
  }
});



app.post("/user", async (req, res) => {

  if (req.body.add === 'new') {
    res.render("new.ejs")
  }
  else {
    currentUserId = req.body.user
    console.log(currentUserId)
    res.redirect("/")

  }
  


});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const fmName = req.body.name
  const choosenColor = req.body.color

  try {

    const result = await db.query("INSERT INTO user_family (name, color) VALUES ($1, $2) RETURNING *", [fmName, choosenColor])

    currentUserId = result.rows[0].id

    res.redirect("/")

  } catch {
    console.error("Error while adding new member")
  }


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





async function checkVisisted() {
  const result = await db.query(
    "SELECT code FROM visited_countries JOIN user_family ON visited_countries.user_id = user_family.id WHERE user_family.id = $1", 
    [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.code);
  });
  return countries;
}


async function getCurrentUser() {
  const response = await db.query(`SELECT * FROM user_family`)
  users = response.rows

  return users.find(user => user.id == currentUserId)
}