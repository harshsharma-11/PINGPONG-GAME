
const startButton = document.getElementById('start');
const ball = document.getElementById('ball');
const leftBox = document.getElementById('left-box');
const topRod = document.getElementById('top-rod');
const bottomRod = document.getElementById('bottom-rod');
const scoreboard = document.getElementById('score-digit');
const restart = document.getElementById('restart');
const bestscoreboard = document.getElementById('bestscore-digit');


/**************************INITIAL POSITION******************************* */
// Set initial position and direction of the ball
let ballPositionY = 20; // Starting position from the top
let ballPositionX = 800;
let ballDirectionX = 6; // Ball movement direction (6 for right, -6 for left)
let ballDirectionY = 6; // Ball movement direction (6 for down, -6 for up)







/**********************INITIAL SCORE******************** */
// Set initial scores
let score = 0;
let bestscore = parseInt(localStorage.getItem('bestscore')) || 0;
bestscoreboard.innerText = bestscore;







/******************************UPDATE BALL POSITION******************************************************** */
                  // Function to update the ball position and handle collisions
function updateBall() {
  // Update the ball position
  ballPositionY += ballDirectionY;
  ballPositionX += ballDirectionX;

  // Handle collision with top wall
  if (
    ballPositionY <= topRod.offsetTop + topRod.offsetHeight &&
    ballDirectionY === -6 &&
    (ball.offsetLeft + ball.offsetWidth < topRod.offsetLeft ||
      topRod.offsetLeft + topRod.offsetWidth < ball.offsetLeft)
  ) {
    ballPositionY -= topRod.offsetHeight;
    ballDirectionY = 0; // Change direction to down

    
    // Game over
    gameover();
  }

  // Handle collision with bottom wall
  if (
    ballPositionY + ball.offsetHeight >= bottomRod.offsetTop &&
    ballDirectionY === 6 &&
    (ball.offsetLeft + ball.offsetWidth < topRod.offsetLeft ||
      topRod.offsetLeft + topRod.offsetWidth < ball.offsetLeft)
  ) {
    ballPositionY += topRod.offsetHeight;
    ballDirectionY = 0; // Change direction to up

    
    // Game over
    gameover();
  }

  // Handle collision with left wall
  if (ball.offsetLeft <= 0) {
    ballDirectionX = 6;
  }

  // Handle collision with right wall
  if (ball.offsetLeft + ball.offsetWidth >= leftBox.offsetWidth) {
    ballDirectionX = -6;
  }

  // Check if the ball collides with the top rod
  if (
    ballPositionY <= topRod.offsetTop + topRod.offsetHeight &&
    ballDirectionY === -6
  ) {
    ballDirectionY = 6; // Change direction to down
    ballDirectionX = calculateDeflectionAngle(topRod); // Calculate the deflection angle
    score += 1;
    scoreboard.innerText = score;
  }

  // Check if the ball collides with the bottom rod
  if (
    ballPositionY + ball.offsetHeight >= bottomRod.offsetTop &&
    ballDirectionY === 6
  ) {
    ballDirectionY = -6; // Change direction to up
    ballDirectionX = calculateDeflectionAngle(bottomRod); // Calculate the deflection angle
    score += 1;
    scoreboard.innerText = score;
  }

  // Update the ball position on the screen
  ball.style.top = ballPositionY + 'px';
  ball.style.left = ballPositionX + 'px';

  // Repeat the update at the next animation frame
  requestAnimationFrame(updateBall);
}





/**********************START THE GAME********************** */
// Start the game when the start button is clicked
startButton.addEventListener('click', function() {
  // Change color of the start and restart buttons
  startButton.style.color = 'grey';
  restart.style.color = 'grey';

  // Start updating the ball position
  updateBall();
});





/**********************RESTART THE GAME***************************** */
// Restart the game when the restart button is clicked
restart.addEventListener('click', function() {
  restartGame();
});

function restartGame() {
  
   // Reload the page to restart the game
  window.location.reload();

  }








  /********************ROD MOVEMENTS***************** */
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight' && topRod.offsetLeft + topRod.offsetWidth < leftBox.offsetWidth - 8) {
    topRod.style.left = topRod.offsetLeft + 18 + 'px';
    bottomRod.style.left = bottomRod.offsetLeft + 18 + 'px';
  } else if (event.key === 'ArrowLeft' && topRod.offsetLeft > 6) {
    topRod.style.left = topRod.offsetLeft - 18 + 'px';
    bottomRod.style.left = bottomRod.offsetLeft - 18 + 'px';
  }
});





/***************GAMEOVER ******************* */
function gameover() {
  leftBox.innerText = `Game over\nSCORE IS ${score}`;

  //bestscore calculation
  bestscore = Math.max(score, bestscore);
  //bestscore storage
  localStorage.setItem('bestscore', bestscore);
  //bestscore display on bestscoreboard
  bestscoreboard.innerText = bestscore;
  leftBox.style.fontSize = '100px';
  leftBox.style.textAlign = 'center';
  leftBox.style.color = 'red';
  restart.style.color = 'black';
}





/***************************DEFLECTION OF BALL ************************* */
// Function to calculate the deflection angle
function calculateDeflectionAngle(rod) {
  const collisionPoint = ball.offsetLeft + ball.offsetWidth / 2;
  const rodCenter = rod.offsetLeft + rod.offsetWidth / 2;
  const maxAngle = 45; // Adjust the maximum deflection angle as needed
  const angle = (collisionPoint - rodCenter) / rod.offsetWidth / 2;
  return angle * maxAngle;
}
