var bgImg;
var playerImg;
var enemyImg;
var playerBulletImg;
var enemyBulletImg;

var playerName = getName();
var game = new Game(playerName, 700 / 2, 480);

function preload() {
  bgImg = loadImage("./assets/space.jpg");
  playerImg = loadImage("./assets/spaceShip.png");
  enemyImg = loadImage("./assets/enemySpaceShip.png");
  playerBulletImg = loadImage("./assets/bullet.png");
  enemyBulletImg = loadImage("./assets/enemyBullet.png");
}

function setup() {
  canvas = createCanvas(700, 500);
  game.createPlayer();
}

function draw() {
  background(bgImg);
  game.update();
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

  return "";
}

function keyReleased() {
  game.createBullet();
}
