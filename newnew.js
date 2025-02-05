const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;
const characterWidth = 50;
const characterHeight = 50;
const gravity = 0.5;
const jumpPower = -12;
let velocityY = 0;
let isJumping = false;
let characterX = canvas.width / 2 - characterWidth / 2;
const characterY = canvas.height - characterHeight - 10;
const characterImage = new Image();
characterImage.src = "src/123.png";
let moveLeft = false;
let moveRight = false;
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveLeft = true;
    console.log(event.key);
  }
  if (event.key === "ArrowRight") {
    moveRight = true;
    console.log(event.key);
  }
  if (event.key === "ArrowUp" && !isJumping) {
    velocityY = jumpPower;
    isJumping = true;
    console.log(event.key);
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

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (moveLeft && characterX > 0) {
    characterX -= 5;
  }
  if (moveRight && characterX < canvas.width - characterWidth) {
    characterX += 5;
  }
  ctx.drawImage(
    characterImage,
    characterX,
    characterY,
    characterWidth,
    characterHeight
  );
  requestAnimationFrame(gameLoop);
}
characterImage.onload = function () {
  gameLoop();
};
