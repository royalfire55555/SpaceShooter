class Game {
  constructor(name, x, y) {
    this.name = name;
    this.y = y;
    this.x = x;
    this.playerCount = 0;
  }

  play() {}

  join(x, y) {
    console.log("Joining game");
    var playerCountRef = database.ref("/playerCount");
    playerCountRef
      .get()
      .then((data) => {
        if (data.val() == 0) {
          enemyIndex = 2;
          index = 1;
          console.log("adding player");
          database.ref("/").update({
            playerCount: data.val() + 1,
          });
          console.log("updated player count by 1");
          database.ref("players/player1").update({
            name: document.cookie,
            xPos: x,
            yPos: y,
          });
        } else if (data.val() == 1) {
          enemyIndex = 1;
          index = 2;
          console.log("adding enemy");
          database.ref("/").update({
            playerCount: data.val() + 1,
          });
          console.log("updated player count by 1");
          database.ref("players/player2").update({
            name: document.cookie,
            xPos: x,
            yPos: y,
          });
        }
      })
      .catch((err) => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
        });
        playerCountRef.get().then((data) => {
          if (data.val() == 0) {
            console.log("adding player");
            database.ref("/").update({
              playerCount: data.val() + 1,
            });
            console.log("updated player count by 1");
            database.ref("players/player1").update({
              name: document.cookie,
              xPos: x,
              yPos: y,
            });
          } else if (data.val() == 1) {
            console.log("adding enemy");
            database.ref("/").update({
              playerCount: data.val() + 1,
            });
            console.log("updated player count by 1");
            database.ref("players/player2").update({
              name: document.cookie,
              xPos: x,
              yPos: y,
            });
          }
        });
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

  update(x, y, index) {
    this.handleInput();
    this.x = this.player.x;
    this.y = this.player.y;
    this.getPlayerCount();
    database.ref("players/player" + index).update({
      name: document.cookie,
      xPos: x,
      yPos: y,
    });

    if (gameState > 0) {
      var enemyRef = database.ref("/players/player" + enemyIndex);
      enemyRef.get().then((data) => {
        enemyPos = data.val();
        enemyPos = enemyPos.xPos;
      });
      this.enemy.x = enemyPos;
      this.getEnemyBullets();
      this.uploadBullets();
    }
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
    bullets.push(bullet);
    bulletPos.push({
      x: this.player.x,
      y: this.player.y,
    });
  }

  reset() {
    database.ref("/").set({
      gameState: 0,
      playerCount: 0,
    });
  }

  getState() {
    var gameStateRef = database.ref("/gameState");
    gameStateRef
      .get()
      .then((data) => {
        gameState = data.val();
      })
      .catch((err) => {
        database.ref("/").update({
          gameState: 0,
        });
        gameState = 0;
      });
  }

  updateState(newState) {
    database.ref("/").update({
      gameState: newState,
    });
  }

  getPlayerCount() {
    var playerCountRef = database.ref("/playerCount");
    playerCountRef.get().then((data) => {
      playerCount = data.val();
    });
  }

  uploadBullets() {
    database.ref("players/player" + index).update({
      bullets: bulletPos,
    });
  }

  getEnemyBullets() {
    var enemyRef = database.ref("/players/player" + enemyIndex);
    enemyRef.get().then((data) => {
      enemyBulletsArr = data.val();
      enemyBulletsArr = enemyBulletsArr.bullets;
    });

    for (var i = 0; i < enemyBulletsArr; i++) {
      console.log("created Bullet");
      enemyBulletsArr.splice(i);
      var bullet = new Bullet(
        "enemyBullet",
        enemyBulletsArr[i].x,
        enemyBulletsArr[i].y,
        height
      );
      enemyBullets.append(bullet);
    }
  }
}
