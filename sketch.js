var dog,dogImg,dogImg1;
var database;
var foodS,foodStock, food;
var feed, addFood; 

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodObj= new food(); 

  fedTime = database.ref('FEED TIME');
  fedTime.on("value",function(data){
    fedTime = data.val();
  });

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed=createButton("Press me to feed Spirit"); 
  feed.position(700,95); 

  addFood= createButton("Press me to add some milk"); 
  addFood.position(800, 90); 
}

// function to display UI
function draw() {
  background(46,139,87);
  
  foodObj.display();

  fill(255, 255, 254); 
  textSize(15); 
  if(lastFed>=12){

    text("Last Fed:"+ lastFed%12+ "PM", 350, 30); 
  }

  else if(lastFed==0){

    text("Last Fed: 12 AM", 350, 30); 
  }

  else{

    text("Last Fed:"+ lastFed+"AM", 350, 30); 
  }
  
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Click here to feed Spirit!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){

  dog.addImage(dogImg1); 

  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({
    Food:foodObj.getFoodStock() 
    FeedTime : hour()
  })
}