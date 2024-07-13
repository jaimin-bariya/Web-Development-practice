


const fs = require("fs");

fs.writeFile('mess.txt', "My name is JP and Shisya  and and ja ja and ", (err) => {
    if (err) throw err;
    console.log("saved file");
});




fs.readFile("./mess.txt", (err, data) => {
    if (err) throw err;
    let d = data
    console.log(d)
})


