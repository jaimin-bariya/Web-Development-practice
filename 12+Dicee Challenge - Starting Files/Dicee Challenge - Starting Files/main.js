

function generateN(){
    return Math.floor(Math.random() * (6 - 1 + 1) + 1)
}

const number1 = generateN()
const number2 = generateN()




// document.querySelector(".img1").setAttribute("src", "images/dice"+String(generateN())+".png")
document.querySelector(".img1").setAttribute("src", "images/dice"+number1+".png")
document.querySelector(".img2").setAttribute("src", "images/dice"+number2+".png")

var winner = document.querySelector("h1")

if (number1 > number2) {
    winner.innerHTML = "Player 1 Win 🏆"
}
else if (number1 < number2) {
    winner.innerHTML = " 🏆Player 2 Win"
}
else{
    winner.innerHTML = "🏆 Draw 🏆"
}