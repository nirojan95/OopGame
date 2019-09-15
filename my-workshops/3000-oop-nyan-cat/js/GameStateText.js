class GameStateText {
  constructor(root, xPos, yPos, gamestate) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = xPos + "px";
    div.style.top = yPos + "px";
    div.style.color = "white";
    div.style.font = "bold 30px Impact";
    div.style.zIndex = 2000;
    root.appendChild(div);
    this.domElement = div;
    if (gamestate === 0) {
      this.domElement.innerText = "Start the Game: Press Space";
    }
    if (gamestate === 1) {
      this.domElement.innerText = "Restart the Game: Press Space";
    }
  }

  delete() {
    this.domElement.innerText = "";
  }
}
