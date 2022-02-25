class Bullet {
    constructor(type, x, y) {
        if (type == "enemyBullet") {
            this.pBullet = false;
        } else {
            this.pBullet = true;
        }

        this.bullet = createSprite(x, y);
        if (this.pBullet) {
            this.bullet.addImage(playerBulletImg);
            this.bullet.velocityY = -5;
            this.bullet.lifetime = 700 / 5;
        } else {
            this.bullet.addImage(enemyBulletImg);
            this.bullet.velocityY = 5;
            this.bullet.lifetime = 700 / 5;
        }
    }
}