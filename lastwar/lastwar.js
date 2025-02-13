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
  // location.reload();
  re_start();
  console.log("restart");
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
  console.log("prev");
});

nextstage.addEventListener("click", () => {
  incNum();
  stageLevel(stageNumber);
  viewstage.innerHTML = stageNumber + " stage";
  // reset(maps[0]);
  re_start();
  console.log("next");
});

class Map {
  constructor() {
    this.canvas = canvas;
    this.ctx = ctx;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "src/background1.png";
    // this.playercount = 3;

    // this.bulletImage = new Image();
    // this.bulletImage.src = "src/redbullet.png";

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

    // this.setplayers(this.playercount);

    this.players = players;
    // this.players.push = this.player;
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

    this.mobInterval = monsterInterval;
    this.setupControls();
    this.setMonsters(this.mobInterval);

    this.backgroundImage.onload = () => {
      this.canvas.width = this.backgroundImage.width;
      this.canvas.height = this.backgroundImage.height;
      this.gameLoop();
    };

    // setInterval(() => {
    //   this.player.attack();
    // }, 1000); // 2초 간격으로 공격

    // this.attackIntervalTimer = setInterval(() => {
    //   this.player.attack();
    // }, this.attackInterval);
  }

  // setplayers(playercount) {
  //   for (let i = 0; i < playercount; i++) {
  //     this.player = new Player(this);
  //     players[i].push(player);
  //     console.log(players);
  //   }
  // }

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

            Player.charcters += item.number; // 아이템 숫자만큼 병사 수 변경
            console.log("현재 병사 수: " + Player.charcters);
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
                player.attack();
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
          // this.player.hp -= 1;
          Player.charcters -= 1;
          console.log("병사 수 감소: " + Player.charcters);
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

