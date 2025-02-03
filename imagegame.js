let tds;
let prevIndex = 0;
let index = 0;

window.addEventListener("load", function () {
  tds = document.getElementsByTagName("td");
  tds[index].style.backgroundColor = "black";
});

window.addEventListener("keypress", function (e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowDown":
      if (index + 4 < tds.length) index += 4;
      break;
    case "ArrowLeft":
      if (index % 4 != 0) index--;
      break;
    case "ArrowUp":
      if (index - 4 >= 0) index -= 4;
      break;
    case "ArrowRight":
      if (index % 4 != 3) index++;
      break;
  }
  tds[prevIndex].style.backgroundColor = "white";
  tds[index].style.backgroundColor = "orchid";
  prevIndex = index;
});
