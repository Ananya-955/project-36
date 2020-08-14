//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG, happyDogIMG;
var database;
var changingGameState, readingGameState;
var bedroomImg, gardenImg, washroomImg;
var fedTime, lastFed;
var gameState="Hungry";
//var x;
var foodObj;
var feed, addFood;

function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png");
  happyDogIMG=loadImage("images/dogImg1.png");
  bedroomImg=loadImage("images/virtual pet images/Bed Room.png");
  gardenImg=loadImage("images/virtual pet images/Garden.png");
  washroomImg=loadImage("images/virtual pet images/Wash Room.png");
  
}

function setup() {
  createCanvas(1000, 800);
  database=firebase.database();

  dog=createSprite(250, 450, 10,10);
	dog.addImage(dogIMG);
  dog.scale=0.2;
  
  foodObj=new Food();

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val();
  })
 
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();

 // if (keyWentDown(UP_ARROW)){
    //writeStock(foodS);
    //dog.addImage(happyDogIMG);
 // }
  if (foodS===0){
    dog.addImage(dogIMG);
  }

  foodObj.getFoodStock();


  fedTime=database.ref('FeedTime');
  fedTime.on("value", (data) => {
    lastFed=data.val();
  });

  fill("white");
  stroke("white");
  if (lastFed>=12){
    text("Last Fed: "+lastFed%12 + "PM", 350, 30);
  } else if (lastFed==0){
    text("Last Feed: 12 Am", 350,30)
  } else {
    text("Last Feed: "+lastFed+ "AM", 350,30);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("white");
  stroke("white");
  text("Press UP ARROW key to feed Drago milk", 50,100);
  
  fill("white");
  stroke("white");
  text("Food left:" +foodObj.foodStock, 250,250);

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(dogIMG);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if (currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else {
    update("Hungry")
    foodObj.display();
  }
}
//mine 

function writeStock(x){

 if (x<0){
   x=0;
 } 
 else{
   x=x-1;
 }

  database.ref('/').update({
    Food:x
  });
}
function feedDog(){
  dog.addImage(happyDogIMG);
  update("Playing");
  console.log("happyDog");

  //console.log(foodObj.getFoodStock());
  foodObj.updateFoodStock(foodObj.foodStock-1);
  database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
  })
}
function addFoods(){
  foodObj.foodStock++;
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}


