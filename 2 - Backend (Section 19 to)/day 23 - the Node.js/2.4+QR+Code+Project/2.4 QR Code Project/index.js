import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer

    .prompt([
    {
        message: "Type in your URL",
        name: "URL",
    },
    ])

    .then ((answer) => {
        console.log(answer)
        const user_url = answer.URL

        var qr_img = qr.image(user_url)
        qr_img.pipe(fs.createWriteStream("myqr.png"))
    })


    


/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
