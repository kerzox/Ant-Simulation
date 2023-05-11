let ant1, ant2;

let ants = [];
let antCount = 1000;

let antsPlusPlayer = [];

let goals = [];
let goalCount = 1;

let width = 1200;
let height = 900;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width - 25, height - 25);

  for (let i = 0; i < goalCount; i++) {
    goals.push(
      (goal = {
        x: random(50, width / 2),
        y: random(50, height / 2),
        health: 5000,
        size: 80,
        colour: [255, 0, 0],
        name: "target:" + (i + 1),
      })
    );
  }

  goals.push(
    (goal = {
      x: random(width / 2, width - 50),
      y: random(height / 2, height - 50),
      size: 80,
      colour: [0, 0, 255],
      name: "home",
    })
  );

  for (let i = 0; i < antCount; i++) {
    ants.push(
      new Ant(
        goals,
        random(0, width - 50),
        random(0, height - 50),
        [255, 255, 255]
      )
    );
  }

  antsPlusPlayer = [...ants];
}

function drawGoals(obj) {
  fill(obj.colour[0], obj.colour[1], obj.colour[2]);
  ellipse(obj.x, obj.y, obj.size, obj.size);
}

function draw() {
  background(200);

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].name != "home") {
      if (goals[i].health <= 0) {
        continue;
      }
    }

    drawGoals(goals[i]);
  }

  //   ant1.draw();
  //   ant1.control();
  //   ant1.sendOutInformation(antsPlusPlayer);

  for (let i = 0; i < ants.length; i++) {
    ants[i].draw();
    ants[i].moveObject(width, height);
    ants[i].sendOutInformation(antsPlusPlayer);
  }
}

function mouseClicked() {
  // Code to execute when the mouse is clicked
  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];
    let distance = dist(mouseX, mouseY, goal.x, goal.y);

    // Check if the mouse click is inside the ellipse
    if (distance <= 80) {
      console.log(`${goal.name}'s Health: ${goal.health}`);
    }
  }
}
