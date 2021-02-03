var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey;
var s1 = 0;
var s2 = 0;
var ground;  
var r1;
var g1;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png",
  "sprite_1.png",
  "sprite_2.png",
  "sprite_3.png",
  "sprite_4.png",
  "sprite_5.png",
  "sprite_6.png",
  "sprite_7.png",
  "sprite_8.png")
  
  banana1 = loadImage("banana.png");
  obstacle1 = loadImage("obstacle.png");

  backImg = loadImage("jungle.jpeg");
 
  g = loadImage("gameOver.png");
  r = loadImage("restart.png");
}

function setup() {
  createCanvas(400,400)
  monkey = createSprite(50,165,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.10;
  monkey.velocityX = 5;

  back = createSprite(monkey.x+100,200)
  back.addImage(backImg)
  back.scale = 2.5;

  back.depth = monkey.depth;
  monkey.depth += 1;

  ground = createSprite(monkey.x,380,800,10);
  ground.shapeColor = "black";
  ground.velocityX = -0.5;

  oGroup = createGroup();
  bGroup = createGroup();
  
  r1 = createSprite(200,150,10,10);
  r1.addImage(r);
  r1.scale = 0.5;
  
  g1 = createSprite(200,100,10,10);
  g1.addImage(g);
  g1.scale = 0.5;
    
}


function draw() {
background(255);
  
  fill("black");
  textSize(15);
  text("Survival Time : " + s1,monkey.x,50);
  text("Score : " + s2,monkey.x-100,50);
  
  
  
  if(gameState === PLAY) {

    s1 = s1 + Math.round(getFrameRate()/60);

    if(ground.x < monkey.x - 100) {
      ground.x = monkey.x + 100;
    }

    if(back.x < monkey.x - 100) {
      back.x = monkey.x + 100;
    }
    
    if(keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
    } 
      
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    camera.position.x = monkey.x;
    camera.position.y = 200
    
    if(monkey.isTouching(bGroup)) {
      s2 = s2 + 2;
      bGroup.destroyEach();
    }
    
    if(monkey.isTouching(oGroup)) {
      gameState = END;
    }
      
    obstacles();
    banana();

    r1.visible = false;
    g1.visible = false;
  }
  
  if(gameState === END) {
  
    r1.visible = true;
    g1.visible = true;
   
    oGroup.setVelocityXEach(0);
    oGroup.setLifetimeEach(-1);
    
    bGroup.setVelocityXEach(0);
    bGroup.setLifetimeEach(-1);
   
    ground.velocityX = 0;
    monkey.velocityX = 0;
    
    monkey.collide(ground);
    monkey.velocityY = monkey.velocityY + 0.8;
    
       if(mousePressedOver(r1)) {
      reset();
    }
  }
  
drawSprites();  
}

function obstacles() {
  if(World.frameCount % 250 === 0) {
    var o1 = createSprite(monkey.x + 300,350,10,10);
    o1.addImage(obstacle1);
    o1.scale = 0.15;
    o1.velocityX = -0.5;
    o1.lifetime = 150;
    oGroup.add(o1);
  }
}

function banana(){
  
  if(World.frameCount % 100 === 0) {
    var b1 = createSprite(monkey.x + 300,350,10,10);
    b1.addImage(banana1);
    b1.scale = 0.07;
    b1.y = Math.round(random(150,250));
    b1.velocityX = -0.5;
    b1.lifetime = 150;
    
    bGroup.add(b1);
  }
}

function reset () {
  gameState = PLAY;
  oGroup.destroyEach();
  bGroup.destroyEach();
  s1 = 0;
  s2 = 0;
}