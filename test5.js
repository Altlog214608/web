let now = new Date();
let seconds = now.getSeconds();

function buttonClick() {
  let now = new Date();
  let seconds = now.getSeconds();

  if (seconds % 2 == 0) {
    document.body.style.backgroundColor = "red";
  } else {
    document.body.style.backgroundColor = "blue";
  }
}
let a = Math.random(0, 10).random() * 10;
let b = Math.random();

prompt(a);
