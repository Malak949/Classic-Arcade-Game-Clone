class Enemy {

    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed=200;
        this.velocity = 200 + (Math.random() * 100); // velcity will be between 100 and 200
        //this.velocity = 0;
    }
    update(dt) {
        this.x += this.velocity * dt;
        if (this.x > ctx.canvas.width + 50) {
            this.x = -100;
        }
        if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {

            player.x = 200;
            player.y = 400;

            lives--;
            live.innerText = lives;

            if (lives === 0) {

                //Will replace with modal
                confirm(`Sorry, you don't have more lives! Do you want to play again?`);
                lives = 3;
                scoreOfGame = 0;
                live.innerText = lives;
                score.innerText = '';

            }
        }   
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // // temp only : to help with collision detection
        // ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, 50, 0, 2*Math.PI);
        
        // ctx.fill();
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// scoreofGame
let scoreOfGame = 0,
    lives = 3,
    live = document.querySelector('.lives > span'),
    score = document.querySelector('.score > span');

class Player {
    constructor(x,y) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
        
    }
    update(dt) {
        if(this.y <0){
            this.x=200;
            this.y=300;
            scoreOfGame++;
        }
        /* 1 points will be added to their game score Once player reaches the water */
        score.innerText = scoreOfGame;
        if (lives > 0 && scoreOfGame === 5) {
            confirm('Congratulations!You successfully crossed the road!!');
            lives = 3;
            scoreOfGame = 0;
            live.innerText = lives;
            score.innerText = '';
        }

    }
    
  
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // // temp only : to help with collision detection
        // ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, 50, 0, 2*Math.PI);
        
        // ctx.fill();
    }

    handleInput(direction) {                  
        switch(direction) {
            case "right":
                if(this.x<400) {this.x += 101;}
                break;
            case "left":
                if(this.x> 0) {this.x -= 101;}
                break;
            case "up":
                if (this.y> 0) {this.y -= 83;}    
                break;
            case "down":
                if(this.y<380) { this.y += 83;}
                break;
            default:
                break;
        }
        
    };
 
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(100,50);
let enemy2 = new Enemy(100,138);
let enemy3 = new Enemy(100,221);
let allEnemies = [enemy1,enemy2,enemy3];
let player = new Player(200,300);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
// check collision 
function checkCollisions() {
    allEnemies.forEach(enemy => {
        let distance= getDistance(enemy , player);
        if (distance < 50){
            // check collision 
            player.x=200;
            player.y=300;
 
        }
    })
 }
 function getDistance(object1,object2){
     let a= object1.x - object2.x;
     let b= object1.y - object2.y;
     return Math.sqrt(a*a + b*b);
 }
 