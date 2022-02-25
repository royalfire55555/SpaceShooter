class Game {
    constructor(name, x, y) {
        this.name = name;
        this.y = y;
        this.x = x;
        this.bullets = [];
    }

    createPlayer() {
        this.player = createSprite(this.x, this.y);
        this.player.addImage(playerImg)
        this.player.scale = 0.2;
    }

    update() {
    }

    handleInput() {
        if (mouseDown()) {

        }
    }
}