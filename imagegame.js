let tds;
let prevIndex = 0;
let index = 0;

window.onload = function () {
  tds = document.getElementById("td");
  tds[index].style.backgroundColor = "orchid";
};

window.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowDown":
      if (index / 3 >= 2) return;
      index += 3;
      break;
    case "ArrowLeft":
      if (index % 3 == 0) return;
      index--;
      break;
    case "ArrowUp":
      if (index / 3 < 1) return;
      index -= 3;
      break;
    case "ArrowRight":
      if (index % 3 == 2) return;
      index++;
      break;
  }
  tds[index].style.backgroundColor = "orchid";
  tds[prevIndex].style.backgroundColor = "white";
  prevIndex = index;
};
