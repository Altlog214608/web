const restart_button = document.getElementById("restart_button");
const result_screen = document.getElementById("result_screen");
const result_text = document.getElementById("result_text");
const input = document.getElementById("text_box");
const ranking = document.getElementById("ranking");
const ul = document.getElementById("ul");
const start_button = document.getElementById("start_button");
const start_screen = document.getElementById("start_screen");
const game_screen = document.getElementById("game_screen");
const stop_btn = document.getElementById("stop_btn");
const restart = document.getElementById("restart");
const canvas = document.getElementById("gameCanvas");
const reset_btn = document.getElementById("reset_btn");
const ctx = canvas.getContext("2d");
const rename = document.getElementById("rename");
const level_number = document.getElementById("level_number");
const left_btn = document.getElementById("left_btn");
const right_btn = document.getElementById("right_btn");
const prevstage = document.getElementById("prevstage");
const nextstage = document.getElementById("nextstage");
const viewstage = document.getElementById("viewstage");

let rankingList = [];
let players = [];
let maps = [];
let frame = 0;
let playtime = 0;
let score = 0;
let gameset = false;
let loop;
let playerNumber = 1;
let playerName;
let ratio = 1;
let monsterInterval = 0;
let stageNumber = 1;
let playercount = 5;

restart_button.addEventListener("click", () => {
  re_start();
});

restart.addEventListener("click", () => {
  location.reload();
});

stop_btn.addEventListener("click", () => {
  gameset = gameset === true ? false : true;
});

reset_btn.addEventListener("click", () => {
  reset(maps[0]);
});

left_btn.addEventListener("click", () => {
  decNum();
});

right_btn.addEventListener("click", () => {
  incNum();
});

prevstage.addEventListener("click", () => {
  decNum();
  stageLevel(stageNumber);
  viewstage.innerHTML = stageNumber + " stage";
  // reset(maps[0]);
  re_start();
});

nextstage.addEventListener("click", () => {
  incNum();
  stageLevel(stageNumber);
  viewstage.innerHTML = stageNumber + " stage";
  // reset(maps[0]);
  re_start();
});

class Map {
  constructor() {
    this.canvas = canvas;
    this.ctx = ctx;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "src/background1.png";

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

    this.players = [];
    this.monsters = [];
    this.bullets = [];
    this.items = [];

    this.attackPowerTimer = null; // 공격력 증가 타이머
    this.attackSpeedTimer = null; // 공격 속도 증가 타이머
    this.attackInterval = 400; // 기본 공격 주기

    this.itemImages = [new Image(), new Image(), new Image()];
    this.itemImages[0].src = "src/item1.png"; //공격력
    this.itemImages[1].src = "src/item2.png"; //공격속도
    this.itemImages[2].src = "src/item3.png"; //인구수증가

    this.setitems();
    this.setplayers(playercount);

    this.mobInterval = monsterInterval;
    this.setupControls();
    this.setMonsters(this.mobInterval);

    this.backgroundImage.onload = () => {
      this.canvas.width = this.backgroundImage.width;
      this.canvas.height = this.backgroundImage.height;
      this.gameLoop();
    };
  }

