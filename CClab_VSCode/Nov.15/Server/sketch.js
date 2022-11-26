let d;
let di = 6;
let sym = 360 / di;
let freq;
let angle;
let angleVel;
let radDist;
let c;
let r;
let q;
function setup() {
    let canvas = createCanvas(450, 450);
  canvas.parent("myContainer");
  angleMode(DEGREES);
  angle = 0;
  angleVel = 0.2;
  radDist = 100;
  frameRate(30);
  r = random(255);
  frameRate(30);
}

function draw() {
  translate(width / 2, height / 2);
  x = cos(angle) * radDist;// I learn this from Professor Moon's sketch
  y = sin(angle) * radDist;
  d = map(x, 0, width, 0, 600);
  if (freq < 350) {
    c = color(random(255)*0.5, random(255), random(255), r);
    stroke(c);
    background(random(255), r , random(255), 2);
  }
  freq = frameCount;
  strokeWeight(map(sin(freq), -6, 6, 0, 15));
  for (i = 1; i < 360; i += sym) {
    push();
    noFill();
    rotate(i);
    angle = angle + angleVel;
    branch(60);
    ell();
    pop();
}}

function branch(br) {
  ellipse(0, 0, 0, br);
  translate(0, br);
  if (br > 12) {
    rotate(d);
    branch(br*0.7)
  }
}// I learn this from 'Computational Mama' :https://www.youtube.com/watch?v=2gaYq1-XZPE

function ell(num) {
  for (let j = 0; j < sym; j++) {
    rotate(sym);
    noFill();
    stroke(0, 0, 0, 2);
    rect(x * 2.5, y * 2.5, x * 0.5, y * 0.5);

    push();
    scale(-1, 1);
    pop();
  }
}
