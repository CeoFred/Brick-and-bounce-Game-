import Game from "./game.js";

let canvas = document.getElementById("canvasBody");

let c = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


let game = new Game(GAME_WIDTH,GAME_HEIGHT);


let lastTime   = 0;
function gameLoop(timetamp){

    let deltaTime = timetamp - lastTime
    lastTime = timetamp;

    c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
   game.update(deltaTime);
   game.draw(c);
    requestAnimationFrame(gameLoop);

}
requestAnimationFrame(gameLoop);
