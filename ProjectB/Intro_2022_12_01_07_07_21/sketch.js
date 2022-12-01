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
}

function draw() {
  clear()
  if(s==0){
    image(window1,0,0,window1.width,window1.height)
  }
  push()
  if(s==1){
    scale(0.5)
image(AF_1,0,0,AF_1.width,AF_1.height)
  }
  if(s==2){
    scale(0.5)
image(mirror_1,0,0,mirror_1.width,mirror_1.height)
  }
  pop()
  mouseCursorArrow()
}

function mousePressed(){
  if(s==0){
    //Mirror 540 615
  if ( mouseX >540-sign_Width && mouseX<540+ sign_Width && mouseY >615-sign_Height && mouseY< 615+sign_Height){
    s=2
  }
  //AF 705 550
  if (mouseX >705-sign_Width && mouseX<705+sign_Width && mouseY >550-sign_Height && mouseY< 550+sign_Height){
    s=1
  }
  }
  if(s==1){
     if ( mouseX >510-sign_Width && mouseX<510+sign_Width && mouseY >635-sign_Height && mouseY< 635+sign_Height){
    //Go to the link of AF's web
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