let tds;
let prevIndex = 0;
let index = 0;
let count = 0;
let temp;

let images = [
  "https://i.namu.wiki/i/aS1idcmGRakrHL0fHH-Uh2DLD-TzOL7kRXa1VfxfkaIX87qtRSJFqwGN0wooR5URmHCMa3hnXxamG0V5C33RzA.png",
  "https://i.namu.wiki/i/ufcOD4DL7JFw-NyyejOg4YHNc-5wrcnRyk91VIpLDFJmerUcAyry-jekGvtdm7AQK0suz9Q8Y6Po4N7g9oXp4w.png",
  "https://i.namu.wiki/i/7auspAoZ28RABuxMnMRdgchFRMrUwlYYhT7qffS2IwD2XIxXokvA8dyW4yKfOm2ZoAj-TuAa5Tb1DNjrDs7nOQ.png",
  "https://i.namu.wiki/i/VtWNesGB9ppd00F8pyUXjeRv07sxDoBu1n509dHOKmZVl3Hp5YaGTn_PCL7H6oiq4ycS0Xe4szWcR6v1b_DbuA.png",
  "https://i.namu.wiki/i/E-cKUfJs_Xyre5742iuz1eSzywKkQL5hIvF-KjkJfEeO_WiALVjy8kN0tZiKqLonO-kUp1tZDUYBIR97L0ZGEg.png",
  "https://i.namu.wiki/i/3tUnbMpd9tswUT6IAjDXgKOiEBnCeIGEzJC1h8Vr_Fq-nEV618nhQxCM_AJLu0oEACxJXC5Ve5SZTCrzmPkmtA.png",
  "https://i.namu.wiki/i/HjLTFaD3vFu-2T5MTV5E_DP76ZeFrLN6wZngLMVMCMAzcYjWMLCcenEi6foc5mrZ2HOOdj5EIhav-FC8YnCnew.png",
  "https://i.namu.wiki/i/rlGaNoTytNFS2ZNT0YeLFzgnO7zYkbxf02IZN5ypkRxbTJLhtHzkgs6TwoWF6AEygFvsWt5qN3K2jitAqD1ttA.png",
];

var counter = document.getElementById("counter");
window.addEventListener("load", function () {
  tds = document.getElementsByTagName("td");
  startImage();
  temp = tds[0].style.backgroundImage = "url(" + images[0] + ")";
});

window.addEventListener("keydown", function (e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowDown":
      if (index + 4 < tds.length) index += 4;
      changeColor();
      break;
    case "ArrowLeft":
      if (index % 4 != 0) index--;
      changeColor();
      break;
    case "ArrowUp":
      if (index - 4 >= 0) index -= 4;
      changeColor();
      break;
    case "ArrowRight":
      if (index % 4 != 3) index++;
      changeColor();
      break;
    case "Enter":
      openimage();
      count++;
      counter.innerHTML = count;
      break;
  }
});

function changeColor() {
  tds[prevIndex].style.backgroundColor = "white";
  tds[prevIndex].style.border = "1px solid black";
  tds[index].style.border = "3px solid black";
  prevIndex = index;
  zindex = 5;
}

function imagecheck() {
  if (tds[index].style.backgroundImage === temp) {
    alert("같은 이미지");
  } else {
    setTimeout(() => {
      tds[index].style.backgroundPosition = "110px";
    }, 100);
    temp = tds[index].style.backgroundImage;
  }
}
function openimage() {
  tds[index].style.backgroundPosition = "center";
  imagecheck();
}

function startImage() {
  images.sort(() => Math.random() - 0.5);
  for (let i = 0; i < tds.length / 2; i++) {
    tds[i].style.backgroundImage = "url(" + images[i] + ")";
    tds[i].style.backgroundSize = "cover";
    tds[i].style.backgroundPosition = "110px";
    tds[i].style.backgroundRepeat = "no-repeat";
  }
  images.sort(() => Math.random() - 0.5);
  for (let i = 8; i < tds.length; i++) {
    tds[i].style.backgroundImage = "url(" + images[i - 8] + ")";
    tds[i].style.backgroundSize = "cover";
    tds[i].style.backgroundPosition = "110px";
    tds[i].style.backgroundRepeat = "no-repeat";
  }
  tds[0].style.backgroundPosition = "center";
}
