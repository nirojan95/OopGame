class OtherEnts {
  constructor(theRoot, Spot, direction) {
    this.root = theRoot;
    this.spot = Spot;
    this.direction = direction;
    this.flipped = false;
    this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/enemy.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.top = this.y + "px";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.zIndex = 5;
    if (theRoot !== undefined) theRoot.appendChild(this.domElement);
    this.speed = Math.random() * 0.5 + 0.25;
  }
  update(timeDiff, score) {
    let moveDiagonalRight = () => {
      this.y = this.y + timeDiff * this.speed;
      this.x = this.x + timeDiff * this.speed;
      this.domElement.style.top = this.y + "px";
      this.domElement.style.left = this.x + "px";
    };

    let moveDiagonalLeft = () => {
      this.y = this.y + timeDiff * this.speed;
      this.x = this.x - timeDiff * this.speed;
      this.domElement.style.top = this.y + "px";
      this.domElement.style.left = this.x + "px";
    };

    if (
      (this.direction === 1 && !this.flipped) ||
      (this.direction === 2 && this.flipped)
    ) {
      moveDiagonalLeft();
      if (this.x < 0) this.flipped = !this.flipped;
    } else if (
      (this.direction === 2 && !this.flipped) ||
      (this.direction === 1 && !this.flipped)
    ) {
      moveDiagonalRight();
      if (this.x > GAME_WIDTH - 100) this.flipped = !this.flipped;
    } else {
      this.y = this.y + timeDiff * this.speed;
      this.domElement.style.top = this.y + "px";
    }
    if (this.y > GAME_HEIGHT || this.destryoed === true) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
      return score + 1;
    }
    this.domElement.style.top = this.y + "px";
    this.domElement.style.left = this.x + "px";
    return score;
  }

  removeChild() {
    if (this.destroyed === true) {
      this.root.removeChild(this.domElement);
    }
  }
}
