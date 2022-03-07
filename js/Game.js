class Game {
  constructor(name, x, y) {
    this.name = name;
    this.y = y;
    this.x = x;
    this.pBullets = [];
    this.eBullets = [];
    this.playerCount = 0;
  }

  play() {
  }

  join(x, y) {
    console.log("Joining game");
    var playerCountRef = database.ref("/playerCount");
    playerCountRef
      .get()
      .then((data) => {
        if (data.val() < 1) {
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
        } else {
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

  reset() {
    database.ref("/").set({
      playerCount: 0,
    });
    database.ref("players/player1").set({
      name: "",
      x: 0,
      y: 0,
    });
    database.ref("players/player2").set({
      name: "",
      x: 0,
      y: 0,
    });
  }

  getState() {
    var state = undefined;
    var playerCountRef = database.ref("/gameState");
    playerCountRef
      .get()
      .then((data) => {
        state.replace(state, data.val());
      })
      .catch((err) => {
        database.ref("/").set({
          gameState: 0,
        });
        return 0;
      });
    return state;
  }

  updateState(newState) {
    database.ref("/").update({
      gameState: newState
    })
  }
}
