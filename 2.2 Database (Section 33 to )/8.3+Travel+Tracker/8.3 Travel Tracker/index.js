import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import { name } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "jaimin16",
  database: "world",
})


const lableCon = {
  listCC: [],
  visitedCTable: "visited_countries",
  cCodeT: "country_code",
  countryNotFound: false,
  notFound: "Country not found, please enter valid country name",
  again: "You have already added that country",

}


async function startMap() {


  try {

    // start database
    await db.connect()
    console.log("Database is running...")


    

    // hadling get req 
    app.get("/", async (req, res) => {




      // add the visited countries to the list using function 
      await getVisitedCountries()

      console.log(lableCon.listCC)

      res.render("index.ejs", {countries : lableCon.listCC, total: lableCon.listCC.length, countryNotFound: lableCon.countryNotFound})

      lableCon.countryNotFound = false
      
      

    });
    


    // handling post req at "/add"
    app.post("/add", async (req, res) => {

      
      // fetching post data and convert it toTitleCase using user-defined function.
      // const nameCountry = await (req.body.country).toLowerCase()
      const nameCountry = await toTitleCase(req.body.country)
      console.log(nameCountry)


      try {

        let nameCountryCode = await db.query(`SELECT country_code FROM ${lableCon.cCodeT} WHERE country_name = $1`, [nameCountry])
        // let nameCountryCode = await db.query(`SELECT country_code FROM ${lableCon.cCodeT} WHERE LOWER(country_name) LIKE '%'|| $1 || '%';`, [nameCountry])
        nameCountryCode = nameCountryCode.rows[0].country_code;


        try {

          await addToVisitedCountries(nameCountryCode)

          // get all visited countries and add in the list 
          
          await getVisitedCountries()

          // res.render("index.ejs", {countries : lableCon.listCC, total: lableCon.listCC.length, countryNotFound: lableCon.countryNotFound})
          res.redirect("/")

        } catch (err) {
            console.error ("Already added")
            res.render("index.ejs", {
              countries : lableCon.listCC, 
              total: lableCon.listCC.length, 
              countryNotFound: lableCon.countryNotFound, 
              error: lableCon.again
            })
        }

        

        

      } catch (err) {
        console.error( "Country Not found ")
        lableCon.countryNotFound = true
        res.render("index.ejs", {countries : lableCon.listCC, total: lableCon.listCC.length, countryNotFound: lableCon.countryNotFound, error: lableCon.notFound})
        lableCon.countryNotFound = false

      }

      

      

      



    
    })


    // server listening...
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });






  }

  catch (err) {
    console.error("Got error :" + err.stack)
  }

}






startMap()




async function toTitleCase(Strname) {

  return Strname.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join(" ")
}



async function addToVisitedCountries(cCodeName) {
  

  try  {
    const query = "INSERT INTO visited_countries (country_code) VALUES ($1) RETURNING *";
    const values = [cCodeName]
    const result = await db.query(query, values)

  }
  catch (err){
    throw err;
  }

}


async function getVisitedCountries(){

    lableCon.listCC = []
    // getVisitedCountries()
    const result = await db.query( `SELECT country_code FROM ${lableCon.visitedCTable}`);
    console.log(result.rows[0])
  
    result.rows.forEach(row => {
      lableCon.listCC.push(row.country_code)
    })


}