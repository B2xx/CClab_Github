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
let content = "I would like to spend time with you… My friend…"
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
  createCanvas(AF2_1.width*0.3, AF2_1.height*0.3);
  noCursor();
  cWidth = textWidth(content)+100
  disWidth = width/2
  frameRate(15)
}

function draw(){
  background(220)
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
  button.style('font-size', '10px', 'color', '#ffffff');
  button.style("font-family", "myfont");
  button.position(width/2-30, height/2+20);
  button.mousePressed(changeBG);
  button.style("background-color", "#FFFFFF");
  button.style("color", "#000000"); 

}

function changeBG() {
  let val = random(255);
  background(val);
}

function Intro(){
  textFont(myFont)
  textAlign(CENTER,CENTER)
  textSize(16)
  text(content.substring(0, index),width/2,height/2)
  stroke(0,random([0,255]))
  if(disWidth<cWidth){
    line(disWidth, height/2-10, disWidth, height/2+10)
  }
  disWidth+=1.115
  if (millis() > lastMillis + 200) {
		index = index + 1;
		//ONE WORD AT A TIME
		// while(message.charAt(index) != ' ' &&
		// 		 index < message.length){
		// 	index = index + 1;
		// }
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