  setupControls() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft")
        this.players.forEach((player) => {
          player.moveLeft = true;
        });
      if (event.key === "ArrowRight")
        this.players.forEach((player) => {
          player.moveRight = true;
        });
    });
    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft")
        this.players.forEach((player) => {
          player.moveLeft = false;
        });
      if (event.key === "ArrowRight")
        this.players.forEach((player) => {
          player.moveRight = false;
        });
    });
  }

  setMonsters(mobInterval) {
    if (this.monsterIntervalId) {
      clearInterval(this.monsterIntervalId);
    }
    this.monsterIntervalId = setInterval(() => {
      if (gameset == true) {
        const canvasCenterX = this.canvas.width / 2;
        const minX = canvasCenterX - 170;
        const maxX = canvasCenterX + 150;
        let lane = minX + Math.random() * (maxX - minX); // minX부터 maxX 사이의 랜덤 값
        this.monsters.push(new Monster(this, lane));
      }
    }, mobInterval);
  }

  setitems() {
    setInterval(() => {
      const lanes = [320, 830];
      const lane2 = lanes[Math.floor(Math.random() * lanes.length)];
      this.items.push(new Item(this, lane2)); //map,좌표
    }, 5000);
  }

  setplayers(playercount) {
    this.players = [];
    let startX = canvas.width / 2 + 350;
    let startY = this.backgroundImage.height - 300;
    for (let i = 0; i < playercount; i++) {
      let x = startX + calc(playercount);
      let y = startY + Math.floor(i / 5) * 40;
      const player = new Player(this, x, y);
      this.players.push(player);
    }
  }

  itemscheck() {
    // 3번째 인구증가 아이템
    this.players.forEach((player) => {
      this.items.forEach((item) => {
        if (
          player.x < item.x + item.width &&
          player.x + player.width > item.x &&
          player.y < item.y + item.height &&
          player.y + player.height > item.y
        ) {
          if (item.type === 2) {
            // 인구수 증가 아이템
            console.log("인구수 증가 아이템 효과 시작");

            playercount += item.number; // 아이템 숫자만큼 병사 수 변경
            this.setplayers(playercount);
            console.log("현재 병사 수: " + playercount);
            this.items = this.items.filter((i) => i !== item); // 아이템 제거
          }
        }
      });
    });
  }

  itemscheck2() {
    this.players.forEach((player) => {
      this.items.forEach((item) => {
        if (item.number >= 1 && item.type !== 2) {
          // 아이템의 숫자가 1 이상이고, 인구 증가 아이템이 아닐 때

          if (item.type === 0) {
            //  공격력 증가 아이템
            console.log("공격력 증가 아이템 효과 시작");
            player.changebullet("src/bluebullet.png");
            player.attackPower = 2;

            // 기존 타이머가 있다면 제거
            clearTimeout(Player.attackPowerTimer);

            // 10초 후 원래 상태로 되돌리기
            Player.attackPowerTimer = setTimeout(() => {
              console.log("공격력 증가 아이템 효과 종료");
              player.attackPower = 1;
              player.changebullet("src/redbullet.png");
            }, 10000);
          } else if (item.type === 1) {
            // 공격 속도 증가 아이템
            console.log("공격 속도 증가 아이템 효과 시작");

            // 기존 공격 속도 타이머 제거
            clearInterval(this.attackIntervalTimer);

            // 공격 속도를 증가시켜 총알 발사 속도 조정
            Player.attackInterval = 100;
            Player.attackIntervalTimer = setInterval(() => {
              player.attack();
            }, Player.attackInterval);

            // 10초 후 공격 속도를 원래대로 되돌림
            clearTimeout(Player.attackSpeedTimer);
            Player.attackSpeedTimer = setTimeout(() => {
              console.log("공격 속도 증가 아이템 효과 종료");
              clearInterval(Player.attackIntervalTimer);
              Player.attackInterval = 400;
              Player.attackIntervalTimer = setInterval(() => {
                this.players.forEach((player) => {
                  player.attack();
                });
              }, Player.attackInterval);
            }, 10000);
          }

          //  아이템 효과 적용 후 리스트에서 제거
          this.items = this.items.filter((i) => i !== item);
        }
      });
    });
  }

  hitcheck() {
    this.players.forEach((player) => {
      this.monsters.forEach((monster) => {
        if (
          player.x < monster.x + monster.width &&
          player.x + player.width > monster.x &&
          player.y < monster.y + monster.height &&
          player.y + player.height > monster.y
        ) {
          console.log("hit");
          playercount -= 1;
          this.monsters = this.monsters.filter((m) => m !== monster);
        }
      });
    });
    this.players.forEach((player) => {
      this.bullets.forEach((bullet) => {
        this.monsters.forEach((monster) => {
          if (
            bullet.x < monster.x + monster.width &&
            bullet.x + bullet.width > monster.x &&
            bullet.y < monster.y + monster.height &&
            bullet.y + bullet.height > monster.y
          ) {
            monster.hit(player.attackPower);
            this.bullets = this.bullets.filter((b) => b !== bullet);
          }
        });
      });
    });
    // 총알과 아이템의 충돌 처리
    this.bullets.forEach((bullet, index) => {
      this.items.forEach((item) => {
        if (
          bullet.x < item.x - 40 + 130 && // 아이템 x + 아이템 너비
          bullet.x + bullet.width > item.x - 40 && // 총알 x + 총알 너비 > 아이템 x
          bullet.y < item.y + 50 && // 아이템 y + 아이템 높이
          bullet.y + bullet.height > item.y // 총알 y + 총알 높이 > 아이템 y
        ) {
          console.log("bullet item hit");
          if (item.type === 0) {
            item.itemcount(); // 아이템 숫자 증가
          } else if (item.type === 1) {
            item.itemcount(); // 숫자 증가
          } else if (item.type === 2) {
            // 인구수 증가 아이템
            item.itemcount(); // 숫자 증가
          }
          this.bullets.splice(index, 1); // forEach에 맞는 위치 1개 삭제 (아이템 그대로 유지,안쓰면 관통 )
        }
      });
    });

    if (playercount <= 0) {
      game(gameset);
    }
  }

  gameLoop() {
    if (gameset == true) {
      this.update();
      this.render();
      this.hitcheck();
      this.itemscheck(); //인구수 증가 아이템 체크
      this.itemscheck2(); //공격력,공격속도 아이템 체크
      //this.player.calc2(Player.charcters);

      frame += 1;
      if (frame == 60) {
        playtime += 1;
        frame = 0;
      }
      console.log(this.players);
      console.log(playercount);
    }
    loop = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.players.forEach((player) => player.update());
    this.monsters.forEach((monster) => monster.update());
    this.bullets.forEach((bullet) => bullet.update());
    this.items.forEach((item) => item.update());
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
    this.players.forEach((player) => player.draw());
    this.monsters.forEach((monster) => monster.draw());
    this.bullets.forEach((bullet) => bullet.draw());
    this.items.forEach((item) => item.draw());
  }
}

