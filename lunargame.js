let snowman;
let gravity = 0.05;
let state = "start";
let spacePressed = false;
let downArrowPressed = false;
let win = false;
let snowflakes = [];

function setup() {
  createCanvas(800, 500);
  snowman = new Snowman(width / 2, 100); // Position snowman at the center horizontally

  // Generate snowflakes
  for (let i = 0; i < 1000; i++) {
    // Increase the number of snowflakes
    const flake = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      diameter: Math.random() * 6 + 2,
      speed: Math.random() * 2 + 1,
    };
    snowflakes.push(flake);
  }
}

function draw() {
  background(0, 100, 200);

  // Draw snowflakes
  for (let flake of snowflakes) {
    noStroke();
    fill(255, 255, 255);
    ellipse(flake.x, flake.y, flake.diameter);

    // Move the flake down
    flake.y = flake.y + flake.speed;

    // If the flake reaches the bottom, reset it to the top
    if (flake.y > height) {
      flake.y = 0;
    }
  }

  //ground
  fill(255, 255, 255);
  stroke(0, 0, 0);
  rect(0, height - 20, width, 20);

  // Draw snowman (rocket)
  if (state === "game") {
    if (spacePressed) {
      snowman.applyThrust(0.3);
    } else if (downArrowPressed) {
      snowman.applyThrust(0.1);
    }
    snowman.update();
    snowman.show();
  } else if (state === "start") {
    startScreen();
  } else if (state === "result") {
    if (win) {
      resultScreen("You Landed Safely!");
    } else {
      resultScreen("You Crashed!");
    }
    text(
      "Press Space or Arrow Down to Start Again",
      width / 2,
      height / 2 + 50
    );
    if (win) {
      snowman.show(); // Draw snowman only if landed safely
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    spacePressed = true;
    if (state === "start" || state === "result") {
      restartGame();
      state = "game";
    }
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = true;
    if (state === "start" || state === "result") {
      restartGame();
      state = "game";
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    spacePressed = false;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = false;
  }
}

function Snowman(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0); // Initialize velocity vector
  this.acc = createVector(0, 0);

  this.applyThrust = function (force) {
    let thrust = createVector(0, -0.5);
    thrust.mult(force);
    this.acc.add(thrust);
  };

  this.update = function () {
    if (this.pos.y >= 420) {
      if (this.vel.y <= 2 && this.pos.y >= height - 421) {
        // Snowman landed safely
        win = true;
      }
      state = "result";
    }

    // Update snowman's position based on the gravity
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.y += gravity;
  };

  this.show = function () {
    noStroke();
    fill(255);
    ellipseMode(CENTER);
    // Bottom circle
    ellipse(this.pos.x, this.pos.y + 40, 80, 80);
    // Middle circle
    ellipse(this.pos.x, this.pos.y + 10, 60, 60);
    // Top circle
    ellipse(this.pos.x, this.pos.y - 20, 40, 40);

    // Eyes
    fill(0);
    ellipse(this.pos.x - 10, this.pos.y - 30, 10, 10);
    ellipse(this.pos.x + 10, this.pos.y - 30, 10, 10);

    // Mouth
    fill(255, 0, 0);
    rect(this.pos.x - 15, this.pos.y - 15, 30, 5);

    // Carrot nose
    fill(255, 165, 0);
    triangle(
      this.pos.x - 5,
      this.pos.y - 20,
      this.pos.x + 5,
      this.pos.y - 20,
      this.pos.x,
      this.pos.y - 10
    );
  };
}

function startScreen() {
  fill(255, 255, 255);
  textAlign(CENTER);
  textSize(32);
  text("Press Space or Arrow Down to Start", width / 2, height / 2);
}

function resultScreen(message) {
  fill(255, 255, 255);
  textAlign(CENTER);
  textSize(32);
  text(message, width / 2, height / 2);
}

function restartGame() {
  win = false;
  snowman.pos.y = 100;
  snowman.vel.y = 0; // Reset velocity to zero
  spacePressed = false;
  downArrowPressed = false;
}
