//Font Library
//BMREA___.TTF
//Minecraft.ttf
//ModernDOS8x14.ttf
//PIXEAB__.TFF
//PIXEABG_.TTF
//Windows Regular.ttf

//Variable for Track class
let track = [];
let NUM_OF_TRACK = 3;
//Variable for dither
let partofCanvas 
let imgTiles = [];
//Process Machine learning
let faceapi;
let detections = [];
let Mode;
//canvas and camra
let capture;
let canvas;
//Variable for expressions
let exp;
let points;
let capturestore = [];
//Variable for comparing the width/height of standard exp to non standard
let _width;
let _height;
let delta;
let img2;
let disgustedDictionary;
let angryDictionary;
let fearDictionary;
let happyDictionary;
let neutralDictionary;
let surprisedDictionary;
let sadDictionary;
let emoDic;


function preload() {
  //sound
  // mysound = loadSound("sounds/music.mp3");
  //cursor
  mouseArrow = loadImage("images/mousearrow.png");
  //font
  myFont = loadFont("assets/ModernDOS8x14.ttf");
  //ditherstyle
  for (let i = 1; i <= 18; i++) {
    let filename = "ditherstyle/dither_2_" + i + ".png";
    imgTiles.push(loadImage(filename));
  }
  //camera
  capture = createCapture(VIDEO);
  capture.id("capture")
}

function setup() {
  // the data of the standard
  disgustedDictionary = createNumberDict({0:10.62,1:2.33,2:3.74,3:3.55,4:(461/448)})
  angryDictionary = createNumberDict({0:13.2,1:2.25,2:3.36,3:3.73,4:(468/375)})
  fearDictionary = createNumberDict({0:12.07,1:2,2:3.25,3:3.26,4:(482/437)})
  happyDictionary = createNumberDict({0:15.71,1:3.17,2:3.5,3:4.04,4:(475/403)})
  neutralDictionary = createNumberDict({0:10.09,1:2.5,2:3.08,3:3.51,4:(502/439)})
  surprisedDictionary = createNumberDict({0:6.33,1:1.7,2:2.84,3:2.59,4:(464/436)})
  sadDictionary = createNumberDict({0:10.08,1:2.02,2:3.08,3:3.09,4:(482/437)})
  emoDic = createNumberDict
  // mysound.loop()
  //canvas and camera
  canvas = createCanvas(1280,700);
  canvas.parent("myContainer");
  capture.hide();
  imgLeft = createImage(520, 480);
  imgRight = createImage(520, 480);

  noCursor();

  Mode = false;

  frameRate(15);
  //load facial expression detector
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptions: false,
    minConfidence: 0.5,
  };

  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    // console.log(error);
    return;
  }

  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  background(255)
  image(capture,width/2,0);
  rectBut();
  Title();
  image(capture, 0, 0);
    drawExpressions(detections);
    drawBoxes(detections);
    drawLandmarks(detections);
  ditherpunk()
  push()
  noStroke()
  fill(255)
  rectMode(CENTER)
  rect(width/2,height/2,100,height)
  rect(50,height/2,100,height)
  rect(width-50,height/2,100,height)
  pop()
  instruct(270,560,20);
  mouseCursorArrow();
}
function Title(){
  push()
  textAlign(LEFT)
  fill(0)
  noStroke()
  textFont(myFont)
  textSize(32)
  text("Mirror",120,560)
  pop()
}

function instruct(x,y,yspace){
  push()
  textAlign(LEFT)
  fill(0)
  noStroke()
  textFont(myFont)
  push()
  textSize(22)
  text("Instructions",x,y-yspace)
  pop()
  textSize(16)
  text("Click'Snapshot'to freeze the frame.",x,y)
  text("Click'Save Image'to save images.",x,y+yspace)
  text("Click'Replay'to play it again.",x,y+yspace*2)
  pop()
}

function rectBut(){
  push()
  stroke(0)
  rectMode(CENTER)
  rect(935,515,200,30,20)
  rect(935,550,200,30,20)
  rect(1100,535,100,60,20)
  textAlign(CENTER)
  textFont(myFont)
  textSize(20)
  text ("Snapshot",935,520)
  text ("Save Image",935,553)
  text ("Replay",1100,537)
  pop()
}

function mouseClicked(){
  if( mouseX>935 &&mouseX<1135&&mouseY>500&&mouseY<530){
    capture.pause()
  }
  if(mouseX>935 &&mouseX<1135&&mouseY>535&&mouseY<565){
     save(canvas, "Mirror.png");
     }
  if(mouseX>1100 &&mouseX<1150&&mouseY>505&&mouseY<565){
    capture.play()
  }
}

