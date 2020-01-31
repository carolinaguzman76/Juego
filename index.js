// window.onload = () => game.init('myCanvas')

window.onload = () => {
    document.getElementById("myCanvas").style.display = "none"
    document.getElementById("btnStart").onclick = () => {
        document.getElementById("space").style.display = "none"
        document.getElementById("startGame").style.display = "none"
        document.getElementById("myCanvas").style.display = "block"
        game.init('myCanvas')
    }
}