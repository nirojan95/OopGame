let gameDiv = document.getElementById("app");
gameDiv.style.postion = "absolute";
addBackground(gameDiv);
let startGameText = new GameStateText(gameDiv, 220, 240, 0);
let gameEngine = undefined;
let gameStart = event => {
  if (event.code === "Space") {
    if (gameEngine === undefined) {
      gameEngine = new Engine(gameDiv);
      delete startGameText.delete();
      gameEngine.gameLoop();
    }
    if (gameEngine.state) {
      document.location.reload();
    }
    if (gameEngine.ammo > 0) {
      console.log(gameEngine.projectiles);
      gameEngine.projectiles.push(
        new Projectile(gameDiv, gameEngine.player.x, gameEngine.player.y)
      );
      gameEngine.ammo--;
    }
  }
};
let keydownHandler = event => {
  if (event.code === "ArrowLeft") gameEngine.player.moveLeft();
  if (event.code === "ArrowRight") gameEngine.player.moveRight();
  if (event.code === "ArrowUp") gameEngine.player.moveUp();
  if (event.code === "ArrowDown") gameEngine.player.moveDown();
};

document.addEventListener("keydown", gameStart);
document.addEventListener("keydown", keydownHandler);

gameEngine.gameLoop();

let numOfEnemies = setInterval(() => {
  if (MAX_ENEMIES === 7) clearInterval(numOfEnemies);
  else {
    MAX_ENEMIES++;
  }
}, 10000);
