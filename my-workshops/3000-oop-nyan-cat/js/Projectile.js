class Projectile {
  constructor(theRoot, xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
    this.root = theRoot;
    this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/fireball.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.top = this.y + "px";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.zIndex = 6;
    this.speed = Math.random() * 0.5 + 0.25;
    theRoot.appendChild(this.domElement);
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = this.y + "px";
    if (this.y < -200) {
      this.destroyed = true;
      this.root.removeChild(this.domElement);
    }
  }
}