class Player {
  constructor(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 120;
    this.speed = 4;
    this.moveLeft = false;
    this.moveRight = false;
    this.bulletImage = new Image(); // Image 객체 생성
    this.bulletImage.src = "src/redbullet.png"; // 기본 총알 이미지
    this.attackPower = 1; //기본 공격력 1
    this.bulletspeed = 20; //총알 속도
    this.charcters_x_size = [];
    this.attackPowerTimer = null; // 공격력 증가 타이머
    this.attackSpeedTimer = null; // 공격 속도 증가 타이머
    this.attackInterval = 400;
    this.space = 60;

    this.attackIntervalTimer = setInterval(() => {
      this.attack();
    }, this.attackInterval);
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
    if (this.moveRight && this.x < maps[0].canvas.width - this.width)
      this.x += this.speed;
  }

  attack() {
    const bullet = new Bullet(
      maps[0],
      this.x + this.width / 2,
      this.y,
      this.bulletImage,
      this.bulletspeed
    );
    maps[0].bullets.push(bullet);
  }

  changebullet(newbullet) {
    players.forEach((player) => {
      player.bulletImage.src = newbullet;
    });
  }

  calc2(charcters) {
    console.log(this.x);
    if (charcters >= 7) {
      this.charcters_x_size[0] = [
        this.x - this.width / 2 - this.width / 2 - this.width / 2,
      ];
      this.charcters_x_size[1] = [
        this.x + this.width / 2 + this.width / 2 + this.width / 2,
      ];
    } else if (charcters % 7 == 6) {
      this.charcters_x_size[0] = [this.x - this.width / 2 - this.width / 2];
      this.charcters_x_size[1] = [
        this.x + this.width / 2 + this.width / 2 + this.width / 2,
      ];
    } else if (charcters % 7 == 5) {
      this.charcters_x_size[0] = [this.x - this.width / 2 - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width / 2 + this.width / 2];
    } else if (charcters % 7 == 4) {
      this.charcters_x_size[0] = [this.x - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width / 2 + this.width / 2];
    } else if (charcters % 7 == 3) {
      this.charcters_x_size[0] = [this.x - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width / 2];
    } else if (charcters % 7 == 2) {
      this.charcters_x_size[0] = [this.x - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width / 2];
    } else if (charcters % 7 == 1) {
      this.charcters_x_size[0] = [this.x - this.width / 2]; //캐릭터 왼쪽
      this.charcters_x_size[1] = [this.x + this.width / 2]; // 캐릭터 오른족
    }
  }

