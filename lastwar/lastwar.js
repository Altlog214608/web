const restart_button = document.getElementById("restart_button");
const result_screen = document.getElementById("result_screen");
const result_text = document.getElementById("result_text");
const input = document.getElementById("text_box");
const ranking = document.getElementById("ranking");
const ul = document.getElementById("ul");
let playtime = 0;

window.onload = () => {
  setInterval(() => {
    playtime += 1;
    console.log(playtime);
  }, 1000);
};

restart_button.addEventListener("click", () => {
  location.reload();
});

class Map {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.backgroundImage = new Image();
    this.backgroundImage.src = "src/background1.png";
    this.bulletImage = new Image();
    this.bulletImage.src = "src/redbullet.png";

    this.monsterImages = [
      [new Image(), new Image()],
      [new Image(), new Image()],
    ];

    this.monsterImages[0][0].src = "src/monster1.png";
    this.monsterImages[0][1].src = "src/monster1-1.png";
    this.monsterImages[1][0].src = "src/monster2.png";
    this.monsterImages[1][1].src = "src/monster2-1.png";

    this.playerImage = new Image();
    this.playerImage.src = "src/player.png";

    this.player = new Player(this);
    this.monsters = [];
    this.bullets = [];
    this.items = [];

    this.setupControls();
    this.setMonsters();

    this.backgroundImage.onload = () => {
      this.canvas.width = this.backgroundImage.width;
      this.canvas.height = this.backgroundImage.height;
      this.gameLoop();
    };

    setInterval(() => {
      this.player.attack();
    }, 1000); // 2초 간격으로 공격
  }

  setupControls() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") this.player.moveLeft = true;
      if (event.key === "ArrowRight") this.player.moveRight = true;
    });
    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft") this.player.moveLeft = false;
      if (event.key === "ArrowRight") this.player.moveRight = false;
    });
  }

  setMonsters() {
    setInterval(() => {
      const canvasCenterX = this.canvas.width / 2;
      const minX = canvasCenterX - 170;
      const maxX = canvasCenterX + 150;
      let lane = minX + Math.random() * (maxX - minX); // minX부터 maxX 사이의 랜덤 값
      this.monsters.push(new Monster(this, lane));
    }, 100);
  }

  hitcheck() {
    this.monsters.forEach((monster) => {
      if (
        this.player.x < monster.x + monster.width &&
        this.player.x + this.player.width > monster.x &&
        this.player.y < monster.y + monster.height &&
        this.player.y + this.player.height > monster.y
      ) {
        console.log("hit");
        this.player.hp -= 1;
        this.monsters = this.monsters.filter((m) => m !== monster);
      }
      if (this.player.hp === 0) {
        // alert("Game Over");
        console.log("Game Over");
        result_screen.style.display = "block";
      }
    });

    this.bullets.forEach((bullet) => {
      this.monsters.forEach((monster) => {
        if (
          bullet.x < monster.x + monster.width &&
          bullet.x + bullet.width > monster.x &&
          bullet.y < monster.y + monster.height &&
          bullet.y + bullet.height > monster.y
        ) {
          console.log("bullet hit");
          monster.hit();
          this.bullets = this.bullets.filter((b) => b !== bullet);
        }
      });
    });
  }

  gameLoop() {
    this.update();
    this.render();
    this.hitcheck();

    requestAnimationFrame(() => this.gameLoop()); //계속 호출
  }

  update() {
    this.player.update();
    this.monsters.forEach((monster) => monster.update());
    this.bullets.forEach((bullet) => bullet.update());
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.player.draw();
    this.monsters.forEach((monster) => monster.draw());
    this.bullets.forEach((bullet) => bullet.draw());
  }
}

class Player {
  constructor(map) {
    this.map = map;
    this.x = map.backgroundImage.width / 2 - 25;
    this.y = map.backgroundImage.height - 300;
    this.width = 150;
    this.height = 150;
    this.speed = 4;
    this.moveLeft = false;
    this.moveRight = false;
    this.hp = 3;
  }

  update() {
    if (this.moveLeft && this.x > 0) this.x -= this.speed;
    if (this.moveRight && this.x < this.map.canvas.width - this.width)
      this.x += this.speed;
  }

  attack() {
    const bullet = new Bullet(this.map, this.x + this.width / 2, this.y);
    this.map.bullets.push(bullet);
  }

  draw() {
    // 플레이어 생성
    this.map.ctx.drawImage(
      this.map.playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.map.ctx.fillStyle = "black";
    this.map.ctx.fillRect(this.x, this.y - 6, this.width - 2, 10); // 체력바(길이, 두께)
    this.map.ctx.fillStyle = "green";
    this.map.ctx.fillRect(
      this.x,
      this.y - 6,
      ((this.width - 2) * this.hp) / 3,
      5
    ); // 체력
  }
}

class Bullet {
  constructor(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 80;
    this.speed = 20;
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.map.bullets = this.map.bullets.filter((bullet) => bullet !== this);
    }
  }

  draw() {
    this.map.ctx.drawImage(
      this.map.bulletImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Monster {
  constructor(map, x) {
    this.map = map;
    this.x = x;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.speed = 20;
    this.hp = 3;
    this.type = Math.floor(Math.random() * 2);
    this.imageFrames = this.map.monsterImages[this.type];
    this.frame = 0;

    setInterval(() => {
      this.frame = this.frame === 0 ? 1 : 0;
    }, 300);
  }

  hit() {
    //몬스터 hp
    this.hp -= 1;
    if (this.hp <= 0) {
      this.map.monsters = this.map.monsters.filter(
        (monster) => monster !== this
      );
    }
  }

  update() {
    //몬스터 속도
    this.y += this.speed;
  }

  draw() {
    if (this.y < 50) {
      // 이미지 증가
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.y < 100) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 5,
        this.height + 5
      );
    } else if (this.y < 150) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 10,
        this.height + 10
      );
    } else if (this.y < 200) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 15,
        this.height + 15
      );
    } else {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 20,
        this.height + 20
      );
    }

    this.map.ctx.fillStyle = "black";
    this.map.ctx.fillRect(this.x + 3, this.y - 6, this.width + 3, 5); // 체력바(길이, 두께)
    this.map.ctx.fillStyle = "red";
    this.map.ctx.fillRect(
      this.x + 3,
      this.y - 6,
      ((this.width + 3) * this.hp) / 3,
      5
    ); // 체력 3칸
  }
}

// window.onmousemove = (e) => {
//   console.log(e.offsetX, e.offsetY);
// };

window.onload = () => {
  const start_button = document.getElementById("start_button");
  const start_screen = document.getElementById("start_screen");
  const game_screen = document.getElementById("game_screen");
  let gameset = false;

  start_button.onclick = () => {
    if (start_screen && game_screen && !gameset) {
      start_screen.style.display = "none";
      game_screen.style.display = "block";
      const map = new Map();
      var newli = document.createElement("li");
      newli.innerHTML = "1." + input.value;
      ranking.appendChild(newli);
      gameset = true;
    }
  };
};
