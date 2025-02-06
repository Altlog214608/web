let interval;

function openModal() {
  document.getElementById("myModal").style.display = "block";
  interval = setInterval(() => {
    plusSlides(1);
  }, 1000);
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  clearInterval(interval);
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  //slide 배열의 n번째 요소를 제외한 나머지 요소는 display:none 속성으로 감추고
  //n번째 요소를 display:block 속성으로 화면에 표현하며 선택한 요소에 맞는 alt속성의 값을
  //중간 p태그에 innerHTML 을 사용하여 넣어준다.
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    //예외 상황 처리
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    //getElementsByClassName("mySlides") 로 얻은 배열의 요소 전부 display 속성을 none으로 변경
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    //dots배열의 className 의 " active" 를 ""로 바꿈으로서 제거함
    //dot요소를 hover 했을때 hover 한 요소만 opacity:1로 변경하기 위함.
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}
