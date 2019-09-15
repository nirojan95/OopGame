class Enemy extends OtherEnts {
  constructor(theRoot, enemySpot, direction) {
    super(theRoot, enemySpot, direction);
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.type = "enemy";
    this.domElement.src = "images/enemy.png";
  }
}
