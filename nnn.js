var img = document.getElementById("imgbox");
let x;
let y;

img.style.background =
  "url(https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f373094a5e1a48c4826431bfb8253593_9366/OG_Blue_ID1454_01_standard.jpg)";
img.style.backgroundRepeat = "no-repeat";
img.style.backgroundPosition = "50,50";
img.style.backgroundSize = "cover";
img.style.backgroundColor = "skyblue";
img.style.width = 500;
img.style.height = 500;

img.addEventListener("mousemove", (e) => {
  console.log(e.offsetX, e.offsetY);
  x = e.offsetX;
  y = e.offsetY;

  img.style.width = img.style.width + x;

  img.style.backgroundPosition = x;
  img.style.backgroundPosition = y;
});