function drawBoxes(detections) {
  if (detections.length > 0) {
    for (f = 0; f < detections.length; f++) {
      let { _x, _y, _width, _height } = detections[0].alignedRect._box;
      push()
      stroke(44, 169, 255);
      strokeWeight(5);
      noFill();
      rect(_x, _y, _width, _height);
      pop()
      if(exp=="disgusted"){
      delta = (_width/_height)/ disgustedDictionary.get(4)
      emoDic=disgustedDictionary
      }
      if(exp=="happy"){
        delta = (_width/_height)/ happyDictionary.get(4)
        emoDic=happyDictionary
      }
      if(exp=="neutral"){
        delta = (_width/_height)/ neutralDictionary.get(4)
        emoDic=neutralDictionary
      }
      if(exp=="angry"){
        delta = (_width/_height)/ angryDictionary.get(4)
        emoDic=angryDictionary
      }
      if(exp=="surprised"){
        delta = (_width/_height)/ surprisedDictionary.get(4)
        emoDic=surprisedDictionary
      }
      if(exp=="sad"){
        delta = (_width/_height)/ sadDictionary.get(4)
        emoDic=sadDictionary
      }
      if(exp=="fearful"){
        delta = (_width/_height)/ fearDictionary.get(4)
        emoDic=fearDictionary
      }
    }
  }
}
function calculate(i, j,index) {
  let _x = [];
  let _y = [];
  for (let k = i; k < j; k++) {
    _x.push(points[k]._x);
  }
  for (let k = i; k < j; k++) {
    _y.push(points[k]._y);
  }
  let min_x = min(_x);
  let max_x = max(_x);
  let min_y = min(_y);
  let max_y = max(_y);

  generateImage(
    min_x,
    min_y,
    max_x - min_x,
    max_y - min_y,
    0,
    0,
    (abs((delta*emoDic.get(index))-(max_x - min_x)/(max_y - min_y))/10 +1)* abs(max_x - min_x), 
    abs(max_y - min_y), 
    (min_x+max_x)/2,
    (min_y+max_y)/2
  );
}

function generateImage( x1, y1, x2, y2, x3, y3, x4, y4,avgx,avgy) {
  img2 = createImage(int(x4), int(y4));
  img2.copy(capture, x1, y1, x2, y2, x3, x3, x4, y4);
  push()
  imageMode(CENTER)
  image(img2, avgx,avgy, x4, y4);
  pop()
}

function drawLandmarks(detections) {
  if (detections.length > 0) {
    for (f = 0; f < detections.length; f++) {
      points = detections[f].landmarks.positions;
      //eyebrow
      calculate(17, 27,0);
      //nose
      calculate(30, 36,1);
      //eyes
      calculate(36, 42,2);
      calculate(42, 48,2);
      // //Lip
      calculate(48, 60,3);
    }
  }
}

function drawExpressions(detections) {
if (detections.length > 0) {
    let {
      neutral,
      happy,
      angry,
      sad,
      disgusted,
      surpirsed,
      fearful,
    } = detections[0].expressions;
    exp = detections[0].expressions.asSortedArray()[0].expression
  }}

const IMG_WIDTH = 520;
const IMG_HEIGHT = 480;
let imgLeft, imgRight; // newly added; check setup().

function ditherpunk() {
  imgLeft.copy(canvas, 100, 0, IMG_WIDTH, IMG_HEIGHT, 0, 0, IMG_WIDTH, IMG_HEIGHT);
  imgRight.copy(canvas, 650, 0, IMG_WIDTH, IMG_HEIGHT, 0, 0, IMG_WIDTH, IMG_HEIGHT);

  let gridSize = 7;
  // left
  imgLeft.loadPixels();
  for (let y = 0; y < IMG_HEIGHT; y += gridSize) {
    for (let x = 0; x < IMG_WIDTH; x += gridSize) {
      let index = (x + y * IMG_WIDTH) * 4;

      let r = imgLeft.pixels[index + 0];
      let g = imgLeft.pixels[index + 1];
      let b = imgLeft.pixels[index + 2];

      let avg = (r + g + b) / 3;

      let imgIndex = floor(map(avg, 0, 255, 0, imgTiles.length - 1, true));
      image(imgTiles[imgIndex], 100+x, y);
    }
  }
  // right
  imgRight.loadPixels();
  for (let y = 0; y < 480; y += gridSize) {
    for (let x = 0; x < IMG_WIDTH; x += gridSize) {
      let index = (x + y * IMG_WIDTH) * 4;

      let r = imgRight.pixels[index + 0];
      let g = imgRight.pixels[index + 1];
      let b = imgRight.pixels[index + 2];

      let avg = (r + g + b) / 3;

      let imgIndex = floor(map(avg, 0, 255, 0, imgTiles.length - 1, true));
      image(imgTiles[imgIndex], 650 + x, y);
    }
  }
}

//mouseCursor
function mouseCursorArrow() {
  track.push(new Track(mouseX,mouseY));

  // update and display
  for (let i = 0; i < track.length; i++) {
    let t = track[i];
    t.display();

  }
  
  // limit
  while (track.length > NUM_OF_TRACK) {
    track.splice(0, 1); // remove the first "oldest" object.
  }
}

class Track{
constructor(x, y) {
    // properties
    this.x = mouseX;
    this.y = mouseY;}
  display(){
    image(mouseArrow,this.x, this.y, 18.95,30)
  }
  }
