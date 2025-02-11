const restart_button = document.getElementById("restart_button");
const result_screen = document.getElementById("result_screen");
const result_text = document.getElementById("result_text");
const input = document.getElementById("text_box");
const ranking = document.getElementById("ranking");
const ul = document.getElementById("ul");
const rankingList = [];
let frame = 0;
let playtime = 0;
let score = 0;
let gameset = false;

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

    if (this.player.hp === 0) {
      result_screen.style.display = "block";
      var newli = document.createElement("li");
      newli.innerHTML = "1." + input.value + " " + playtime + "초 생존";
      ranking.appendChild(newli);
      rankingList.push(input.value);
      // game(gameset);
    }
  }

  gameLoop() {
    this.update();
    this.render();
    this.hitcheck();

    frame += 1;
    if (frame == 60) {
      playtime += 1;
      frame = 0;
    }

    let loop = requestAnimationFrame(() => this.gameLoop()); //계속 호출
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
    this.width = 120;
    this.height = 120;
    this.speed = 4;
    this.moveLeft = false;
    this.moveRight = false;
    this.hp = 3;
  }

  get PosX() {
    return this.x;
  }

  get PosY() {
    return this.y;
  }

  get Position() {
    return this.x, this, y;
  }

  update() {
    if (this.moveLeft && this.x > 0) this.x -= this.speed;
    if (this.moveRight && this.x < this.map.canvas.width - this.width)
      this.x += this.speed;
    // console.log(this.getPosX());
    // console.log(this.getPosY());
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
    this.move = 1;
    this.minXrange = this.x - 10;
    this.maxXrange = this.x + 10;

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
      score += 20;
    }
  }

  update() {
    //몬스터 속도
    this.y += this.speed;
    this.monstermove();
  }

  monstermove() {
    this.x += this.move;
    if (this.y < 1500) {
      if (this.x >= this.maxXrange) {
        this.move = -1;
        this.maxXrange += 30;
      } else if (this.x <= this.minXrange) {
        this.move = 1;
        this.minXrange -= 50;
      }
    } else {
      if (this.x <= this.map.player.PosX) {
        this.move = 1;
      } else if (this.x >= this.map.player.PosX) {
        this.move = -1;
      }
    }
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
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
    } else if (this.y < 150) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 15,
        this.height + 15
      );
    } else if (this.y < 250) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 30,
        this.height + 30
      );
    } else if (this.y < 400) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 45,
        this.height + 45
      );
    } else {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.width + 60,
        this.height + 60
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

function game(gameset) {
  if (start_screen && game_screen && !gameset) {
    start_screen.style.display = "none";
    game_screen.style.display = "block";
    const map = new Map();

    gameset = true;
  } else if (gameset == false) {
    cancelAnimationFrame(loop);
    console.log(playtime);
    console.log("Game Over");
    result_screen.style.display = "block";
    var newli = document.createElement("li");
    newli.innerHTML = "1." + input.value + " " + playtime + "초 생존";
    ranking.appendChild(newli);
    rankingList.push(input.value);
  }
}

window.onload = () => {
  const start_button = document.getElementById("start_button");
  const start_screen = document.getElementById("start_screen");
  const game_screen = document.getElementById("game_screen");

  start_button.onclick = () => {
    // game(gameset);
    if (start_screen && game_screen && !gameset) {
      start_screen.style.display = "none";
      game_screen.style.display = "block";
      const map = new Map();
      gameset = true;
    }
  };
};
