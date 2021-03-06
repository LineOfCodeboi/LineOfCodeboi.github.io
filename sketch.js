var s;
var scl = 20;
var high = 1;
var higher = false;
var gemeld = false;
var direction;

function setup() {
  createCanvas(600, 600);
  s = new Snake()
  frameRate(10)

  pickLocation()
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  food = createVector(floor(random(cols)), floor(random(rows)))
  food.mult(scl)
}

function highscore() {
  if((s.total + 1) > high){
    high = (s.total + 1)
    higher = true;
    updateScore()
  }
}

function draw() {
  background(51);

  if(s.eat(food)) {
    pickLocation()
  }

  s.death()
  s.update()
  s.show()

  highscore()
  updateScore()

  if(s.dead) {
    updateScore()
    s.dead = false;
  }

  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl)
}

function updateScore() {
  if(higher && !gemeld) {
    document.getElementById("score").innerText = "Score: " + (s.total + 1) + " | Highscore: " + high + " || NIEUWE HIGHSCORE";
    gemeld = true;
  } else {
    document.getElementById("score").innerText = "Score: " + (s.total + 1) + " | Highscore: " + high;
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW && direction != 'down') {
    s.dir(0, -1)
    direction = 'up';
  } else if(keyCode === DOWN_ARROW && direction != 'up') {
    s.dir(0, 1)
    direction = 'down';
  } else if(keyCode === RIGHT_ARROW && direction != 'left') {
    s.dir(1, 0)
    direction = 'right';
  } else if(keyCode === LEFT_ARROW && direction != 'right') {
    s.dir(-1, 0)
    direction = 'left';
  }
}
