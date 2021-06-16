class Game {
    constructor(){

    }
    
    getState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
           gameState = data.val();
        })
    
      }
    
      update(state){
        database.ref('/').update({
          gameState: state
        });
      }
    
      async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }
    
        minion1 = createSprite(400,200);
        minion1.addImage("minion 1",minion1_img);

        minion2 = createSprite(100,200);
        minion2.addImage("minion 2",minion2_img);

        minions = [minion1 , minion2];

      }
    
      play(){
        form.hide();
        
        Player.getPlayerInfo();
        player.getMinionsAtEnd();
        
        if(allPlayers !== undefined){
          background(rgb(34,139,34));
          image(jungle, 0,-displayHeight,displayWidth, displayHeight);
          
          //var display_position = 100;
          
          //index of the array
          var index = 0;
    
          //x and y position of the minions
          var x = 175 ;
          var y;
    
          for(var plr in allPlayers){
            //add 1 to the index for every loop
            index = index + 1 ;
    
            //position the minions a little away from each other in x direction
            x = x + 400;
            //use data form the database to display the minions in y direction
            y = displayHeight - allPlayers[plr].distance;
            minions[index-1].x = x;
            minions[index-1].y = y;
           // console.log(index, player.index)
    
           
            if (index === player.index){
              stroke(10);
              fill("red");
              ellipse(x,y,60,60);
              minions[index - 1].shapeColor = "red";
              camera.position.x = displayWidth/2;
              camera.position.y = minions[index-1].y;
            }
           
            //textSize(15);
            //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
          }
    
        }
    }
}