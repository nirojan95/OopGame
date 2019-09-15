class Player {
  constructor(root) {
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 70;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/wizard.png";
    this.domElement.height = "120";
    this.immunity = false;
    this.domElement.style.position = "absolute";
    this.domElement.style.top = this.y + "px";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.immunity === true) {
      this.domElement.src = "images/wizardInBubbleLeft.png";
    } else {
      this.domElement.src = "images/wizardLeft.png";
    }
    if (this.x > 0) this.x = this.x - PLAYER_WIDTH / 2;
    this.domElement.style.left = this.x + "px";
  }

  moveRight() {
    if (this.immunity === true) {
      this.domElement.src = "images/wizardInBubble.png";
    } else {
      this.domElement.src = "images/wizard.png";
    }
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) this.x = this.x + PLAYER_WIDTH / 2;
    this.domElement.style.left = this.x + "px";
  }

  moveDown() {
    if (this.y < GAME_HEIGHT - PLAYER_HEIGHT - 70)
      this.y = this.y + PLAYER_HEIGHT / 3;
    this.domElement.style.top = this.y + "px";
  }

  moveUp() {
    if (this.y + PLAYER_HEIGHT > 550) this.y = this.y - PLAYER_HEIGHT / 3;
    this.domElement.style.top = this.y + "px";
  }

  changeImage() {
    if (this.immunity === true) {
      if (
        this.domElement.src === "images/wizardInBubbleLeft.png" ||
        this.domElement.src === "images/wizardLeft.png"
      ) {
        this.domElement.src = "images/wizardInBubbleLeft.png";
      } else {
        this.domElement.src === "images/wizardInBubble.png";
      }
    } else {
      if (
        this.domElement.src === "images/wizardLeft.png" ||
        this.domElement.src === "images/wizardInBubbleLeft.png"
      ) {
        this.domElement.src = "images/wizardLeft.png";
      } else {
        this.domElement.src = "images/wizard.png";
      }
    }
  }
}
