// Variables
let lives = 5;
let level = 1;
let score = 0;
let states = {
  paused: 0,
  running: 1,
};
let gameState = states.paused;

/*----------------------------------------------------------------------------*/

// Game button functions
function pauseGame() {
  gameState = states.paused;
  document.getElementById("startButton").disabled = false;
  document.getElementById("pauseButton").disabled = true;
  document.getElementById("gamePaused").innerHTML = "Game Mode: Paused";
}

function startGame() {
  gameState = states.running;
  document.getElementById("startButton").disabled = true;
  document.getElementById("pauseButton").disabled = false;
  let msg = "Game Mode: In Play";
  msg += "<span style='font-size:x-small;'>";

  document.getElementById("gamePaused").innerHTML = msg;
  document.getElementById("gameReset").innerHTML = "";
}

// Reset game function
function resetGame() {
  player.reset();
  score = 0;
  document.getElementById("scoreDisplay").innerHTML = 0;
  level = 1;
  document.getElementById("levelDisplay").innerHTML = 1;
  lives = 5;
  document.getElementById("livesDisplay").innerHTML = 5;
  document.getElementById("gameReset").innerHTML = "Game Reset";
  pauseGame();
}

// Enemies Function - Enemies our player must avoid
let Enemy = function() {
  // Image/sprite for enemies - Uses helper to load images
  this.sprite = 'images/enemy-bug.png';

  // Enemy possible row location
  this.rows = [225, 140, 55];

  // Enemy start X position
  this.startX = -1;
  this.x = this.startX;

  // Y position - Random
  this.y = this.randomY();

  // Enemy speed
  this.dx = this.randomDx();

  // Right boundary
  this.boundaryXRight = 545;

  // Boundary rectangle - Used to check collision
  this.width = 100;
  this.height = 50;
  this.yOff = 90;
};

// Randomised row for enemy
Enemy.prototype.randomY = function(){
  let newY = Math.floor(Math.random() * 3);
  return this.rows[newY];
};

// Enemy speed function
Enemy.prototype.randomDx = function(){
  let dx = Math.floor(Math.random() * ((10*level) - level)) + level;
  return dx + 50;
};

// Enemy X Boundary
Enemy.prototype.randomXBoundary = function() {
  let xLimit = Math.floor(Math.random() * (350 - 1)) + 1;
  return 500 + xLimit;
};

// Enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  for	(let index = 0; index < allEnemies.length; index++) {
    let enemy = allEnemies[index];

    if((enemy.x) > (enemy.boundaryXRight)) {  //Boundary crossed
      enemy.x = enemy.startX;
      enemy.y = enemy.randomY();
      enemy.dx = enemy.randomDx();
      enemy.boundaryXRight  = enemy.randomXBoundary();
    }
    else {  //Boundary not crossed
      enemy.x = enemy.x + (enemy.dx) * dt; //Ensures game runs at the same speed for all computers
    }
  }
};

// Enemy on screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
let Player = function() {
  this.sprite = 'images/char-boy.png';

  // Start position
  this.startX = 202;
  this.StartY = 375;

  // Actual position
  this.x = this.startX;
  this.y = this.StartY;
  this.tempX = 9999;
  this.tempY = 9999;

  // Boundary - Keeps player on screen
  this.boundaryXLeft = -1;
  this.boundaryXRight = 404;
  this.boundaryYTop = 35;
  this.boundaryYBottom = 375;

  // Player offset after move - Centers player on grid cell
  this.dx = 101;
  this.dy = 85;

  // Boundary rectangle - Used to check collision
  this.width = 100;
  this.height = 90;
  this.yOff = 90;
};

// Update method
Player.prototype.update = function() {

  if((this.tempX >= this.boundaryXLeft) && (this.tempX <= this.boundaryXRight)) {  // X Position
    this.x = this.tempX;
  }

  if ((this.tempY >= this.boundaryYTop) && (this.tempY <= this.boundaryYBottom)) {  // Y Position
    this.y = this.tempY;
  }

  if ((this.tempY < this.boundaryYTop) && (this.tempX > 162 && this.tempX < 243) && (this.tempY != this.y)) {  // Stone block in top row reached
    this.reset();
    if (level === 10) {
      score += 100;
      document.getElementById("scoreDisplay").innerHTML = score;
      gameWon(score)
    }
    else {
      score += 100;
      document.getElementById("scoreDisplay").innerHTML = score;
      level++;
      document.getElementById("levelDisplay").innerHTML = level;
    }
  }
  else if ((this.tempY < this.boundaryYTop) && !(this.tempX > 162 && this.tempX < 243) && (this.tempY != this.y)) {  // Water block in top row reached
    this.reset();
    lives = document.getElementById("livesDisplay").innerHTML;
    lives--;
    document.getElementById("livesDisplay").innerHTML = lives;
    if (lives === 0) {
      gameLost(level, score)
    }
  }
};

// Reset player position method
Player.prototype.reset = function() {
  this.x = this.startX;
  this.y = this.StartY;
  this.tempX = this.startX;
  this.tempY = this.StartY;
};

// Render method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle Input method
Player.prototype.handleInput = function(direction) {

  this.tempX = this.x;
  this.tempY = this.y;

  switch(direction) {
    case "left":
    this.tempX = this.tempX - this.dx;
    break;
    case "right":
    this.tempX = this.tempX + this.dx;
    break;
    case "up":
    this.tempY = this.tempY - this.dy;
    break;
    case "down":
    this.tempY = this.tempY + this.dy;
    break;
  }
};

// Objects instantiation
// All enemy objects in an array called allEnemies
// Player object in a variable called player
allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

let player = new Player();

// Key presses to Player.handleInput() method
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// Alert for lost game
function gameLost(level, score) {
  swal({
    closeOnEsc: false,
    closeOnClickOutside: false,
    title: 'Game Over!',
    text: 'You reached level ' + level + ' with a final score of ' + score + '!',
    icon: 'error',
    buttons: {
      playAgain: {
        text: 'Restart'
      }
    }
  }).then(function (isConfirm) {
    if (isConfirm) {
      pauseGame();
      resetGame();
    }
  })
}

// Alert for won game
function gameWon(score) {
  swal({
    closeOnEsc: false,
    closeOnClickOutside: false,
    title: 'Congratulations! You Won!',
    text: 'You completed all levels with a score of ' + score + '!',
    icon: 'success',
    buttons: {
      playAgain: {
        text: 'Restart'
      }
    }
  }).then(function (isConfirm) {
    if (isConfirm) {
      resetGame();
    }
  })
}

// Game button listeners
$(document).ready(function(){
  $("#startButton").click(function(){
    startGame();
  });
  $("#pauseButton").click(function(){
    pauseGame();
  });
  $("#resetButton").click(function(){
    resetGame();
  });
});
