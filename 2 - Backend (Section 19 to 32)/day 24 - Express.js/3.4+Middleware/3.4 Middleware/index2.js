import express from "express";
import morgan from "morgan";



const app = express();
const port = 3000;


// New Custom Middlewaren Function 
function JPF(req, res, next){
  console.log("NEw Middleware is working")
  console.log(req.method)
  next()
}

app.use(JPF);

app.get("/", (req, res) => {

  res.send("Hello");
  console.log("Done process")
  
});

// send statuscode with response
app.get("/about", (req, res) => {
  res.sendStatus(404)
})

// neccecery to listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

