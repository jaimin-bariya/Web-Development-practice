

const MUSICLIST = ["./sounds/crash.mp3", "./sounds/kick-bass.mp3", "./sounds/snare.mp3", "./sounds/tom-1.mp3", "./sounds/tom-2.mp3", "./sounds/tom-3.mp3", "./sounds/tom-4.mp3"]

const LOSET = document.querySelectorAll("button").length






for (let i = 0; i < LOSET; i++){

    document.querySelectorAll("button")[i].addEventListener("click", function () {
        
        const sound = new Audio(MUSICLIST[i])
        sound.play()
        

        document.querySelectorAll("button")[i].style.color = "black"


    } )

}

