import Paddle from "./Paddle.js";
import inputHandler from "./input.js";
import Ball from './ball.js ';
import Brick from './brick.js';

import {buildLevel,level1,level2} from './level.js';

const GAME_STATE = {
    PAUSED:0,
    RUNNNG:1,
    MENU:2,
    GAMEOVER:3,
    NEWLEVEL:4
}

export default class Game{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.gameState = GAME_STATE.MENU
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 3;
        this.bricks = []
        new inputHandler(this.paddle,this);
        this.levels = [level1,level2];
        this.currentLevel = 0;
        
    }
    start(){

        this.bricks = buildLevel(this,this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects  = [ this.ball,this.paddle];
                this.gameState = GAME_STATE.RUNNNG;
    }

    togglePause(){
        if(this.gameState == GAME_STATE.PAUSED){
            this.gameState = GAME_STATE.RUNNNG;
        }else{
            this.gameState = GAME_STATE.PAUSED;

        }
    }
    update(deltaTime){

        if(this.lives == 0 ){
            this.gameState = GAME_STATE.GAMEOVER
        }

        if(this.gameState === GAME_STATE.PAUSED ||

             this.gameState === GAME_STATE.MENU  ||
             this.gameState === GAME_STATE.GAMEOVER) return;

             if(this.bricks.length === 0){
                this.currentLevel++;
                this.gameState = GAME_STATE.NEWLEVEL;
                this.start();
             }

             
        [...this.gameObjects,...this.bricks].forEach(object => {
            object.update(deltaTime);
        });

        this.bricks = this.bricks.filter(brick => 
            !brick.markedForDeletion);
    }
    draw(ctx){
        [...this.gameObjects,...this.bricks].forEach(object => {
            object.draw(ctx);
        });
        
        ctx.font = "30px Hack";
        ctx.fillStyle = "black";

        ctx.textAlign = "center";
        ctx.fillText(`Lives: ${this.lives}`,this.gameWidth/2,this.gameHeight/2)
        if(this.gameState === GAME_STATE.PAUSED){

            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Hack";
            ctx.fillStyle = "White";

            ctx.textAlign = "center";
            ctx.fillText("Paused",this.gameWidth/2,this.gameHeight/2)
        }

        if(this.gameState === GAME_STATE.MENU){

            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Hack";
            ctx.fillStyle = "White";

            ctx.textAlign = "center";
            ctx.fillText("Press P To Start",this.gameWidth/2,this.gameHeight/2)
        }

        if(this.currentLevel > 1){

            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Hack";
            ctx.fillStyle = "White";

            ctx.textAlign = "center";
            ctx.fillText("Game Won!",this.gameWidth/2,this.gameHeight/2)
                

        }

        if(this.gameState === GAME_STATE.GAMEOVER){

            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Hack";
            ctx.fillStyle = "White";

            ctx.textAlign = "center";
            ctx.fillText("Game Over",this.gameWidth/2,this.gameHeight/2)
        }
        }

}