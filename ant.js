class Ant {
  constructor(goals, x, y, colour) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.size = 10;
    this.angle = 0;
    this.colour = colour;
    this.goals = goals;
    this.goingHome = false;

    this.scoreBoard = new Map();

    for (let i = 0; i < goals.length; i++) {
      this.scoreBoard.set(goals[i].name, 0);
      if (goals[i].name == "home") {
        this.home = goals[i];
      }
    }
  }

  set2dCoords(x, y) {
    this.x = x;
    this.y = y;
  }

  setColour(r, g, b) {
    this.colour = [r, g, b];
  }

  moveTowards(target) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    this.angle = atan2(dy, dx);
  }

  checkForGoals() {
    for (let i = 0; i < this.goals.length; i++) {
      const goal = this.goals[i];
      const distanceX = this.x - goal.x;
      const distanceY = this.y - goal.y;
      const distance = sqrt(distanceX * distanceX + distanceY * distanceY);
      const minDistance = this.size / 2 + goal.size / 2;
      if (distance < minDistance) {
        this.updateScore(goal.name, 0);
        if (goal.name.includes("target")) {
          this.goingHome = true;
          this.colour = [0, 255, 0];
          this.moveTowards(this.home);
        } else {
          this.colour = [255, 255, 255];
          this.goingHome = false;
        }
      } else {
        this.updateScore(goal.name, this.getScore(goal.name) + 1);
        if (goal.name == "home" && this.goingHome) {
          if (this.getScore(goal.name) >= (width + height) / 2) {
            this.goingHome = false;
            this.colour = [255, 0, 0];
            this.moveTowards({ x: -this.x, y: -this.y });
          }
        }
      }
    }
  }

  setAngle(angle) {
    this.angle = angle;
  }

  isGoingHome() {
    return this.goingHome;
  }

  sendOutInformation(ants) {
    for (let i = 0; i < ants.length; i++) {
      if (ants[i] != this) {
        if (this.inDistance(ants[i])) {
          this.goals.forEach((goal) => {
            const otherAntScore = ants[i].getScore(goal.name);
            const ourScore = this.getScore(goal.name);
            if (otherAntScore > ourScore) {
              if (ants[i].isGoingHome()) {
                if (goal.name == "home") {
                  ants[i].updateScore(goal.name, ourScore);
                  ants[i].moveTowards(this);
                }
              } else if (goal.name != "home") {
                ants[i].updateScore(goal.name, ourScore);
                ants[i].moveTowards(this);
              }
            }
          });
        }
      }
    }
  }

  inDistance(ant) {
    const distanceX = Math.abs(ant.x - this.x + this.size / 2);
    const distanceY = Math.abs(ant.y - this.y + this.size / 2);
    const manhattanDistance = distanceX + distanceY;

    return manhattanDistance <= 150;
  }

  getScore(name) {
    return this.scoreBoard.get(name);
  }

  updateScore(name, value) {
    this.scoreBoard.set(name, value);
  }

  moveObject(width, height) {
    const angle = this.angle;
    const dx = cos(angle) * this.speed;
    const dy = sin(angle) * this.speed;

    if (random() < 0.45) {
      this.x += dx;
      this.y += dy;
    } else {
      this.x += random(-0.5, 0.5) * this.speed;
      this.y += random(-0.5, 0.5) * this.speed;
    }

    if (this.x < -this.size / 2) {
      this.x = width + this.size / 2;
    }
    if (this.x > width + this.size / 2) {
      this.x = -this.size / 2;
    }
    if (this.y < -this.size / 2) {
      this.y = height + this.size / 2;
    }
    if (this.y > height + this.size / 2) {
      this.y = -this.size / 2;
    }

    this.checkForGoals();
  }

  control() {
    this.setColour(255, 0, 0);
    // Rotate the object based on key press
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    this.checkForGoals();
  }

  draw() {
    fill(this.colour[0], this.colour[1], this.colour[2]);

    // Draw the object as a rectangle
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }

  getHomeValue() {
    return this.home;
  }

  getTargetValue() {
    return this.target;
  }

  setHome(value) {
    this.home = value;
  }

  setGoal(value) {
    this.goal = value;
  }

  addToHome(value) {
    this.home += value;
  }

  addToTarget(value) {
    this.target += value;
  }
}
