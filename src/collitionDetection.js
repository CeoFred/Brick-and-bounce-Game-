export function detectCollision(ball,gameObject){
 
     let bottomOfBall = ball.position.y + ball.size;
     let topOfBall = ball.position.y;

     
     let topOfObject = gameObject.position.y;
     let leftSideOfObject = gameObject.position.x;

     let bottomOfObject = gameObject.position.y + gameObject.height;     
     let rightSideOfObject = gameObject.position.x + gameObject.width;
     
         // console.log('bottom of ball',bottomOfBall);
         // console.log('top of paddle',topOfPaddle);
     if(bottomOfBall >= topOfObject && 
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideOfObject &&
        ball.position.x + ball.size <= rightSideOfObject
        ){
            return true;
     }else{
         return false;
     }
}