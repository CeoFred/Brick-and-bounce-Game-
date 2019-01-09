import { detectCollision } from './collitionDetection.js'

export default class Ball {
    constructor(game) {
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;
        this.image = document.getElementById('img-ball');
        
        this.size = 26
        
        this.game = game;
        this.reset();
    }

    reset(){
        this.speed = {
            x: -2,
            y: 3
        }
        this.position = {
            x: 10,
            y: 200
        }
    }
    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    update(dx) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //wall collition 
        if(this.position.x + this.size  > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x
        }

        //wall collition top
        if(this.position.y < 0){
            this.speed.y = -this.speed.y
        }

        //bottom of game
        if(this.position.y + this.size > this.gameHeight){
            this.game.lives--;
            this.reset()
        }
        if(detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
       
    }
}