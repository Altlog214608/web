const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "src/background1.png";

const characterImage = new Image();
characterImage.src = "src/player.png";
const characterWidth = 20;
const characterHeight = 20;
let characterX = canvas.width / 2 - characterWidth / 2;
let characterY = canvas.height - characterHeight - 10; // 캐릭터의 Y 위치 설정
let moveLeft = false;
let moveRight = false;
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
    characterX -= 5;
  }
  if (moveRight && characterX < canvas.width - characterWidth) {
    characterX += 5;
  }
  // if (isJumping) {
  //   characterY += velocityY;
  //   velocityY += gravity;
  //   if (characterY >= canvas.height - characterHeight - 10) {
  //     characterY = canvas.height - characterHeight - 10;
  //     isJumping = false;
  //     velocityY = 0;
  //   }
  // }

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
  characterImage.onload = function () {
    gameLoop();
  };
};
