//Font Library
//BMREA___.TTF
//Minecraft.ttf
//ModernDOS8x14.ttf
//PIXEAB__.TFF
//PIXEABG_.TTF
//Windows Regular.ttf

//Variable for cult elements
let bugs = [];
let NUM_OF_BUGS = 30;
//Variable for Track class
let track=[]
let NUM_OF_TRACK = 3
//Variable for typeface
let cWidth 
let disWidth
let index;
let lastMillis = 0;
//Variable for dither
let imgTiles = [];
//Process Machine learning
let faceapi;
let detections = [];
let Mode
//canvas and camra
let capture;
let canvas;
//Variable for expression
let exp
//Variable to run the facial expression or not
let recog
//Variable to control AF speaking
let p

function preload() {
  //sound
  mysound=loadSound('sounds/music.mp3')
  //cursor
  mouseArrow =loadImage("images/mousearrow.png")
  //background image
  AF2_1 = loadImage("images/AF2_1.png")
  AF2_2 = loadImage("images/AF2_2.png")
  //font
  myFont=loadFont('assets/ModernDOS8x14.ttf')
  cultFont= loadFont('assets/BMREA___.TTF')
  //ditherstyle
  for (let i = 1; i <= 18; i++) {
    let filename = "ditherstyle/dither_2_" + i + ".png";
    imgTiles.push(loadImage(filename));
  }
  //camera
  capture = createCapture(VIDEO);
  capture.id("capture");
}

function setup() {
  mysound.loop()
  //Make expression only run once
  recog=0
  //canvas and camera
  canvas = createCanvas(AF2_1.width*0.5, AF2_1.height*0.4);
  canvas.parent("myContainer");
  capture.hide()
  
  noCursor();
  
  Mode= false
  
  frameRate(15);
  //load facial expression detector
  const faceOptions = {
    withLandmarks: false,
    withExpressions: Mode,
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
    console.log(error);
    return;
  }

  detections = result;
  faceapi.detect(gotFaces);
  
}

function draw() {
  clear()
  push()
  scale(0.4)
  image(AF2_1,-200,0);
  image(AF2_2,AF2_1.width-1800, 0);
  pop()
  // image(capture, 505, 185, 400, 400*capture.height/capture.width,0, 0, capture.width, capture.height);
  ditherpunk();
  rectBut();
  instruct(500,35,20);
  Title()
  if(recog==1){drawExpressions(detections,width/2,height/2,0)
    index = 0;
    p = random([0,1])
    recog++
  }
  if (exp=="sad"){
       sad()
  }
  if (exp=="happy"){
       happy()
  }
  if (exp=="neutral"){
       neutral()
  }
  if (exp=="angry"){
       angry()
  }
  if (exp=="surprised"){
       surprised()
  }
  if (exp=="fearful"){
       fearful()
  }
  if (exp=="disgusted"){
       disgusted()
  }
  mouseCursorArrow();
}

function Title(){
  push()
  textAlign(LEFT)
  fill(0)
  noStroke()
  textFont(myFont)
  textSize(32)
  text("Artificial Friend",100,70)
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
  text("Click'How do you feel'to communicate with Jane.",x,y)
  text("Click'Save Image'to save images.",x,y+yspace)
  text("Click'Replay'to play it again.",x,y+yspace*2)
  pop()
}

function rectBut(){
  push()
  stroke(0)
  rectMode(CENTER)
  rect(735,515,200,30,20)
  rect(735,550,200,30,20)
  rect(900,535,100,60,20)
  textAlign(CENTER)
  textFont(myFont)
  textSize(20)
  text ("How do you feel?",735,520)
  text ("Save Image",735,553)
  text ("Replay",900,537)
  pop()
}

function mouseClicked(){
  if(recog==0&& mouseX>635 &&mouseX<835&&mouseY>500&&mouseY<530){
    capture.pause()
    recog=1
    Mode=!Mode
  }
  if(mouseX>635 &&mouseX<835&&mouseY>535&&mouseY<565){
     save(canvas, "Emotion.png");
     }
  if(recog==2&& mouseX>850 &&mouseX<950&&mouseY>505&&mouseY<565){
    capture.play()
    recog=0
  }
}

function drawExpressions(detections, x, y, yspace) {
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
  }
}

