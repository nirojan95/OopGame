class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(theRoot);
    this.enemies = [];
    this.powerUps = [];
    this.printScore = new Text(gameDiv, 20, 7);
    this.immunityTimerText = new Text(gameDiv, 560, 80);
    this.immunityTimerText.domElement.innerText = "";
    this.ammoText = new Text(gameDiv, 490, 5);
    this.ammoText.domElement.innerText = "Ammo: 0";
    this.isPlayerDead = this.isPlayerDead.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.score = 0;
    this.state = false;
    this.ammo = 0;
    this.projectiles = [];
  }

  isPlayerDead() {
    let pLeft = this.player.x - 20;
    let pRight = this.player.x + PLAYER_WIDTH - 20;
    let pTop = this.player.y;
    let pBottom = pTop + PLAYER_HEIGHT;
    let eTop = this.enemies.map(enemy => {
      return enemy.y;
    });
    let eBottom = this.enemies.map(enemy => {
      return ENEMY_HEIGHT + enemy.y;
    });
    let eRight = this.enemies.map(enemy => {
      return enemy.x + ENEMY_WIDTH - 10;
    });
    let eLeft = this.enemies.map(enemy => {
      return enemy.x - 10;
    });
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].type === "powerUp") return false;
      if (pBottom >= eTop[i] && pBottom <= eBottom[i]) {
        if (pRight >= eLeft[i] && pRight <= eRight[i]) return true;
        if (pLeft >= eLeft[i] && pLeft <= eRight[i]) return true;
      }
    }
    return false;
  }

  hitPowerUp() {
    let pLeft = this.player.x - 20;
    let pRight = this.player.x + PLAYER_WIDTH - 20;
    let pTop = this.player.y;
    let pBottom = pTop + PLAYER_HEIGHT;
    let eTop = this.powerUps.map(powerUp => {
      return powerUp.y;
    });
    let eBottom = this.powerUps.map(powerUp => {
      return ENEMY_HEIGHT + powerUp.y;
    });
    let eRight = this.powerUps.map(powerUp => {
      return powerUp.x + ENEMY_WIDTH - 10;
    });
    let eLeft = this.powerUps.map(powerUp => {
      return powerUp.x - 10;
    });
    for (let i = 0; i < this.powerUps.length; i++) {
      if (pBottom >= eTop[i] && pBottom <= eBottom[i]) {
        if (pRight >= eLeft[i] && pRight <= eRight[i]) {
          this.powerUps[i].destroyed = true;
          return this.powerUps[i].powerType;
        }
        if (pLeft >= eLeft[i] && pLeft <= eRight[i]) {
          this.powerUps[i].destroyed = true;
          return this.powerUps[i].powerType;
        }
      }
    }
    return false;
  }

  projectileHit() {
    let eTop = this.enemies.map(enemy => {
      return enemy.y;
    });
    let eBottom = this.enemies.map(enemy => {
      return ENEMY_HEIGHT + enemy.y;
    });
    let eRight = this.enemies.map(enemy => {
      return enemy.x + ENEMY_WIDTH - 10;
    });
    let eLeft = this.enemies.map(enemy => {
      return enemy.x - 10;
    });

    let pTop = this.projectiles.map(projectile => {
      return projectile.y;
    });
    let pBottom = this.projectiles.map(projectile => {
      return ENEMY_HEIGHT + projectile.y;
    });
    let pRight = this.projectiles.map(projectile => {
      return projectile.x + ENEMY_WIDTH - 10;
    });
    let pLeft = this.projectiles.map(projectile => {
      return projectile.x - 10;
    });

    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (pBottom[i] >= eTop[j] && pBottom[i] <= eBottom[j]) {
          if (pRight[i] >= eLeft[j] && pRight[i] <= eRight[j]) {
            this.enemies[j].destroyed = true;
            return true;
          }
          if (pLeft[i] >= eLeft[j] && pLeft[i] <= eRight[j]) {
            this.enemies[j].destroyed = true;
            return true;
          }
        }
      }
    }
  }

  gameLoop() {
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    if (this.enemies === undefined) this.enemies = [];
    this.enemies.forEach(enemy => {
      this.score = enemy.update(timeDiff, this.score);
    });
    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });
    if (this.projectileHit()) {
      this.enemies.forEach(enemy => {
        enemy.removeChild();
      });
    }
    this.projectiles.forEach(projectile => {
      projectile.update(timeDiff);
    });
    this.projectiles = this.projectiles.filter(projectile => {
      return !projectile.destroyed;
    });

    this.powerUps = this.powerUps.filter(powerUp => {
      return !powerUp.destroyed;
    });
    while (this.enemies.length < MAX_ENEMIES) {
      let spot = nextEnemySpot(this.enemies);
      let direction = Math.floor(Math.random() * 3);
      let randPowerUp = Math.floor(Math.random() * 3);
      let whichPowerUp = Math.round(Math.random());
      if (randPowerUp === 1) {
        this.enemies.push(
          new PowerUps(this.root, spot, direction, whichPowerUp)
        );
      } else {
        this.enemies.push(new Enemy(this.root, spot, direction));
      }
    }

    this.powerUps = this.enemies.filter(entity => {
      return entity.type === "powerUp";
    });

    if (this.hitPowerUp() === "immunity") {
      console.log("bubble");
      this.powerUps.forEach(powerUp => {
        powerUp.removeChild();
      });
      this.powerUps = this.powerUps.filter(powerUp => {
        return !powerUp.destroyed;
      });
      this.player.immunity = true;
      this.player.changeImage();
      this.player.immunityTime = new Date().getTime();
      this.immunityTimerText.domElement.innerText = "10000";
    }
    if (this.player.immunity) {
      this.immunityTimerText.domElement.innerText = `Immunity Time: ${Math.floor(
        (10000 - (new Date().getTime() - this.player.immunityTime)) / 1000
      )}`;
    } else {
      this.immunityTimerText.domElement.innerText = "";
    }
    console.log(this.player.immunityTime + 10000 < new Date().getTime());
    if (
      this.player.immunityTime + 10000 < new Date().getTime() &&
      this.player.immunity === true
    ) {
      this.player.immunity = false;
    }
    this.player.changeImage();
    this.ammoText.domElement.innerText = `Ammo: ${this.ammo}`;
    if (this.hitPowerUp() === "ammo") {
      console.log("got ammo");
      this.powerUps.forEach(powerUp => {
        powerUp.removeChild();
      });
      this.powerUps = this.powerUps.filter(powerUp => {
        return !powerUp.destroyed;
      });
      this.ammo++;
      this.ammoText.domElement.innerText = `Ammo: ${this.ammo}`;
    }
    if (this.isPlayerDead() && !this.player.immunity) {
      this.restartGameText = new GameStateText(gameDiv, 220, 240, 1);
      this.state = true;
      return;
    }
    this.printScore.changeScore(this.score);
    setTimeout(this.gameLoop, 20);
  }
}
