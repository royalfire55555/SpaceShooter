class Bullet {
  constructor(type, x, y, h) {
    if (type == "eBullet") {
      this.pBullet = false;
    } else {
      this.pBullet = true;
    }

    this.bullet = createSprite(x, y);
    if (this.pBullet) {
      this.bullet.addImage(playerBulletImg);
      this.bullet.velocityY = -5;
      this.bullet.lifetime = h / 5;
      this.bullet.scale = 0.1;
    } else {
      this.bullet.addImage(enemyBulletImg);
      this.bullet.velocityY = 5;
      this.bullet.lifetime = h / 5;
      this.bullet.scale = 0.1;
    }
  }
}
