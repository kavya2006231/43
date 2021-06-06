var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var banana,bananaImg;
var foodGroup;
var stone,obstacleImg;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg= loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

 obstaclesGroup = new Group();
  foodGroup = new Group();
}

function draw() { 
  
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  
  
  if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }


food();

obstacles();
  drawSprites();
  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  }
  else if(gameState === END){
    backgr.velocityX=0;
    player.visible=false;
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
  
    textSize(30);
    fill(255);
    text("Game over!",300,220);
  }
  scores();
}
function food(){
if(frameCount % 80 ===0){
  var banana = createSprite(600,250,40,10);
  banana.y = random(120,200);
  banana.addImage(bananaImg);
  banana.scale=0.1;
  banana.velocityX=-4;
  banana.lifetime=300;
  player.depth = banana.depth +1;
  foodGroup.add(banana);
}
}

function obstacles(){
  if(frameCount % 60 ===0){
    var stone = createSprite(600,350,40,10);
    stone.addImage(obstacleImg);
    stone.scale=0.2;
    stone.velocityX=-4;
    stone.lifetime=300;
    player.depth = stone.depth +1;
    obstaclesGroup.add(stone);
  }
  }

function scores(){
  if(foodGroup.isTouching(player)){
    textSize(10);
    text("score: "+ score, 300,220);

    foodGroup.destroyEach();
    score =score+2;
    player.scale +=0.03;   
  }
}


