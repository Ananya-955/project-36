//my project
class Food {
   constructor(){
       this.button=createButton("PLAY");
       this.image=loadImage("images/Milk.png");
       this.foodS;
       this.lastFed;
       this.foodStock=0;
   }
getFoodStock(){
    this.foodS=database.ref('Food');
    this.foodS.on("value",(data)=> {
     this.foodStock=data.val();
    });
}
updateFoodStock(count){

    database.ref('/').update({
        Food:count
    });
}
deductFood(){
    if (this.foodStock>0){

    this.button.mousePressed(()=>{
    //this.button.hide(),

    this.foodStock = this.foodStock-1
})    
    }
}
getFeedTime(lastFed){
    this.lastFed=lastFed;
}
bedroom(){
    background(bedroomImg, 550, 500);
}
garden(){
    background(gardenImg,1000,800);
}
washroom(){
    background(washroomImg, 550,500);  
}

display(){
    var x=80, y=100;
    imageMode(CENTER);
    image(this.image, 500, 200, 70, 70);
    if (this.foodStock!==0){
        for(var i=0; i<this.foodStock; i++){
            if (i % 10 === 0){
                x=80;
                y=y+50;
            }
            image(this.image, x, y, 50,50);
            x=x+30;

        }
    }
}


}

