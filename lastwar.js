const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 사다리꼴 모양의 맵을 그리는 함수
function drawMap() {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const roadTopWidth = canvasWidth * 0.4; // 위쪽 도로 너비 (전체 너비의 40%)
  const roadHeight = canvasHeight; // 도로 높이는 캔버스 높이에 맞게

  ctx.fillStyle = "#b0b0b0"; // 회색 도로
  ctx.beginPath();
  // 위쪽 도로 좌측
  ctx.moveTo((canvasWidth - roadTopWidth) / 2, 0);
  // 위쪽 도로 우측
  ctx.lineTo((canvasWidth + roadTopWidth) / 2, 0);
  // 아래쪽 도로 우측 (가로 꽉 채움)
  ctx.lineTo(canvasWidth, roadHeight);
  // 아래쪽 도로 좌측 (가로 꽉 채움)
  ctx.lineTo(0, roadHeight);
  ctx.closePath();
  ctx.fill();
}

drawMap();