  draw() {
    maps[0].ctx.drawImage(
      maps[0].playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Bullet {
  constructor(map, x, y, image, speed) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 80;
    // this.speed = 50;
    this.image = image;
    this.speed = speed;
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.map.bullets = this.map.bullets.filter((bullet) => bullet !== this);
    }
  }

  draw() {
    this.map.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    // players.forEach((player) => {
    // });
  }
}

class Monster {
  constructor(map, x) {
    this.map = map;
    this.x = x;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.speed = 1;
    this.hp = 1 * ratio;
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

  hit(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.map.monsters = this.map.monsters.filter(
        (monster) => monster !== this
      );
      score += 20;
    }
  }

  update() {
    this.y += this.speed;
    this.monstermove();
  }

  monstermove() {
    const centerX = canvas.width / 2;
    // const randomSpeed = Math.random() * 0.5 + 0.1;
    if (this.x > centerX - 100 && this.x < centerX + 20) {
      this.x += 0;
    } else if (this.x < centerX - 100) {
      this.x -= 0.1;
    } else if (this.x > centerX + 20) {
      this.x += 0.1;
    }
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }

  draw() {
    if (this.y < 1500) {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        (this.width += 0.1),
        (this.height += 0.1)
      );
    }
    this.map.ctx.fillStyle = "black";
    this.map.ctx.fillRect(this.x + 3, this.y - 6, this.width + 3, 5); // 체력바(길이, 두께)
    this.map.ctx.fillStyle = "red";
    this.map.ctx.fillRect(
      this.x + 3,
      this.y - 6,
      ((this.width + 3) * this.hp) / ratio,
      5
    ); // 체력 3칸
  }
}

class Item {
  constructor(map, x) {
    this.map = map;
    this.x = x;
    this.y = 0;
    this.width = 70;
    this.height = 50;
    this.speed = 5;
    this.type = Math.floor(Math.random() * 3); // 랜덤으로 아이템 종류 결정
    if (this.type === 0 || this.type === 1) {
      this.number = Math.floor(Math.random() * 4) - 5; // -5부터 -2 사이의 값
    } else {
      this.number = Math.floor(Math.random() * 3) - 5; // -5부터 -3 사이의 값
    }
  }

  itemcount() {
    this.number += 1; // 맞추면 숫자 증가
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    // 아이템 이미지
    this.map.ctx.drawImage(
      this.map.itemImages[this.type],
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.number <= -1) {
      //0부터 파랑벽으로
      this.map.ctx.fillStyle = "rgba(255, 0, 0, 0.1)"; //rgb 반투명 빨강
      this.map.ctx.fillRect(this.x - 40, this.y, 130, 50); //this는 아이템좌표 ,옆에는 그리기
      this.map.ctx.strokeRect(this.x - 40, this.y, 130, 50); //테두리
      // 숫자 표시
      this.map.ctx.fillStyle = "white";
      this.map.ctx.font = "20px gothic";
      this.map.ctx.fillText(this.number, this.x + 20, this.y + 30);
    } else {
      // 아이템 숫자 박스
      this.map.ctx.fillStyle = "rgba(0, 0, 255, 0.1)"; //rgb 반투명 파랑
      this.map.ctx.fillRect(this.x - 40, this.y, 130, 50);
      // 숫자 표시
      this.map.ctx.fillStyle = "white";
      this.map.ctx.font = "20px gothic";
      this.map.ctx.fillText(this.number, this.x + 20, this.y + 30);
    }
  }
}

