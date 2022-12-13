//Variable for Track class
let track=[]
let NUM_OF_TRACK = 3
// Justify the condition
let s
//the size of the sign
let sign_Width=80
let sign_Height=100

function preload(){
  mouseArrow =loadImage("images/mousearrow.png")
  window1 = loadImage("images/Window1.png")
  AF_1 = loadImage("images/AF_1.png")
  mirror_1= loadImage("images/Mirror_1.png")
}
function setup() {
  s=0
  createCanvas(window1.width, window1.height);
  noCursor();
  frameRate(15)
  rectMode(CENTER)
}

function draw() {
  clear()
  if(s==0){
image(window1,0,0,window1.width,window1.height)
  }
  if(s==1){
image(AF_1,0,0,AF_1.width,AF_1.height)
    noStroke()
    noFill()
    AF_web = rect(510,635,sign_Width,sign_Height)
  }
  if(s==2){
image(mirror_1,0,0,mirror_1.width,mirror_1.height)
  }
  mouseCursorArrow()
}

function mousePressed(){
  if(s==0){
    //Mirror 540 615
  if ( mouseX >540-sign_Width && mouseX<540+ sign_Width && mouseY >615-sign_Height && mouseY< 615+sign_Height){
    s=s+2
  }
  //AF 705 550
  if (mouseX >705-sign_Width && mouseX<705+sign_Width && mouseY >550-sign_Height && mouseY< 550+sign_Height){
    s=s+1
  }
  }
  //Go to the link of AF's web
  if(s==1 && mouseX >510-sign_Width && mouseX<510+sign_Width && mouseY >635-sign_Height && mouseY< 635+sign_Height){
window.open('https://b2xx.github.io/CClab_Github/ProjectB/AF_interface_1_2022_12_07_12_05_06 ')}
  if(s==2 && mouseX >875-sign_Width && mouseX<875+sign_Width && mouseY >945-sign_Height && mouseY< 945+sign_Height){
  window.open('https://b2xx.github.io/CClab_Github/ProjectB/Mirror_interface_1_2022_12_11_10_36_17')
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