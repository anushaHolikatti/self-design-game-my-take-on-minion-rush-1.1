var Canvas;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var minion1, minion1_img, minion2, minion2_img ;
var minions;

var jungle;

function preload(){
  minion1_img = loadImage("minion2.jpg");
  minion2_img = loadImage("purple minion.jpg")
  jungle = loadImage("jungle2.jpg");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }  
}