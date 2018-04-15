/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

let Engine = (function(global) {
  // Predefine the variables used within this scope,
  // Canvas element created and 2D context obtained for that canvas
  // Set the canvas elements height/width and add it to the DOM.
  let doc = global.document,
      win = global.window,
      canvas = doc.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  // This function serves as the kickoff point for the game loop itself and handles properly calling the update and render methods.
  function main() {
    // Obtains time delta - Constant value for speed across all computers
    let now = Date.now(),
    dt = (now - lastTime) / 1000.0;

    // Call update/render functions, pass along the time delta to update function since it may be used for smooth animation.
    update(dt);
    render();

    // lastTime variable - To determine the time delta for the next time this function is called.
    lastTime = now;

    // Use the browser's requestAnimationFrame function to call this function again as soon as the browser is able to draw another frame.
    win.requestAnimationFrame(main);
  }

  // Initial setup
  function init() {
    lastTime = Date.now();
    main();
  }

  // Called by main (game loop) - Updates entity's data.
  function update(dt) {
    updateEntities(dt);
    checkCollisions();
  }

  // Collision detection by rectangle X and Y position comparison of player and enemy
  function checkCollisions() {
    allEnemies.forEach(function(enemy) {
      // Enemy rectangle boundary
      let enemyLeftX   = enemy.x;
      let enemyRightX  = enemy.x + enemy.width;
      let enemyTopY    = enemy.y + enemy.height;
      let enemyBottomY = enemyTopY + enemy.yOff;

      // Player rectangle boundary
      let playerLeftX   = player.x;
      let playerRightX  = player.x + player.width;
      let playerTopY    = player.y + player.height;
      let playerBottomY = playerTopY + player.yOff;

      let xCollision = false;

      // Enemy and player X boundary overlap check
      if ((enemyLeftX < playerLeftX) && (playerLeftX < enemyRightX)) {
        xCollision = 1;
      }
      else if ((enemyLeftX < playerRightX) && (playerRightX < enemyRightX)) {
        xCollision = 1;
      }

      // Enemy and player Y boundary overlap check (If X boundary did happen)
      if (xCollision) {
        if(((enemyTopY < playerTopY) && (playerTopY < enemyBottomY)) || ((enemyTopY < playerBottomY) && (playerBottomY < enemyBottomY))) {
          // Collision resets player position and reduces player life and/or calls 'Game Over' alert
          player.reset();
          let lives = parseInt(document.getElementById("livesDisplay").innerHTML);
          lives--;
          document.getElementById("livesDisplay").innerHTML = lives;
          if (lives === 0) {
            gameLost(level, score)
          }
        }
      }
    });
  }

  // Enemy and player data/properties update
  function updateEntities(dt) {
    if (gameState == states.running){
      allEnemies.forEach(function(enemy) {
        enemy.update(dt);
      });
      player.update();
    }
  }

  // Game drawn every loop of game engine
  function render() {
    // Array of relative URL of game row images
    let rowImages = [
      'images/water-block.png',  // Top row is water
      'images/stone-block.png',  // Row 1 of 3 of stone
      'images/stone-block.png',  // Row 2 of 3 of stone
      'images/stone-block.png',  // Row 3 of 3 of stone
      'images/grass-block.png',  // Row 1 of 2 of grass
      'images/grass-block.png'   // Row 2 of 2 of grass
    ],
    numRows = 6,
    numCols = 5,
    row, col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)

    // Creation of grid by looping through images in rowImages array
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        // Canvas' context element - 3 parameters: Image to draw, X coordinate and Y coordinate
        // Resources helpers - Caches images as reusing them
        if (col == 2 && row == 0) {
          ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, row * 83);
        }
        else {
          ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
      }
    }

    renderEntities();
  }

  // Render functions for enemy and placer entities within app.js
  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
  }

  // Images used in game loaded
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
  ]);
  Resources.onReady(init);

  // Canvas' context object to the global variable
  global.ctx = ctx;
})(this);
