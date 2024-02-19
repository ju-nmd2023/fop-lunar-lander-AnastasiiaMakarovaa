let snowflakes = [];

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

function draw() {
  background(0, 100, 200);

  // Draw snowflakes
  for (let flake of snowflakes) {
    noStroke();
    fill(255);
    ellipse(flake.x, flake.y, flake.diameter);

    // Move the flake down
    flake.y = flake.y + flake.speed;

    // If the flake reaches the bottom, reset it to the top
    if (flake.y > height) {
      flake.y = 0;
    }
  }
}
