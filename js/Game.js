class Game {
  constructor(name, x, y) {
    this.name = name;
    this.y = y;
    this.x = x;
    this.pBullets = [];
    this.eBullets = [];
    this.playerCount = 0;
  }

  join(x, y) {
    console.log("Joining game");
    var playerCount = this.getPlayerCount()
    console.log(playerCount)
    if (playerCount < 1) {
      database.ref("/").set({
        playerCount: playerCount + 1,
      });
      database.ref("players/player").set({
        name: document.cookie,
        xPos: x,
        yPos: y,
      });
    } else {
      database.ref("/").set({
        playerCount: playerCount + 1,
      });
      database.ref("players/player").set({
        name: document.cookie,
        xPos: x,
        yPos: y,
      });
    }
  }

  getPlayerCount() {
    var playerCountRef = database.ref("/");
    playerCountRef.on("value", function (data) {
      var playerCount = data.val();
      playerCount = playerCount.playerCount;
      return playerCount;
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
    this.x = this.player.x;
    this.y = this.player.y;
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
