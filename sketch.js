var zombiegroup;
var zombieL;
var zombieR;
var zombieD;
var zombieU;
var bulletgroup;
var bullet;
var soldierright;
var soldierleft;
var soldire;
var bg;
var gameState=1;
var invisible;
var Lives=3;
var zombieGroup;
function preload(){
soldierright=loadImage("soldire9.png");
soldierleft=loadImage("soldire 10.png");
bg=loadImage("green wall.jpg");
}
function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 20);

  soldire = createSprite(displayWidth / 2, displayHeight / 2, 10, 10);
 
  soldire.addImage("soldier",soldierleft);
  soldire.scale = 0.18;
  soldire.setCollider("circle",100,0,300);
  soldire.debug=true;
  
 invisible=createSprite(soldire.x,soldire.y-15,10,10);
 invisible.setCollider("circle",0,0,30);
 invisible.visible=false;
  fountain1 = createSprite(30, 30, 20, 20);
  fountain2 = createSprite(displayWidth - 30, 30, 20, 20);
  fountain3 = createSprite(30, displayHeight - 30, 20, 20);
  fountain4 = createSprite(displayWidth - 30, displayHeight - 30, 20, 20);


  // zombiegroup=createGroup();
  zombieL = createGroup();
  zombieR = createGroup();
  zombieD = createGroup();
  zombieU = createGroup();

  bulletgroup = new Group();
  zombieGroup=new Group();

}

function draw() {
  background(255);
textSize(16);
  text("Lives Left: "+Lives,displayWidth-200,40);
  invisible.x=soldire.x-20;
  invisible.y=soldire.y-20;

  var rand = Math.round(random(1, 2));
  if (World.frameCount % 10 === 0) {
    if (rand === 1) {
      ZombieLeft();
    }
    else if (rand === 2) {
      ZombieRight();
    }
   /* else if (rand === 3) {
      ZombieDown();
    }
    else
      ZombieUp();*/
  }


 /* if (keyWentDown("space")) {
    console.log('here')
    bullet1();
  }*/



  if (keyDown(LEFT_ARROW)) {
    changePosition(-2, 0);
    soldire.addImage("soldier",soldierleft);
    gameState=1;
    soldire.setCollider("circle",100,0,300);
    soldire.scale=0.18;
   
    if(keyDown("space"))
    bulletLeft();
    
    

  }
  else if (keyDown(RIGHT_ARROW)) {
    changePosition(2, 0);
    soldire.addImage("soldier",soldierright);
    gameState=2;
    soldire.setCollider("circle",-100,0,300);
    soldire.scale=0.18;
    invisible.x=soldire.x+20;
  invisible.y=soldire.y-20;
   
    if(keyDown("space"))
    bulletRight();
   
   
  }
  else if (keyDown(UP_ARROW)) {
    changePosition(0, -2);
    if(keyDown("Space")){
    if(gameState===1){
bulletLeft();
    }
    else{
      bulletRight();
    }
  }


  }
  else if (keyDown(DOWN_ARROW)) {
    changePosition(0, +2);
    if(keyDown("Space")){
      if(gameState===1){
  bulletLeft();
      }
      else{
        bulletRight();
      }
    }
  }

  // console.log(bulletgroup);
  if (bulletgroup.isTouching(zombieL)) {
    zombieL.destroyEach();
    bulletgroup.destroyEach();
    console.log("touched");
  }
  if (bulletgroup.isTouching(zombieR)) {
    zombieR.destroyEach();
    bulletgroup.destroyEach();
    console.log("touched");
  }

  if(zombieGroup.collide(soldire)){
    Lives=Lives-1;
    zombieGroup.destroyEach();
  }

  if(Lives===0){
    soldire.destroy();
    zombieGroup.destroyEach();
    zombieGroup.clear();
    
    textSize(24);
    text("Mission Failed",displayWidth/2,displayHeight/2);
  }
  drawSprites();

  
}


/* zombie.display();
 zombie2.display();
 zombie3.display();
 zombie4.display();
 zombie5.display();
 zombie6.display();
 zombie7.display();
 zombie8.display();
 zombie9.display();
 zombie10.display();*/





function changePosition(x, y) {
  soldire.x = soldire.x + x;
  soldire.y = soldire.y + y;
}

function ZombieRight() {

  var Zombie = new zombie(displayWidth, Math.round(random(50, displayHeight - 50)));
  Zombie.display();



}

function ZombieLeft() {

  var Zombie = new zombieRight(0, Math.round(random(50, displayHeight - 50)));
  Zombie.display();
  

}


/*function ZombieUp() {

  var Zombie = new zombieUp(Math.round(random(50, displayWidth - 50)), 0);
  Zombie.display();


}


function ZombieDown() {

  var Zombie = new zombieDown(Math.round(random(50, displayWidth - 50)), displayHeight);
  Zombie.display();



}*/



/*function bullet1() {
  bullet = createSprite(displayWidth / 2, displayHeight / 2, 10, 10);
  bullet.y = soldire.y;
  bullet.x = soldire.x;
  console.log(soldire.image);
  if (keyDown("UP_ARROW"))
    bullet.velocityY = -4;
  else if (keyDown("DOWN_ARROW"))
    bullet.velocityY = 4;
  else if (keyDown("LEFT_ARROW"))
    bullet.velocityX = -4;
  else if (keyDown("RIGHT_ARROW"))
    bullet.velocityX = +4;

  bullet.lifetime = 100;

  bulletgroup.add(bullet);


}*/

function bulletLeft() {
  bullet = createSprite(invisible.x, invisible.y, 10, 10);
  bullet.y = invisible.y;
  bullet.x = invisible.x;
  bullet.velocityX=-4;
  bullet.lifetime=100;
  bulletgroup.add(bullet);
}

function bulletRight() {
  bullet = createSprite(invisible.x, invisible.y, 10, 10);
  bullet.y = invisible.y;
  bullet.x = invisible.x;
  bullet.velocityX=4;
  bullet.lifetime=100;
  bulletgroup.add(bullet);
}