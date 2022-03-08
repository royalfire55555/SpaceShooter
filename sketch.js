var database = firebase.database();

var bgImg;
var playerImg;
var enemyImg;
var playerBulletImg;
var enemyBulletImg;

var playerData;
var gameState;
var index;
var playerCount;
var enemyIndex;
var enemyPos;
var enemyBulletsArr = [];
var enemyBullets = [];
var bullets = [];
var bulletPos = [];

var playerName = getName();
var game;

function preload() {
  bgImg = loadImage("./assets/space.jpg");
  playerImg = loadImage("./assets/spaceShip.png");
  enemyImg = loadImage("./assets/enemySpaceShip.png");
  playerBulletImg = loadImage("./assets/bullet.png");
  enemyBulletImg = loadImage("./assets/enemyBullet.png");
}

function setup() {
  canvas = createCanvas(700, 500);
  game = new Game(playerName, 700 / 2, 480);
  game.createPlayer();
  game.join(game.x, game.y);
}

function draw() {
  background(bgImg);
  handleExit();
  game.update(game.x, game.y, index);
  game.getState();
  game.getPlayerCount();
  if (gameState == 0) {
    if (playerCount > 1) {
      game.updateState(1);
    }
  } else if (gameState == 1) {
    game.play();
  }
  drawSprites();
}

function getName() {
  var cookies = document.cookie;

  if (cookies.length > 0) {
    return cookies[0];
  } else {
    var name = window.prompt("What is your name?");
    document.cookie = name;
    return name;
  }
}

function keyReleased() {
  game.createBullet();
}

function handleExit() {
  window.addEventListener("beforeunload", function (e) {
    game.reset();
  });
}
