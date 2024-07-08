const userInput = []
const paraWords = $("#para").text().split(" ")




console.log(paraWords)

$(document).ready(function() {

    $("#usertype").on("input", function() {
        var inputvalue = $(this).val()
        
        var len = inputvalue.length
        
        if (inputvalue.charAt(inputvalue.length - 1) === " ") {
            userInput.push(inputvalue.substring(0, inputvalue.length - 1))

            $(this).val("")


                    
            if (userInput[userInput.length - 1] === paraWords[userInput.length - 1]) {
                console.log("Output matched " + userInput)
            }



        } 





        









    })

})