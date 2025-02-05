var img = document.getElementById("imgbox");
let x;
let y;
let bool = false;
img.style.backgroundImage =
  "url(https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f373094a5e1a48c4826431bfb8253593_9366/OG_Blue_ID1454_01_standard.jpg)";
img.style.backgroundPosition = "center";
img.style.backgroundSize = "cover";

img.addEventListener("mousemove", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  console.log(x, y);
  xx = 600 - x;
  yy = 600 - y;
  if (bool == true) {
    img.style.backgroundPosition = xx + "px " + yy + "px";
  }
});

img.addEventListener("mouseover", () => {
  bool = true;
  img.style.backgroundSize = "600px 600px";
});

img.addEventListener("mouseout", () => {
  bool = false;
  img.style.backgroundSize = "300px 300px";
  img.style.backgroundPosition = "center";
});
