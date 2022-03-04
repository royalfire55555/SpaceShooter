class Game {
  constructor(name, x, y) {
    this.name = name;
    this.y = y;
    this.x = x;
    this.pBullets = [];
    this.eBullets = [];
  }

  join() {
    console.log("Joining game");
    var playerCountRef = database.ref("playerCount");
    console.log();
    // playerCountRef.on("value", function (data) {
    //   console.log(data.val())
    //   this.playerCount = data.val();
    // });
    console.log(this.playerCount);
  }

  createPlayer() {
    this.player = createSprite(this.x, this.y);
    this.player.addImage(playerImg);
    this.player.scale = 0.2;

    this.enemy = createSprite(this.x, 20);
    this.enemy.addImage(enemyImg);
    this.enemy.scale = 0.2;
  }

  update() {
    this.handleInput();
  }

  handleInput() {
    this.player.x = mouseX;
  }

  createBullet() {
    var bullet = new Bullet(
      "playerBullet",
      this.player.x,
      this.player.y,
      height
    );
    this.pBullets.push(bullet);
  }
}
