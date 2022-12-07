//Font Library
//BMREA___.TTF
//Minecraft.ttf
//ModernDOS8x14.ttf
//PIXEAB__.TFF
//PIXEABG_.TTF
//Windows Regular.ttf

//Variable for Track class
let track=[]
let NUM_OF_TRACK = 3

//Variable for fonts
let content = "Hey, I'm Jane.\n ……\n I'm here waiting for you. \n Would you like to be my friend?"
let cWidth 
let disWidth
let index = 0;
let lastMillis = 0;

//Button_control
let button

function preload(){
  mouseArrow =loadImage("images/mousearrow.png")
  myFont=loadFont('assets/ModernDOS8x14.ttf')
  AF2_1 = loadImage("images/AF2_1.png")
}

function setup() {
  canvas = createCanvas(AF2_1.width*0.3, AF2_1.height*0.3);
  canvas.parent("sketch");
  noCursor();
  cWidth = textWidth(content)+100
  disWidth = width/2
  frameRate(15)
}

function draw(){
  clear()
  push()
  scale(0.4)
 image(AF2_1,0,-100);
  pop()
  Intro()
  but()
  mouseCursorArrow()
}

function but(){
  button = createButton('continue')
  button.parent('sketch')
  button.style('font-size', '10px', 'color', '#ffffff');
  button.style("font-family", "myfont");
  button.position(295+width/2,1.2*height/2+80);
  button.mousePressed(window.open('https://b2xx.github.io/CClab_Github/ProjectB/AF_interface_2_expression_2022_12_07_12_06_10 '));
  button.style("background-color", "#FFFFFF");
  button.style("color", "#000000"); 

}

function Intro(){
  textFont(myFont)
  textAlign(CENTER)
  textSize(16)
  text(content.substring(0, index),250,1.2*height/3,200,200)
  stroke(0,random([0,255]))
  if (millis() > lastMillis + 200) {
		index = index + 1;
		//ONE WORD AT A TIME }
		lastMillis = millis();
	}
}

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