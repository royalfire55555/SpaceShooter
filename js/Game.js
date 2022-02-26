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
    var data = database.ref("players/player").on("value", (data) => {
      var data = data.val();
      if (data.name) {
        console.log("creating enemy");
        database.ref("players/enemy").set({
          name: this.name,
          posX: this.player.x,
          posY: this.player.y,
        });
      } else {
        console.log("creating player");
        database.ref("players/player").set({
          name: this.name,
          posX: this.player.x,
          posY: this.player.y,
        });
      }
    });
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
