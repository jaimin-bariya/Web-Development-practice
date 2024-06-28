

const MUSICLIST = ["./sounds/crash.mp3", "./sounds/kick-bass.mp3", "./sounds/snare.mp3", "./sounds/tom-1.mp3", "./sounds/tom-2.mp3", "./sounds/tom-3.mp3", "./sounds/tom-4.mp3"]

const LOSET = document.querySelectorAll("button").length


function playSound(num){
    const sound = new Audio(MUSICLIST[num])
    sound.play()
}



for (let i = 0; i < LOSET; i++){

    document.querySelectorAll("button")[i].addEventListener("click", function () {
        
        playSound(i)

        document.querySelectorAll("button")[i].style.color = "black"


    } )

}

