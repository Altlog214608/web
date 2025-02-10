const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const title = document.getElementById("title");
const startButton = document.getElementById("start_button");

if (startButton) {
  startButton.addEventListener("click", () => {
    console.log("Game Start!");
    if (title) {
      title.style.display = "none";
    }
  });
}

const img = new Image();
img.src = "src/background1.png";

if (title) {
  title.style.backgroundSize = "img.width img.height";
}

const characterImage = new Image();
characterImage.src = "src/player.png";
const characterWidth = 100;
const characterHeight = 100;
let characterX = canvas.width / 2 - characterWidth / 2;
let characterY = img.height - characterHeight - 300; // 캐릭터의 Y 위치 설정
let moveLeft = false;
let moveRight = false;

const deadLine = characterX - 200;

// let isJumping = false;
// let velocityY = 0;
// const gravity = 0.5;
// const jumpPower = -10;

function render() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    characterImage,
    characterX,
    characterY,
    characterWidth,
    characterHeight
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render(); // 배경과 캐릭터를 그립니다.

  if (moveLeft && characterX > 0) {
    characterX -= 8;
  }
  if (moveRight && characterX < canvas.width - characterWidth) {
    characterX += 8;
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveLeft = true;
  }
  if (event.key === "ArrowRight") {
    moveRight = true;
  }
});

window.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft") {
    moveLeft = false;
  }
  if (event.key === "ArrowRight") {
    moveRight = false;
  }
});

// 이미지 로드 완료 시 게임 루프 시작
img.onload = function () {
  // 캔버스 크기를 이미지 크기에 맞게 조정
  canvas.width = img.width;
  canvas.height = img.height;

  characterImage.onload = function () {
    gameLoop();
  };
};

canvas.onmousemove = function (e) {
  console.log(e.offsetX, e.offsetY);
};
