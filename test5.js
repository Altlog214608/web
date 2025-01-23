let now = new Date();
let seconds = now.getSeconds();

if (seconds % 2 == 0) {
    document.body.style.backgroundColor = 'red';     
} else {
    document.body.style.backgroundColor = "blue";
}