function reset(map) {
  map.bullets = [];
  map.monsters = [];
  map.items = [];
  players = [];
  playercount = 1;
  score = 0;
  playtime = 0;
  frame = 0;
}

function stageLevel(num) {
  ratio = 3 * num;
  monsterInterval = 700 - num * 100;
  maps.forEach((map) => {
    map.setMonsters(monsterInterval);
  });
}

function re_start() {
  reset(maps[0]);
  result_screen.style.display = "none";
  gameset = gameset === true ? false : true;
  if (rename.value != "") {
    playerName = rename.value;
  } else {
    playerName = "None";
  }
  maps[0].setplayers(playercount);
}

// function setplayers(playercount) {
//   players = [];
//   let startX = canvas.width / 2 + 350;
//   let startY = maps[0].backgroundImage.height - 300;
//   for (let i = 0; i < playercount; i++) {
//     // players = [];
//     let x = startX + calc(i);
//     let y = startY + Math.floor(i / 5) * 40;
//     const player = new Player(maps[0], x, y);
//     players.push(player);
//     console.log(players);
//   }
//   return players;
// }

function calc(i) {
  if (i % 7 == 0) {
    return 0;
  } else if (i % 7 == 1) {
    return this.space;
  } else if (i % 7 == 2) {
    return -this.space;
  } else if (i % 7 == 3) {
    return this.space * 2;
  } else if (i % 7 == 4) {
    return -this.space * 2;
  } else if (i % 7 == 5) {
    return this.space * 3;
  } else if (i % 7 == 6) {
    return -this.space * 3;
  }
}

function game(state) {
  if (state == false) {
    start_screen.style.display = "none";
    game_screen.style.display = "block";
    result_screen.style.display = "none";

    stageLevel(stageNumber);
    viewstage.innerHTML = stageNumber + " stage";
    const map = new Map();
    maps.push(map);
  } else if (state == true) {
    gameset = false;
    result_screen.style.display = "block";
    var newli = document.createElement("li");
    newli.innerHTML =
      playerNumber +
      ". " +
      playerName +
      "\t" +
      stageNumber +
      "stage \t" +
      playtime +
      "초 \t" +
      score +
      "점";
    ranking.appendChild(newli);
    playerNumber += 1;
  }
}

function calc(i) {
  const space = 60;
  if (i % 7 == 0) {
    return 0;
  } else if (i % 7 == 1) {
    return space;
  } else if (i % 7 == 2) {
    return space;
  } else if (i % 7 == 3) {
    return space * 2;
  } else if (i % 7 == 4) {
    return space * 2;
  } else if (i % 7 == 5) {
    return space * 3;
  } else if (i % 7 == 6) {
    return space * 3;
  }
}

function decNum() {
  if (stageNumber > 1) {
    stageNumber -= 1;
    level_number.innerHTML = stageNumber;
  } else {
    stageNumber = 1;
    level_number.innerHTML = stageNumber;
  }
}
function incNum() {
  if (stageNumber < 5) {
    stageNumber += 1;
    level_number.innerHTML = stageNumber;
  } else {
    stageNumber = 5;
    level_number.innerHTML = stageNumber;
  }
}
window.onload = () => {
  start_button.onclick = () => {
    if (input.value != "") {
      playerName = input.value;
      rankingList.push(playerName);
    } else {
      playerName = "None";
      rankingList.push(playerName);
    }
    game(false);
    gameset = true;
  };
};
