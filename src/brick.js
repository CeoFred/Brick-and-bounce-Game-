import {detectCollision} from './collitionDetection.js'

export default class Brick {
    constructor(game,position){
        this.image = document.getElementById('img-brick');
        this.width = 80;
        this.height = 24;
        this.position = position
        this.game = game;

        this.markedForDeletion = false;
    }
    update(){
        if(detectCollision(this.game.ball,this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;

            this.markedForDeletion = true;
        }
    }
    
    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}