    if (Player.charcters <= 0) {
      console.log(gameset);
      game(gameset);
      console.log(gameset);
      console.log("?");
    }
  }

  gameLoop() {
    if (gameset == true) {
      this.update();
      this.render();
      this.hitcheck();
      this.itemscheck(); //인구수 증가 아이템 체크
      this.itemscheck2(); //공격력,공격속도 아이템 체크

      frame += 1;
      if (frame == 60) {
        playtime += 1;
        frame = 0;
      }
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
  static charcters = 1;
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
    this.bulletspeed = 5; //총알 속도
    this.charcters_x_size = [];
    this.attackPowerTimer = null; // 공격력 증가 타이머
    this.attackSpeedTimer = null; // 공격 속도 증가 타이머
    this.attackInterval = 400;

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
    if (this.moveRight && this.x < this.map.canvas.width - this.width)
      this.x += this.speed;
  }

  attack() {
    const bullet = new Bullet(
      this.map,
      this.x + this.width / 2,
      this.y,
      this.bulletImage,
      this.bulletspeed
    );
    this.map.bullets.push(bullet);
  }

  newbullet() {
    const bullet = new Bullet(
      this.map,
      this.x + this.width / 2,
      this.y,
      this.bulletImage,
      this.bulletspeed
    );
  }

  changebullet(newbullet) {
    //공격아이템 획득하면 이미지 변경
    players.forEach((player) => {
      player.bulletImage.src = newbullet;
    });
  }

  // calc(i) {
  //   if (i % 5 == 0) {
  //     return 0;
  //   } else if (i % 5 == 1) {
  //     return 60;
  //   } else if (i % 5 == 2) {
  //     return -60;
  //   } else if (i % 5 == 3) {
  //     return 120;
  //   } else if (i % 5 == 4) {
  //     return -120;
  //   }
  // }

  calc2(charcters) {
    if (charcters % 5 == 1) {
      this.charcters_x_size[0] = [this.x - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width / 2];
    } else if (charcters % 5 == 2) {
      this.charcters_x_size[0] = [this.x - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width + this.width / 2];
    } else if (charcters % 5 == 3) {
      this.charcters_x_size[0] = [this.x - this.width - this.width / 2];
      this.charcters_x_size[1] = [this.x + this.width + this.width / 2];
    } else if (charcters % 5 == 4) {
      this.charcters_x_size[0] = [this.x - this.width - this.width / 2];
      this.charcters_x_size[1] = [
        this.x + this.width + this.width + this.width / 2,
      ];
    } else if (charcters % 5 == 0) {
      this.charcters_x_size[0] = [
        this.x - this.width - this.width - this.width / 2,
      ];
      this.charcters_x_size[1] = [
        this.x + this.width + this.width + this.width / 2,
      ];
    }
  }

  draw() {
    // for (let i = 0; i < playercount; i++) {
    // let y = Math.floor( / 3) * 40;
    this.map.ctx.drawImage(
      this.map.playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  // }
}

class Bullet {
  constructor(map, x, y, image) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 80;
    this.speed = 20;
    this.image = image;
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.map.bullets = this.map.bullets.filter((bullet) => bullet !== this);
    }
  }

  draw() {
    players.forEach((player) => {
      this.map.ctx.drawImage(
        player.bulletImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
    });
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
    //몬스터 hp
    this.hp -= damage;
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
    const centerX = canvas.width / 2;
    if (this.x > centerX - 100 && this.x < centerX + 20) {
      this.x += 0;
    } else if (this.x < centerX - 100) {
      this.x -= 0.1;
    } else if (this.x > centerX + 20) {
      this.x += 0.1;
    }

    // if (this.y < 1500) {
    //   if (this.x >= this.maxXrange) {
    //     this.move = -1;
    //     this.maxXrange = Math.min(
    //       this.map.canvas.width - this.width,
    //       this.maxXrange + 30
    //     );
    //   } else if (this.x <= this.minXrange) {
    //     this.move = 1;
    //     this.minXrange = Math.max(0, this.minXrange - 60);
    //   }
    // } else {
    //   if (this.x <= this.map.player.PosX) {
    //     this.move = 1;
    //   } else if (this.x >= this.map.player.PosX) {
    //     this.move = -1;
    //   }
    // }
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
// window.onmousemove = (e) => {
//   console.log(e.offsetX, e.offsetY);
// };

function reset(map) {
  map.bullets = [];
  map.monsters = [];
  map.items = [];
  players = [];
  playercount = 1;
  setplayers(playercount);
  // map.player.x = map.canvas.width / 2 - map.player.width / 2;
  // map.player.y = map.canvas.height - map.player.height - 10;

  score = 0;
  playtime = 0;
  frame = 0;
  // Player.charcters = 1;
  // cancelAnimationFrame(loop);
}

function stageLevel(num) {
  // ratio = ratio * num;
  ratio = 3 * num;
  monsterInterval = 700 - num * 100;
  // boss.hp = boss.hp * ratio * 2;
  maps.forEach((map) => {
    map.setMonsters(monsterInterval);
  });
}

function re_start() {
  reset(maps[0]);
  result_screen.style.display = "none";
  gameset = gameset === true ? false : true;
  // gameset = true;
  if (rename.value != "") {
    playerName = rename.value;
  } else {
    playerName = "None";
  }
  // maps[0].gameLoop();
}

function setplayers(playercount) {
  let startX = canvas.width / 2 + 350;
  let startY = maps[0].backgroundImage.height - 300;
  for (let i = 0; i < playercount; i++) {
    // let x = startX + calc(i);
    // let y = startY + Math.floor(i / 3) * 40;
    // if (i == 0) {
    //   const player = new Player(maps[0], startX, startY);
    //   players.push(player);
    // } else {
    //   const player = new Player(maps[0], x, y);
    //   players.push(player);
    // }
    let x = startX + calc(i);
    let y = startY + Math.floor(i / 3) * 40;
    const player = new Player(maps[0], x, y);
    players.push(player);
  }
}

function calc(i) {
  if (i % 5 == 0) {
    return 0;
  } else if (i % 5 == 1) {
    return 60;
  } else if (i % 5 == 2) {
    return -60;
  } else if (i % 5 == 3) {
    return 120;
  } else if (i % 5 == 4) {
    return -120;
  }
}
function game(state) {
  if (state == false) {
    start_screen.style.display = "none";
    game_screen.style.display = "block";
    result_screen.style.display = "none";

    stageLevel(stageNumber);
    viewstage.innerHTML = stageNumber + " stage";
    console.log(players);
    const map = new Map();
    maps.push(map);
    setplayers(playercount);
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
    console.log(rankingList);
    console.log(gameset);
  }
}

function decNum() {
  if (stageNumber > 1) {
    stageNumber -= 1;
    level_number.innerHTML = stageNumber;
    console.log(stageNumber);
  } else {
    stageNumber = 1;
    level_number.innerHTML = stageNumber;
    console.log(stageNumber);
  }
}
function incNum() {
  if (stageNumber < 5) {
    stageNumber += 1;
    level_number.innerHTML = stageNumber;
    console.log(stageNumber);
  } else {
    stageNumber = 5;
    level_number.innerHTML = stageNumber;
    console.log(stageNumber);
  }
}
window.onload = () => {
  start_button.onclick = () => {
    if (input.value != "") {
      console.log(input.value);
      playerName = input.vlaue;
      // console.log(playerName);
      console.log(players);
      rankingList.push(playerName);
    } else {
      playerName = "None";
      // console.log(playerName);
      rankingList.push(playerName);
    }
    game(false);
    gameset = true;
  };
};
