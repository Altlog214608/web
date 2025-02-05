const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;
const characterX = canvas.width / 2 - characterWidth / 2;
const characterY = canvas.height - characterHeight - 10;
const characterImage = new Image();
characterImage.src = "src/test2.jpg";
let moveLeft = false;
let moveRight = false;
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveLeft = true;
  }
  if (event.key === "ArrowRight") {
    moveRight = true;
  }
});
function gameLoop() {
  ctx.clearRact(0, 0, canvas.width, canvas.height);
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
