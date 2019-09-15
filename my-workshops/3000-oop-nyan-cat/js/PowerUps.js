class PowerUps extends OtherEnts {
  constructor(theRoot, Spot, direction, rand) {
    super(theRoot, Spot, direction);
    this.x = Spot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.type = "powerUp";
    if (rand === 0) {
      this.domElement.src = "images/bubble.png";
      this.domElement.height = 60;
      this.powerType = "immunity";
    } else {
      this.domElement.src = "images/gem.png";
      this.domElement.height = 80;
      this.powerType = "ammo";
    }
  }
}