//realize the ditherpunk filter
function ditherpunk() {
  capture.loadPixels();
  
  let gridSize = 7;
  for (let y = 0; y < capture.height; y += gridSize) {
    for (let x = 0; x < capture.width; x += gridSize) {
      
      let index = (x + y * capture.width) * 4;

      let r = capture.pixels[index + 0];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let avg = (r + g + b) / 3;

      let imgIndex = floor(map(avg, 0, 255, 0, imgTiles.length - 1, true));
      push()
      imageMode(CENTER)
      scale(384/capture.width)
      // tint(100, 130, 240)
      image(imgTiles[imgIndex], x+900, y+340);
      pop()
    }
  }
}

//Jane's reaction
//sad
function sad(){
  let contentbox = ['Hey, I’m Jane.\nI guess you are sad now.\n \nDon’t be sad.\nTrust me.\nGood things will happen tomorrow.\n \nDo you want me to tell you a joke?','Hey, I’m Jane.\nI guess you are sad now.\n \nDon’t be sad.\nTrust me.\nGood things will happen tomorrow.\n \nDo you want me to tell you a joke?\n Oh REALLY?\n (Gasping)\n You are SAd??']
  let content = contentbox[p]
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME}
		lastMillis = millis();
	}
  if(index >135 && content == "Hey, I’m Jane.\nI guess you are sad now.\n \nDon’t be sad.\nTrust me.\nGood things will happen tomorrow.\n \nDo you want me to tell you a joke?\n Oh REALLY?\n (Gasping)\n You are SAd??"){
    Jitterbugs()
  }
}
//happy()
function happy(){
  let contentbox = ["Hey, I’m Jane.\nI guess you are happy now.\n \nHurray!\nI know you could overcome those difficulties.\n \nDo you want a cup of coffee?\n☕️", "Hey, I’m Jane.\nI guess you are happy now.\n \nHurray!\nI know you could overcome those difficulties.\n \nWhat is happiness anyway?\n"]
  let content = contentbox[p]
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
  if(index >135 && content == "Hey, I’m Jane.\nI guess you are happy now.\n \nHurray!\nI know you could overcome those difficulties.\n \nDo you want a cup of coffee?\n"){
    Jitterbugs()
  }
}
//Surprised
function surprised(){
  let content = "Hey, I’m Jane.\nI guess you are surprised now.\n \nWhy do you stared like this?\nWhat astonished you?\n \nPlease Tell me more.\n"
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
}
//Angry
function angry(){
  let contentbox = ["Hey, I’m Jane.\nI guess you are angry now.\n \nShit, there must be something bad happened.\n(Don’t smash me.) I’m on your side. \n \nNeed a place to calm down?\n", "Hey, I’m Jane.\nI guess you are angry now.\n \nShit, there must be something bad happened.\n(Don’t smash me.) I’m on your side. \n \nNeed a place to calm down?\n You could release your anger\n Giggles\n You could smash something if you like."]
  let content = contentbox[p]
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
}
//disgusted
function disgusted(){
  let content = "Hey, I’m Jane.\nI guess you are disgusted now.\n \nWell, hope I’m not the people disgusted you.\nIs there anything you don’t want to eat? \n \nSend me an image maybe?\n"
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
}
//neutral
function neutral(){
  let content = "Hey, I’m Jane.\nI guess you are neutral now.\n \nDon’t be that serious.\nThere must be lots of good things have happened to you.\n \nWhy don’t we dance?\n"
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
}
//fear
function fearful(){
  let content = "Hey, I’m Jane.\nI guess you are scared now.\nWhat's wrong?\n \nWould you like to go somewhere quiet and talk?\n \nI will be right there with you.\n You are not alone.\n"
  textFont(myFont)
  textAlign(CENTER)
  textSize(20)
  text(content.substring(0, index),65,240,390,390)
  stroke(0,random([0,255]))
	if (millis() > lastMillis + 100) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
}

//Jitterbugs_Sad
function Jitterbugs() {
  bugs.push(new Bugs(mouseX,mouseY));

  // update and display
  for (let i = 0; i < bugs.length; i++) {
    let t = bugs[i];
    t.display();

  }
  
  // limit
  while (bugs.length > NUM_OF_BUGS) {
    bugs.splice(0, 1); // remove the first "oldest" object.
  }
}

class Bugs{
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    push()
    textFont(cultFont)
    textAlign(CENTER)
    textSize(random(20,60))
    if(exp == "sad"){
      text("HahaH",this.x, this.y, this.diameter, this.diameter);
    }
    if(exp == "happy"){
      let contentbox = ["What is happy?", "Is happy possible?", "?"]
      let content = random(contentbox)
      text(content,this.x, this.y, this.diameter, this.diameter);
    }
    pop()
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

