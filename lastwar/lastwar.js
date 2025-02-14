// 김태연 김진범 김동현 , T , J , D

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
let playercount = 1;
let boss_start = 3;

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
  re_start();
  console.log("prev");
});

nextstage.addEventListener("click", () => {
  incNum();
  stageLevel(stageNumber);
  viewstage.innerHTML = stageNumber + " stage";
  re_start();
  console.log("next");
});

class Map {
  constructor() {
    this.canvas = canvas;
    this.ctx = ctx;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "https://ifh.cc/g/Lfj2BB.jpg";
    this.monsterImages = [
      [new Image(), new Image()],
      [new Image(), new Image()],
    ];

    this.monsterImages[0][0].src = "https://ifh.cc/g/XXXhNx.png";
    this.monsterImages[0][1].src = "https://ifh.cc/g/qMdgJB.png";
    this.monsterImages[1][0].src = "https://ifh.cc/g/gM4252.png";
    this.monsterImages[1][1].src = "https://ifh.cc/g/DXvrvf.png";

    this.playerImage = new Image();
    this.playerImage.src = "https://ifh.cc/g/jOTmQs.png";

    this.bossImg = [new Image(), new Image()];
    this.bossImg[0].src = "https://ifh.cc/g/nrtNQH.png";
    this.bossImg[1].src = "https://ifh.cc/g/BgC4hp.png";

    this.players = players;

    this.monsters = [];
    this.bullets = [];
    this.items = [];
    this.boses = [];

    this.attackPowerTimer = null; // 공격력 증가 타이머
    this.attackSpeedTimer = null; // 공격 속도 증가 타이머
    this.attackInterval = 400; // 기본 공격 주기

    this.itemImages = [new Image(), new Image(), new Image()];
    this.itemImages[0].src = "https://ifh.cc/g/JALpYX.png"; //공격력
    this.itemImages[1].src = "https://ifh.cc/g/QH7qqv.png"; //공격속도
    this.itemImages[2].src = "https://ifh.cc/g/oFjDXn.png"; //인구증가

    this.setitems();

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

  setBoss() {
    if (this.boses.length == 0 && playtime == boss_start) {
      this.boses.push(new Boss(this));
    }
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
      const lanes = [this.canvas.width / 2 - 160, this.canvas.width / 2 + 100]; //아이템 등장 좌표 원래+100씩
      const lane2 = lanes[Math.floor(Math.random() * lanes.length)];
      this.items.push(new Item(this, lane2)); //map,좌표
    }, 3000);
  }

  itemscheck() {
    // 3번째 인구증가 아이템
    let temp = 0;
    this.players.forEach((player) => {
      this.items.forEach((item) => {
        // 박스 크기 계산
        let boxWidth = 140; // 기본 박스 크기
        let boxHeight = 130;
        let boxX = item.x - 35; // 기본 위치

        if (item.y >= 0) {
          let boxSize = item.y * 0.25; // y값 증가에 따라 박스 확대
          if (item.x < this.canvas.width / 2) {
            boxX -= boxSize; // 왼쪽 박스 확장
          }
          boxWidth += boxSize; // 오른쪽 확장
        }

        if (
          player.x < item.x + item.width &&
          player.x + player.width > item.x &&
          player.y < item.y + item.height &&
          player.y + player.height > item.y
        ) {
          if (item.type === 2) {
            // 인구수 증가 아이템
            console.log("인구수 증가 아이템 효과 시작");

            // 아이템 숫자만큼 병사 수 변경
            console.log("현재 병사 수: " + playercount);
            if (21 < playercount + item.number) {
              playercount = 21;
            } else {
              playercount += item.number;
            }
            addNewPlayers(item.number);
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
            // 기존 타이머가 있다면 제거
            clearTimeout(Player.attackPowerTimer);
            player.changebullet("https://ifh.cc/g/FScCfs.png");
            player.attackPower = 0.4;

            // 10초 후 원래 상태로 되돌리기
            Player.attackPowerTimer = setTimeout(() => {
              console.log("공격력 증가 아이템 효과 종료");
              player.attackPower = 0.2;
              player.changebullet("https://ifh.cc/g/GqtPq5.png");
            }, 10000);
          } else if (item.type === 1) {
            // 공격 속도 증가 아이템
            console.log("공격 속도 증가 아이템 효과 시작");
            clearTimeout(Player.attackSpeedTimer);
            // 기존 공격 속도 타이머 제거
            clearInterval(Player.attackIntervalTimer);

            // 공격 속도를 증가시켜 총알 발사 속도 조정
            Player.attackInterval = 200;
            Player.attackIntervalTimer = setInterval(() => {
              this.players.forEach((player) => {
                player.attack();
              });
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
          console.log("병사 수 감소: " + playercount);
          this.players = this.players.filter((p) => p !== player);
          // this.players.splice(index, 1);
          players.splice(index, 1);
          maps[0].players = players;

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
    this.bullets.forEach((bullet) => {
      this.items.forEach((item) => {
        let boxWidth = 140;
        let boxHeight = 130;
        let boxX = item.x - 35;

        if (item.y >= 0) {
          let boxSize = item.y * 0.25;

          if (item.x < this.canvas.width / 2) {
            boxX -= boxSize; // 왼쪽 방향으로 확장
          }
          boxWidth += boxSize; // 오른쪽 방향으로 확장
        }

        if (
          bullet.x < boxX + boxWidth && // 박스의 오른쪽 경계
          bullet.x + bullet.width > boxX && // 박스의 왼쪽 경계
          bullet.y < item.y - 30 + boxHeight && // 박스의 아래쪽 경계
          bullet.y + bullet.height > item.y - 30 // 박스의 위쪽 경계
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
          this.bullets = this.bullets.filter((b) => b != bullet); // 총알
        }
      });
    });
    this.bullets.forEach((bullet) => {
      // 총알 hit 보스 => 보스 피격, 총알삭제
      this.boses.forEach((boss) => {
        if (
          bullet.x < boss.x + boss.width / 2 &&
          bullet.x > boss.x - boss.width / 2 &&
          bullet.y < boss.y + boss.height / 2 &&
          bullet.y > boss.y - boss.height / 2
        ) {
          boss.hit(Player.attackPower);
          this.bullets = this.bullets.filter((b) => b !== bullet);
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

      frame += 1;
      if (frame == 60) {
        playtime += 1;
        frame = 0;
      }
    }
    console.log(players);
    console.log(this.players);
    console.log(this.bullets.length);
    loop = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.players.forEach((player) => player.update());
    this.monsters.forEach((monster) => monster.update());
    this.bullets.forEach((bullet) => bullet.update());
    this.items.forEach((item) => item.update());
    if (playtime > boss_start) {
      if (this.boses.length >= 1) {
        this.boses[0].update(); /*this.boses.forEach((boss) =>boss.update());*/
      } //보스
    }
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
    if (playtime >= boss_start) {
      this.setBoss();
    }
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
    this.bulletImage.src = "https://ifh.cc/g/GqtPq5.png"; // 기본 총알 이미지
    this.attackPower = 0.2; //기본 공격력 1
    this.bulletspeed = 15; //총알 속도
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

  stopAttack() {
    clearInterval(this.attackIntervalTimer);
  }

  update() {
    if (this.moveLeft && this.x > 0) this.x -= this.speed;
    if (this.moveRight && this.x < this.map.canvas.width - this.width)
      this.x += this.speed;
  }

  attack() {
    // if (!this.map) return;
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
    this.map.ctx.drawImage(
      this.map.playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
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
    this.speed = 20;
    this.hp = 1 * ratio;
    this.type = Math.floor(Math.random() * 2);
    this.imageFrames = this.map.monsterImages[this.type];
    this.frame = 0;
    this.move = 1;
    this.minXrange = this.x - 10;
    this.maxXrange = this.x + 10;
    this.maxwidth = 200;
    this.maxheight = 200;

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
    } else {
      this.map.ctx.drawImage(
        this.imageFrames[this.frame],
        this.x,
        this.y,
        this.maxwidth,
        this.maxheight
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
    this.width = 100;
    this.height = 100;
    this.speed = 2;
    this.type = Math.floor(Math.random() * 3); // 랜덤으로 아이템 종류 결정
    if (this.type === 0 || this.type === 1) {
      this.number = Math.floor(Math.random() * 4) - 5; // -5부터 -2 사이의 값
    } else {
      this.number = Math.floor(Math.random() * 3) - 5; // -5부터 -3 사이의 값
    }
  }

  itemcount() {
    if (this.number < 10) {
      this.number += 1; // 맞추면 숫자 증가
    }
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
      // 빨간 박스 (0부터 파랑벽)
      this.map.ctx.fillStyle = "rgba(255, 0, 0, 0.2)"; // 반투명 빨강

      let boxWidth = 140; //박스 넓이
      let boxHeight = 130; //박스 높이
      let boxX = this.x - 35; //아이템 에서 박스가 떨어질 위치

      if (this.y >= 0) {
        let boxSize = this.y * 0.25; // y값 1늘어날때마다 0.25씩 커지게
        if (this.x < this.map.canvas.width / 2) {
          boxX -= boxSize; //왼쪽 사이즈 확정
        }
        boxWidth += boxSize; //오른쪽 늘어나는거 확정
      }
      this.map.ctx.fillRect(boxX, this.y - 30, boxWidth, boxHeight);
      this.map.ctx.strokeRect(boxX, this.y - 30, boxWidth, boxHeight);

      this.map.ctx.fillStyle = "white"; //글자 위치 수정
      this.map.ctx.font = "50px gothic";
      if (this.x < this.map.canvas.width / 2) {
        this.map.ctx.fillText(this.number, this.x - 100, this.y + 50);
      } else {
        this.map.ctx.fillText(this.number, this.x + 100, this.y + 50);
      }
    } else {
      // 파란 박스 (아이템 숫자 박스)
      this.map.ctx.fillStyle = "rgba(0, 0, 255, 0.2)"; // 반투명 파랑
      let boxWidth = 140;
      let boxHeight = 130;
      let boxX = this.x - 35;

      if (this.y >= 0) {
        let boxSize = this.y * 0.25; // y값이 증가할수록 박스 커짐
        if (this.x < this.map.canvas.width / 2) {
          boxX -= boxSize; //왼쪽 사이즈 확정
        }
        boxWidth += boxSize; //오른쪽 늘어나는거 확정
      }
      this.map.ctx.fillRect(boxX, this.y - 30, boxWidth, boxHeight);
      this.map.ctx.strokeRect(boxX, this.y - 30, boxWidth, boxHeight);
      this.map.ctx.fillStyle = "white";
      this.map.ctx.font = "50px gothic";

      if (this.x < this.map.canvas.width / 2) {
        // 숫자 표시
        this.map.ctx.fillText(this.number, this.x - 100, this.y + 50);
      } else {
        this.map.ctx.fillText(this.number, this.x + 100, this.y + 50);
      }
    }
  }
}
class Boss {
  constructor(map) {
    this.map = map;
    this.x = canvas.width / 2;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.speed = 1;
    this.damage = 1;
    this.frame = 0;
    this.hp = 5 * ratio;
  }

  draw() {
    if (this.y < 600) {
      this.x = this.x + 0.1; //
      this.width = this.width * 1.002;
      this.height = this.height * 1.002;
    }
    if (this.y > 600) {
      this.x = this.x + (this.map.player.x - this.x) * 0.005;
    }

    if (frame < 30) {
      this.map.ctx.drawImage(
        this.map.bossImg[0],
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      this.map.ctx.drawImage(
        this.map.bossImg[1],
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    this.map.ctx.fillStyle = "black"; //몬스터 체력바 몬스터 좌표 위치에
    this.map.ctx.fillRect(this.x + 3, this.y - 6, this.width + 3, 5);
    this.map.ctx.fillStyle = "red";
    this.map.ctx.fillRect(
      this.x + 3,
      this.y - 6,
      ((this.width + 3) * this.hp) / ratio,
      5
    );
  }

  update() {
    this.y += this.speed;
    console.log(this.y);
  }

  hit(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      console.log("보스 사망");
      this.map.boses = this.map.boses.filter((boss) => boss !== this);
    }
  }

  reset() {
    if (playtime == 0) {
      for (let i = 0; i < this.map.boses.length; i++) {
        this.map.boses.pop();
      }
    }
  }
}

function reset(map) {
  // 모든 공격 타이머 정리
  players.forEach((player) => player.stopAttack());
  maps[0].players.forEach((player) => player.stopAttack());

  // 기존 플레이어 배열 초기화
  players = [];
  maps[0].players = [];

  players.length = 0;
  maps[0].players.length = 0;

  players.splice(0);
  maps[0].players.splice(0);
  maps[0].bullets.splice(0);
  maps[0].monsters.splice(0);
  maps[0].items.splice(0);
  // 총알, 몬스터, 아이템 초기화
  maps[0].bullets = [];
  map.bullets = [];
  map.monsters = [];
  map.items = [];
  map.boses = [];

  // 플레이어 수 1로 설정 후 중앙에서 재생성
  playercount = 1;
  setplayers(playercount);

  score = 0;
  playtime = 0;
  frame = 0;

  cancelAnimationFrame(loop);
  loop = requestAnimationFrame(() => maps[0].gameLoop());
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
  maps[0].bullets = [];
  result_screen.style.display = "none";
  gameset = gameset === true ? false : true;
  // gameset = true;
  if (rename.value != "") {
    playerName = rename.value;
  } else {
    playerName = "None";
  }
}

function setplayers(playercount) {
  players = [];
  maps[0].players = [];
  maps[0].bullets = [];

  let startX = canvas.width / 2 - 60;
  let startY = maps[0].backgroundImage.height - 300;

  for (let i = 0; i < playercount; i++) {
    let x = startX + calc(playercount);
    let y = startY;
    const player = new Player(maps[0], x, y);
    players.push(player);
  }
  maps[0].players = players;
}

function addNewPlayers(count) {
  let startX = canvas.width / 2;
  let startY = maps[0].backgroundImage.height - 300;

  for (let i = 0; i < count; i++) {
    if (i == 0) {
      const player = new Player(maps[0], startX, startY);
      players.push(player);
    } else {
      let x = startX + calc(i);
      const player = new Player(maps[0], x, startY);
      players.push(player);
    }
    players.push(player);
  }

  // 플레이어 재배치
  // repositionPlayers();
}

function repositionPlayers() {
  if (players.length > 21) return;
  const spacingX = 50; // 가로 간격
  const spacingY = 40; // 세로 간격
  const maxRow = 7; // 한 줄에 최대 5명
  const centerX = canvas.width / 2;

  players.forEach((player, index) => {
    const row = Math.floor(index / maxRow); // 줄 번호
    const col = index % maxRow; // 가로 위치
    const startX =
      centerX - ((Math.min(players.length, maxRow) - 1) * spacingX) / 2;
    player.x = startX + col * spacingX;
    player.y = maps[0].backgroundImage.height - 300 + row * spacingY;
  });
}

function calc(i) {
  const space = 50;
  if (i % 5 == 0) {
    return 0;
  } else if (i % 5 == 1) {
    return space;
  } else if (i % 5 == 2) {
    return -space;
  } else if (i % 5 == 3) {
    return space * 2;
  } else if (i % 5 == 4) {
    return -space * 2;
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
