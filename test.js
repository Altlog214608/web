//js 변수 데이터 타입
//a_1 a1 aa A a
//문장의 구분;
//주석문 //
//자바스크립트의 데이터 타입
//숫자타입/논리타입/문자타입/문자열타입/객체타입/null타입/undefined타입

//변수 선언
//let / var / const
//var는 자바스킯트 언어 도입 시점부터 존재하던 변수 선언 타입
//let, const는 ES6부터 도입된 block-scoped variable declaration
//ECMAscript es6 시점 이후에 let과 const가 생겨남

//변수 범위
//전역변수 : 함수밖에서 선언하거나 var/let 키워드 없이 아무곳에서 선언된 변수
//전역변수는 프로그램 실행 시점부터 종료 시점까지 살아 있는 변수이다.
//프로그램 전역적으로 접근하여 사용할 수 있음.

//지역변수 : 함수안에서 선언하거나 let/const 키워드를 사용한 변수
//함수가 시작되면 생성되고 함수가 종료되면 소멸
//함수 내에서만 사용 가능

//블록변수
//let 키워드로 if/while/for/switch/try/catch/finally 등 블록 안에서 선언한 변수
//블록 내에서만 사용. 블록이 끝나면 사라짐.
//블록이 끝나면 사라지므로 블록 밖에서는 접근 불가.
//let으로 선언된 변수는 암시적으로 전역객체에 속하지 않음.

// let x; //전역변수 x 선언, var 로 선언해도 동일
// let z; //전역변수 z 선언

// function f() {
//   //함수 f() 선언
//   let y; //지역변수 y 선언
//   x = 10; //전역변수 x에 10 저장
//   y = 20; //지역변수 y에 20 저장
//   z = 30; //전역변수 z 선언 및 30 초기화
//   if (y == 20) {
//     //if block 지역변수 y
//     let b = 40; //블록변수 b 선언
//     b++; //b = 41
//   }
//1.b빼고 다 접근 가능
// }
//2. x와 z 접근 가능

// console.log(x); //undefined
// console.log(b); //ReferenceError: b is not defined
// console.log(z); //is not defined
// console.log("Hello, Node.js!");

// var x = 10; // 전역변수 x선언
// function xx() {
//   //함수 xx() 선언
//   var x; // 지역변수 x 선언
//   x = 1; // 지역변수 x에 1 저장
//   this.x = 100; // 전역변수 x에 100 할당당
// }
// console.log(x);

//let으로 선언된 변수는 this로 접근할 수 없음
//var로 선언된 전역변수: var로 선언된 전역변수는 전역 객체의 속성으로 저장된다.
//브라우저 환경에서 전역객체란? -> window객체이고 this로 접근: window.과 this. 같다

// var globalVar = 100;
// console.log(this.globalVar); // 100)

//var와 let의 작동상 차이점
//var는 동일한 변수를 재선언 할 수 있음
//let은 동일한 변수는 재선언 할 수 없음
//let은 변수의 사용범위를 블록으로 제한
//var는 제한 없음.

// var a = 1;
// if (true) {
//   var a = 2;
//   console.log(a); // 2
// }
//const는 상수로 변하지 않는 값을 가지는 키워드
//const 상수는 대문자 식별자이름
//상수는 값 변경X
//상수는 재선언x
//상수는 선언된 블록 내에서만 사용

//리터럴: 값
//자바스크립트에서 리터럴 타입 종류
//정수 8진수 10진수 16진수
//실수
//논리
//문자열
//null : 값이 없음을 뜻
//NaN : 수가 아님을 뜻

//연산자 : 자바와 동일

//비교 연산자 : ==, ===, !=, !==, <, >, <=, >=
//논리 연산자 : &&, ||, !
//조건 연산자 : ? :
//비트wise 연산자 : &, |, ^, ~, <<, >>

//기본 문법은 for if while dowhile function switch 등 기본 문법은 자바와 동일하다

//자바스크립트의 객체
//1.코어객체 : Array, Date, Math, RegExp, String, Number, Boolean, Function, Error, Symbol
// let today = new Date();
// let msg = new String("Hello, Node.js!");
//객체에 대한 접근 : .을 찍어서 접근
//객체 프로퍼티와 메서드가 있음
//자바스크립트에서는 객체의 소멸 방법 없음
//가비지컬렉터에 의해 자동 소멸, 자동 관리 됨

// //Array 객체
// let arr = [1, 2, 3, 4, 5];
// let n = ["apple", "banana", "cherry"];
// //인덱스로 접근 가능
// arr[0] = "apple"; //인덱스를 통한 접근 후 값 변경
// let a = new Array("1", "2", "3");
// let b = new Array(7);
// b[0] = "apple";
// let c = new Array(); //빈 배열 생성성
//배열의 length프로퍼티 : 배열 요소 수 리턴
//배열에는 여러 타입 데이터가 섞여 저장될 수 있음

//Array 객체의 주요 메서드
//concat() : 배열을 이어붙이기
//join([separator]) : 배열 요소를 separator로 구분하여 문자열로 반환. 배열의 모든 원소를 연결하여 하나의 문자열로 리턴
//reverse() : 배열의 요소를 뒤집는다
//slice([start[, end]]) : start index(포함)에서 end index(미포함)까지의 요소를 subarray로 리턴
//sort([compareFunction]) : 배열의 요소를 sort()
//splice([start, deleteCount[, item1[,...]]]) : start index(포함)에서 deleteCount 개의 요소를 제거하고 item1, item2,...를 추가
//toString() : 배열을 toString() 문자열로 만들어 리턴
//pop() : 배열의 마지막 요소를 제거하고 제거한 요소를 리턴

//Date 객체
//Date객체는 시간정보를 담는 객체
//new 키워드로 생성
//실제 Date객체 생성된 시간정보(코드가 실행된 시점)
// let d = new Date(2024, 11, 1); //24년도 12월 1일
// let now = new Date(); //현재시간 객체 생성
// let date = now.getDate(); //날짜(1~31)
// let month = now.getMonth() + 1; //달(1~12)
// let year = now.getFullYear(); //년
// let hour = now.getHours(); //시간(0~23)
//getFullYear() : 4자리 년도
//getMonth() : 0~11
//getDate() : 1~31
//getHours() : 0~23
//getMinutes() : 0~59
//getSeconds() : 0~59
//getMilliseconds() : 0~999
//getUTCFullYear() : 4자리 UTC 년도
//getDay() : 0(일요일)~6(토요일)

//Math 객체
//Math 객체는 수학 관련 함수를 제공
//Math.abs() : 절대값
//Math.floor() : x보다 작거나 같은 수 중 가장 큰 정수 리턴
//Math.ceil() : Math.abs()의 ceil()
//Math.round() : x반올림 한 수
//Math.sin(0)
//Math.cos(0)
//Math.tan(0)
//Math.random() : 0~1 사이의 랜덤수
//sqrt() : x의 제곱근

//eval() 함수 : 문자열로 구성된 수식의 연산 결과 리턴
//eval("7 * 7") // 49

//DOM(Document Object Model)
//2.DOM객체
// document.getElementById();
// document.body.style.backgroundColor = "red";
//DOM 객체화의 목적:JS코드 내에서 HTML과 CSS를 건들기 위해
//element 라고 표현하는  HTML 개별 태그를 JS에서 객체화 하여
//제어할 수 있도록 한다.

//DOM 트리
//document: entry point 이다(document DOM객체 트리 구조에 진입하기 위한 진입점)
//document 객체는 DOM 객체가 아니다.(문서 노드이다.)
//HTML 구조로 작성한 요소 (element)들은 요소 노드 이고, DOM 객체화 된다.
//DOM 객체의 종류 수 = 태그 종류의 수
//HTML 태그 하나 당 DOM 객체가 하나씩 생성된다.
//DOM 트리는 HTML 태그의 포함 관계에 따라 부모 자식 관계로 구성된다.
//DOM 객체는 특정 HTML태그에 반영되어 있는 TEXT 노드와 ATTRIBUTE 노드를 포함하는 객체
//DOM 객체의 구성 요소 : 프로퍼티/ 메소드/컬렉션/이벤트리스너/CSS스타일

//프로퍼티: DOM 객체의 멤버 변수이고 HTML 태그의 속성(ATTRIBUTE)을 반영.
//DOM객체의 프로퍼티 값으로부터 HTML 태그의 속성을 알아내거나 프로퍼티 값을 바꾸어 HTML 태그에
//변화를 줄 수 있음.

//메서드: DOM 객체의 멤버 함수로 HTML 태그를 제어하는데 사용
//컬렉션: 정보를 집합으로 표현하는 일종의 배열,
//예를들어 children 이라는 컬렉션은 특정 DOM객체의 모든 자식 DOM객체를 표현해줌

//이벤트리스너 :DOM 객체 HTML태그에 작성된 이벤트 리스너를 그대로 가짐.
//JS를 통해 새로운 이벤트 리스너를 등록하거나 기존 이벤트리스너를 삭제하는 것도 가능

//스타일 : DOM 객체는 style 프로퍼티를 통해 html 태그에 적용된 css스타일에 접근할 수 있음.

//DOM 객체간 관계성
//DOM객체들은 DOM트리 구조로 나타나는데 아래 관계성 속성에 따라 타 DOM에 접근 가능능
//parentElement 프로퍼티: 부모 DOM 객체
//children 프로퍼티 : 직계자식들 객체 컬렉션
//firstChild, lastChild : DOM객체의 첫번째, 마지막 자식 DOM
//previousElementSibling, nextElementSibling : DOM 객체의 이전, 다음 형제 DOM

//HTML태그의 ID명을 통한 DOM객체화 방법

//document.getElementById() : id 속성값으로 DOM 객체 가져오기
// var mybox = document.getElementById("zboxcont");
// console.log(mybox);
//w3c 표준 DOM객체의 주요 공통 프로퍼티
//id: 태그 id값
//tagName: HTML 태그 이름
//attributes: HTML 태그의 attribute(속성)들
//childNodes: HTML 태그의 child node(태그, text, comment)들
//parentNode: HTML 태그의 parent node
//style: HTML 태그의 style에 대한 레퍼런스
//title: HTML 태그의 title attribute 속성 값
//innerHTML: HTML 태그의 innerHTML 태그의 컨텐츠
//childElements: HTML 태태그의 child elements(태그) 자식 요소 수 count
//firsyElementChild 첫 자식
//lastElementChild 마지막 자식
//previousElementSibling 왼쪽 형체
//nextElementSibling 다음 형제
//offsetTop, offsetLeft, offsetWidth, offsetHeight 높이 너비 위치
//children 자식 컬렉션

//DOM 객체의 주요 공통 메서드
//addEventListener() : 이벤트 리스너 등록
//appendChild() : 마지막 자식 뒤에 새로운 자식 추가
//removeEventListener() : 이벤트 리스너 제거
//click() : click 이벤트 리스너 액션
//focus() : focus 이벤트 리스너 포커스 지정
//setAttribute() : HTML 태그의 attribute(속성)값 설정 속성 추가
//removeChild() : 자식 삭제제
//innerText : HTML 태그의 innerText
//textContent : HTML 태그의 textContent
//querySelector() : Css 셀렉터와 일치하는 첫번째 자식 리턴
//insertBefore() : 지정된 자식 앞에 새 자식 추가
//replaceChild() : 자식 대체
//getattribute() : 속성 값 조회

var p = document.getElementById("firstP"); //DOM 객체화
console.log(p); //DOM 객체
p.style.color = "red"; //CSS 스타일

document.getElementById("firstP").style.color = "blue"; //DOM 객체
p.style.backgroundColor = "yellow"; //DOM 객체
//background-color라는 css속성은 js에서 쓸 때 하이픈 제거 후 backgroundColor
p.style.cssText = "background-color: yellow; color: blue;"; //cssText로 css속성 설정
var s = document.getElementById("myspan");
s.style.color = "magenta"; //DOM 객체
s.style.fontSize = "50px"; //DOM 객체
s.style.display = "block"; //DOM 객체
s.style.width = "200px"; //DOM 객체
s.style.border = "1px solid black"; //DOM 객체
s.style.margin = "10px"; //DOM 객체

var whatcolor = s.style.color;
console.log(whatcolor);

if (whatcolor === "green") {
  console.log("1");
}

var pp = document.getElementById("secondP");
console.log(pp.style.color); //x

var style = window.getComputedStyle(pp);
var value = style.getPropertyValue("color");
console.log(value); //o

//secondP처럼 셀렉터를 통한 스타일이 부여된 DOM 객체의
//경우에는 ComputedStyle을 통해 속성 값을 조회 가능
//직접 접근하면 공백출력

function change() {
  let span = document.getElementById("myspan");
  span.style.color = "green";
  span.style.fontSize = "100px";
  span.style.width = "20em";
}

console.log(p.innerHTML);
function changeinner() {
  p.innerHTML("<img src='src/test2.jpg'>");
}

function change1(obj, size, color) {
  obj.style.color = color;
  obj.style.fontSize = size;
}

//브라우저는 HTML문서를 로드하기 전에 document 객체를 먼저 만든다.
//그리고 document객체를 뿌리로 하여 DOM 트리를 만든다.
//document 객체는 HTML문서 전체를 대변하는 객체이다.
//document 객체는 많은 프로퍼티를 통해 HTML 문서의 전반적인 속성을 나타내고
//여러 메서드를 통해 DOM객체의 검색, DOM 객체의 생성 등 HTML 문서의 전반적 제어 역할
//document객체는 HTML 문서에 만들어진 동일 HTML 태그들을 배열처럼 접근할 수 있는 컬렉션을 두고 있음
//여러 메서드를 통해 DOM객체의 검색, DOM객체의 생성 등 HTML문서의 전반적 제어 역할
//document 객체는 HTML문서에 만들어진 동일 HTMl태그들을 배열처럼 접근할 수 있는 컬렉션을 두고 있음
//예로 images 컬렉션은 document객체를 통해 접근 가능한데, 문서 내 모든 img 태그들을 가져올 수 있다,

//document 객체의 주요 프로퍼티
//location : 현재 문서의 URL 정보를 가진 location 객체
//domain : 서버 도메인 이름
//readyState : 이 문서의 로딩 상태
//body : 이 문서의 바디
//head : 이 문서의 헤드
//activeElement : 이 문서에서 포커스 된 요소
//URL : 이 문서의 URL
//documentElement : HTML 객체에 대한 레퍼런스

//document객체의 주요 컬렉션
//images : 문서 내 모든 img 객체들 컬렉션
//links : 문서 내 모든 a 객체들 컬렉션
//forms : 문서 내 모든 form 객체들 컬렉션

//document객체의 주요 메서드
//getElementById() id를 통한 DOM객체 리턴
//getElementByClassName() class 명을 통한 DOM 객체 리턴
//getElementByTagName() 태그명을 통한 DOM객체 리턴
//getElementByName () name 속성을 통한 DOm객체 리턴
//close() document 객체에 있는 HTML 컨텐츠를 브라우저에 출력하고 더 이상 쓰기를 받지 않게 됨
//createElement() HTML 태그의 동적 생성
//open() document에 담긴 모든 컨텐츠를 지우고 새로운 HTML 컨텐츠를 쓸 수 있도록 열기
//write() document에 HTML 컨텐츠 삽입, DOM트리에 연결되고 브라우저에 출력됨.

//버튼에 onclick 추가 , 추가 누르면 텍스트가 항목에 추가
//작업순서 1. createElement li 2.input텍스트를 얻으려면 .value로 얻는다. 3.value를 li의 innerHTML로 설정정 4.appendChild()

var ul = document.getElementById("todolist");
var input = document.getElementById("newtodo");
var btn = document.getElementById("addtodo");

btn.addEventListener("click", () => {
  if (input.value != "") {
    var newli = document.createElement("li");
    newli.innerHTML = input.value;
    ul.appendChild(newli);
    ul.value = "";
  }
});

ul.addEventListener("click", (event) => {
  //매개변수로 마우스이벤트(포인터 이벤트 객체를 전달받음)
  console.log(event); //이벤트 객체에는 해당 이벤트가 발동된 target 외 여러 속성을 가지고 있다.
  if (event.target.tagName === "LI") {
    //tagName 속성은 대문자 태그명을 리턴한다.
    ul.removeChild(event.target); //해당 이벤트가 발생한 타겟을 ul에서 리무브 한다.
  }
});

// function addli() {
//   var newli = document.createElement("li");
//   newli.innerHTML = input.value;
//   ul.appendChild(newli);
//   ul.value = "";
// }

// 강사님 답

// var newtodolist = document.getElementById("newtodo");
// var todolist = document.getElementById("todolist");

// function f1() {
//   if (newtodoinput.value !== "") {
//     var newli = document.createElement("li");
//     newli.innerHTML = newtodolist.value;
//     todolist.appendChild(newli);
//     newtodolist.value = "";
//   }
// }

// !=와 !==의 차이
// !==는 엄격한 비교로 값과 자료형까지 비교한다.
// !=는 느슨한 비교로 자료형은 따지지 않고 값만 비교한다.

//주사위 뽑기 예제

//주사위는 처음에 1개가 주어진다.
//주사위 숫자는 랜덤이다. 코어 객체 math -> random 범위 1~6
//주사위 그림은 이미지를 사용한다.
//주사위 추가 버튼이 있다.
//주사위가 바로 이전 주사위와 다음 주사위의 숫자가 같은 숫자가 나오면 끝나는 게임
//몇개를 추가했는지를 p 에다가 추가 주사위 뽑은 수 출력
//같은 숫자 주사위가 연속으로 나오면 alert를 통해 게임 종료라는 멘트를 출력한다.
//주사위 추가는 5번만 가능

var cont = document.getElementById("cont");
var btn = document.getElementById("adddice");
var count = document.getElementById("count");
var ct = 0;
var temp = 0;
var state = true;

btn.addEventListener("click", () => {
  if (ct <= 5) {
    var rnd = Math.floor(Math.random() * 6) + 1;
    roll(rnd);
    if (temp != rnd) {
      temp = rnd;
      console.log(rnd);
      ct++;
      count.innerHTML = ct;
    } else {
      setTimeout(() => {
        alert("end");
      }, 2);
    }
  }
});

function roll(rnd) {
  switch (rnd) {
    case 1:
      var dice = document.createElement("img");
      dice.src =
        "http://cod3.kr/xe/files/attach/images/68/965/0791b7358f33c16c6fbed52bdf9dc0c1.png";
      cont.appendChild(dice);
      break;
    case 2:
      var dice = document.createElement("img");
      dice.src =
        "http://cod3.kr/xe/files/attach/images/68/965/d7f4295e98e554a4e700ecfded5c3641.png";
      cont.appendChild(dice);
      break;
    case 3:
      var dice = document.createElement("img");
      dice.src =
        "http://cod3.kr/xe/files/attach/images/68/965/c542e8ca6d892a74eb6249749577d581.png";
      cont.appendChild(dice);
      break;
    case 4:
      var dice = document.createElement("img");
      dice.src =
        "http://cod3.kr/xe/files/attach/images/68/965/f74570ea82fc8b951b27ba7f4f7ae595.png";
      cont.appendChild(dice);
      break;
    case 5:
      var dice = document.createElement("img");
      dice.src =
        "http://cod3.kr/xe/files/attach/images/68/965/4ee6cd9621104a36d37fa00a352f0f71.png";
      cont.appendChild(dice);
      break;
    case 6:
      var dice = document.createElement("img");
      dice.src =
        "http://cod3.kr/xe/files/attach/images/68/965/841ffcd3bd59fbee034fd8c20cf51dbe.png";
      cont.appendChild(dice);
      break;
  }
}

function end() {}

//이벤트와 이벤트 객체
//이벤트란 마우스/키보드 입력, 이미지나 문서의 로딩, 타임아웃 등 사용자의 입력 외
//문서나 브라우저의 상태 변화를 브라우저가 자바스크립트에게 알리는 notification

//이벤트리스너란
//발생한 이벤트에 대한 적절한 대처를 하기 위해 작성된 자바스크립트 코드

//주요 이벤트리스너 목록
//onkeydown : 키보드의 아무 키 누르는 순간
//onkeypress : 키보드의 알파뉴메릭(알파벳과 숫자만 허용) 키 누르는 순간
//onkeyup : 키보드 누른 키 놓는 순간
//onclick : 좌클릭
//oncontextmenu : 우클릭
//ondbclick : 더블 클릭
//onmousedown : 마우스의 물리버튼 누르는 경우
//onmouseenter : 마우스 커서가 객체 영역 안으로 들어오는 순간
//onmouseleave : 마우스 커서가 객체 영역 밖으로 나가는 순간
//onmouseover : 마우스 커서가 객체 영역 안으로 들어오는 순간(자식 객체에게 전파)
//onmouseout : 마우스 커서가 객체 영역 밖으로 나가는 순간(자식 객체에게 전파)
//onmouseup : 누른 마우스 버튼 놓는 순간간
//onwheel : 마우스 휠 변화 생길 때
//onabort : 이미지나 문서 로딩이 중단되는 경우
//onerror : 문서나 이미지, 리소스 등의 로딩에서 오류 발생할 때
//onload : 문서나 이미지의 로딩이 완료된 후
//onresize : 윈도우, 프레임 혹은 객체의 크기가 변경될 때
//onfocus : 객체가 포커스를 가질 때
//onchange : 체크박스, input 등의 내용이 변하는 경우
//onsearch : 폼이 reset 되는 경우
//onreset : input type search 창에 엔터 입력시
//onselect : input 영역의 텍스트를 선택할 때
//onsubmit : 제출버튼 클릭시 발생

//이벤트 리스너 만드는 방법
//1. HTML 태그에 직접 작성하는 방법
// <p id='pp' onclick=''>p태그입니다</p>
//2. DOM 객체의 이벤트리스너 프로퍼티에 작성하는 방법
// var pp = document.getElementById('pp'); //DOM 객체화
// function x(){}; //함수 x 선언
// pp.onmouseover = x;  //DOM 객체의 이벤트리스너 프로퍼티에 함수를 등록
//3. DOM객체의 addEventListener() 메서드로 등록하는 방법
//addEventListener(eventname,Listener[,useCapture])함수의 매개변수
//eventName: 이벤트 타입을 나타내는 문자열 click, load, keydown 등
//listener : 이벤트 리스너로 등록할 함수 이름
//useCapture : true로 놓는 경우 이벤트 흐름 중 캡쳐 단계에서 실행될 리스너로 등록하는 것
//false로 등록하면 버블 단게에서 실행되는 리스너로 등록함, 기본값은 false
// pp.addEventLisener("click", x) // 정의 되어있는 함수 등록록
// pp.addEventListener("click", function(){함수의 실행문}) //익명 함수 사용
// pp.addEventListener("click", () => {}) //화살표 함수

//이벤트 객체
//이벤트가 발생하면 브라우저는 발생한 이벤트에 대한 여러 정보를 담은 이벤트 객체를 만들어서
//이벤트 리스너에게 전달한다. onmousedown 이벤트의 경우 마우스 관련이기 때문에 마우스의 좌표 등 정보를
//담은 마우스 이벤트 객체를 전달하고 onkeydown의 경우 키보드 관련으로 키보드의 어떤키가 눌렸는지
//keycode등의 정보를 담아 전달한다.

//이벤트가 처리되고 나면 이벤트 객체는 소멸한다.
//브라우저는 한 개의 이벤트를 완전히 처리한 후 다음 이벤트를 처리하므로, 이벤트 리스너 실행 중에는
//오직 한 개의 이벤트 객체만 존재한다.

//마우스 이벤트 객체 and 키보드 이벤트 객체 각각 console.log로 출력력
var dd = document.getElementById("d11");

d11.addEventListener("mouseup", (event) => {
  console.log(event);
});

document.body.addEventListener("keypress", (event) => {
  console.log(KeyboardEvent.DOM_KEY_LOCATION_LEFT);
});

//이벤트 객체의 target 프로퍼티
//타겟 프로퍼티는 이벤트의 대상 객체를 가리킴
//이벤트 타겟이란 이벤트를 유발시킨 객체를 의미함
//target과 유사한 프로퍼티로 currentTarget프로퍼티가 있다.
//currentTarget은 이벤트가 흘러가는 경로 상에 있는 DOM 객체 중 현재 이벤트 리스너를 실행하고 있는 DOM 객체를 가리킨다.

var ppp = document.getElementById("d11");
ppp.addEventListener("click", ff);

function ff(e) {
  let text =
    "type:" +
    e.type +
    "<br>" +
    "target:" +
    e.target +
    "<br>" +
    "currentTarget:" +
    e.currentTarget +
    "<br>";
  ppp.innerHTML = text;
}

//type프로퍼티는 현재 발생한 이벤트의 종류
//target프로퍼티는 이벤트가 실제로 발생한 요소
//currentTarget프로퍼티는 이벤트가 바인딩 된 요소
//defaultPrevented 프로퍼티는 이벤트의 디폴트 행동이 취소되었는지 여부 t/f로 나타남
//preventDefault() 메서드는 이벤트의 디폴트 행동을 취소시키는 메서드

//HTML태그 중 몇몇은 특정 이벤트에 대해 디폴트 행동을 한다.
// a 링크를 클릭하면 이동하는 것
// submit 버튼을 클릭하면 폼 데이터를 전송하는 것
// reset을 클릭하면 폼이 초기화 되는 것
// wheel을 굴리면 브라우저 스크롤이 움직이는 것

//이벤트 객체의 cancelable 프로퍼티가 true 인 경우만 preventDefault가 가능하다.

//이벤트의 흐름
//이벤트가 발생하면 이벤트는 타겟 객체에 전달된다.
//이벤트가 단번에 타겟 객체로 직접 전달되는 것이 아니라 window 객체로부터 DOM트리를 타고 중간 DOM객체들을 거쳐
//타겟 객체로 이벤트가 흘러들어가고, 다시 반대 방향으로 이동하여 window 객체에 도달한 후 이벤트는 소멸한다.
//위 과정을 이벤트의 흐름이라고 함.
//이벤트의 흐름은 2가지 단계로 나누어 볼 수 있다. 1.캡쳐 단계와 2.버블 단계

//캡쳐단계는 window 객체에서 타겟 객체까지 전파되는 과정
//버블단계는 타겟 객체에서 거꾸로 window까지 이벤트 객체가 전파되는 과정
//DOM객체들은 동일한 이벤트에 대해 캡쳐 리스너와 버블 리스너를 모두 가질 수 있음

var bt1 = document.getElementById("bt1");
bt1.addEventListener("click", cap, true);
bt1.addEventListener("click", bub, false);

function cap() {
  console.log(1);
}

function bub() {
  console.log(2);
}

//캡쳐와 버블 단계 구분: 이벤트 발동 순서에 대한 관리 / 이벤트 우선 순위 관리 필요할 때

//이벤트 객체의 멤버 중 이벤트 흐름과 관계된 멤버
//cancelable : 디폴트 취소 가능 여부
//stopPropagetion() : 객체에 등록된 리스너를 모두 실행 후 이벤트 흐름 중단
//stopImmediatePropagtion() : 현재 리스너만 실행하고 이벤트 흐름 즉각 중단

//마우스 핸들링
//마우스 객체 관련 프로퍼티
//x,y : x,y는 타겟 객체의 부모 객체 내에서의 마우스 좌표
//clientX,clientY: 브라우저 윈도우의 문서출력 영역 내애서의 마우스 좌표
//screenX, screenY : 스크린을 기준으로 한 마우스 좌표
//offsetX, offsetY : 타겟 객체 내에서의 마우스 좌표
//button : 눌러진 마우스 버튼 종류 0: 아무것도 안눌린 상태 1: 왼쪽 버튼 2: 오른쪽 버튼 3:왼쪽, 오른쪽 모두 4:중간버튼
//wheelDelta : 휠이 구른 방향 , 양수 : 위쪽으로 굴림 / 음수 : 아래로 굴림

//키보드 이벤트 객체 프로퍼티
//code : 눌러진 키의 이름
//key : 눌러진 키의 문자열
//altKey : 알트키 눌린 상태 여부
//ctrlKey : 컨트롤 키 눌린 상태 여부
//shiftKey : 시프트키 눌린 상태 여부
//keyCode : 키코드 값 숫자

// let tds;
// let prevIndex = 0;
// let index = 0;

// window.onload = function () {
//   tds = document.getElementById("td");
//   tds[index].style.backgroundColor = "orchid";
// };

// window.onkeydown = function (e) {
//   switch (e.key) {
//     case "ArrowDown":
//       if (index / 3 >= 2) return;
//       index += 3;
//       break;
//     case "ArrowLeft":
//       if (index % 3 == 0) return;
//       index--;
//       break;
//     case "ArrowUp":
//       if (index / 3 < 1) return;
//       index -= 3;
//       break;
//     case "ArrowRight":
//       if (index % 3 == 2) return;
//       index++;
//       break;
//   }
//   tds[index].style.backgroundColor = "orchid";
//   tds[prevIndex].style.backgroundColor = "white";
//   prevIndex = index;
// };

//3.BOM 객체
//browser object model 객체
//DOM객체들은 HTML 태그들을 객체화 한 것이고
//BOM은 윈도우와 윈도우에 로드된 문서의 url, 브라우저가 출력된 스크린 장치, 브라우저의 종류와 기능 등
//브라우저와 브라우저가 실행하고 있는 환경을 자바스크립트 코드로 접근하기 위해 객체화 하는 것

//BOM의 종류
//1.window
//2.location
//3.history
//4.screen

//window 객체는 열려 있는 브라우저 윈도우나 탭 윈도우를 나타내는 객체로 윈도우마다 하나의 window객체가 생성
//window 객체가 생성되는 경우는 다음 3가지
//1.브라우저가 새로운 웹 페이지를 로드할 때
//2.iframe 하나당 하나의 window 객체이다
//3.개발자가 js코드를 통해 직접 window 객체를 임의로 생성하는 경우 ex) window.open("url",'윈도우명','속성')

//BOM은 w3c의 규격이 아니다.
//window객체의 프로퍼티와 컬렉션, 메서드 목록
//프로퍼티와 컬렉션
//window : 현재 윈도우 객체에 대한 ref
//document : 윈도우에 담긴 document 객체에 대한 ref
//history : 히스토리 객체
//menubar : 메뉴바 객체
//locationbar : 위치바 객체
//length : 윈도ㅜㅇ에 존재하는 iframe 수
//frames : 윈도우에 존재하는 iframe 객체들의 컬렉션
//innerWidth : 수직 스크롤바를 포함한 브라우저 내 HTML 문서가 출력되는 영역의 폭
//innerHeight : 수평 스크롤바를 포함한 브라우저 내 HTML 문서가 출력되는 영역의 높이
//outerWidth : 윈도우 전체의 폭
//outerHeight : 윈도우 전체의 높이
//ScreenX : 스크린상 윈도우 X좌표
//ScreenY : 스크린상 윈도우 Y좌표
//scrollX : 현재 문서의 스크롤 x 값
//scrollY : 현재 문서의 스크롤 y 값

//메서드
//open() : 새 윈도우 오픈
//close() : 윈도우 닫기
//focus() : 윈도우에 포커스를 줘서 키보드 입력 가능 상태로 만듬
//blur() :  윈도우가 포커스를 잃음
//stop() : HTML 페이지 로딩 중단 (브라우저의 stop 버튼 누른 것 동일)
//alert() : 경고 다이얼로그 출력
//confirm() : 확인 다이얼로그
//prompt() : 입력 다이얼로그
//setInterval() : 타임아웃 코드가 반복 호출되도록 타이머 설정
//clearInterval() : 설정된 타이머 제거
//setTimeout() : 타임아웃 단발성 타이머 설정
//clearTimeout() : 단발성 타임아웃 해제
//moveBy() : 지정된 픽셀만큼 윈도우 이동
//moveTo() : 지정된 위치로 윈도우 이동
//resizeBy() : 지정된 크기만큼 윈도우 크기 조절
//resizeTo() : 지정된 크기로 윈도우 크기 조절
//scrollBy() : 주어진 픽셀만큼 상하좌우 스크롤한다.
//scrollTo() : 특정 좌표로 스크롤한다.

//window 객체에도 이벤트리스너를 등록할 수 있다.

//url : 페이지 주소 , 이 매개변수는 필수, null 허용 않는다
//윈도우명(생략가능) : 새로 여는 윈도우의 이름 전달 매개변수
//      _blank :이름 없는 새 윈도우
//      _parent : 새 윈도우를 열지 않고 현재 윈도우의 부모 윈도우애 웹 페이지 출력
//      _self : 현재 윈도우에 페이지 출력
//      _top : 브라우저 윈도우에 웹 페이지 출력
//속성(생략가능능) : 윈도우의 모양이나 크기 등 속성을 설정하는 부분 ex)"resizealbe=yes", "resizeable=1"
//      width/height/left/top/location/menubar/scrollbars/status

let newWin = null;
function load(URL) {
  newWin = window.open(
    URL,
    "_blank",
    "left=300, top=300, width=300, height=300"
  );
}

function closeNewWindow() {
  if (newWin == null || newWin.closed) {
    return;
  } else {
    newWin.close();
  }
}

//window의 타이머 활용

//window에는 타이머 작동 메서드가 있어 이를 활용하여 시간에 따라 웹 페이지에 동적인 효과를 줄 수 있음.
//단발성 -> setTimeout()

// function myAlert(t) {
//   alert(t + "초 지남");
// }

// let timerID = setTimeout("myAlert(3)", 3000);
// clearTimeout(timerID);

//반복성 -> setInterval()

// let timerID2 = setInterval("myAlert(3)", 3000);
// clearInterval(timerID2); //interval은 무한 반복이기에 clearInterval 함수로 꺼줘야 함

//setTimeout()을 통해서 5초간 div 박스에 마우스를 올려놓으면 새로운 윈도우가 하나 열리도록 해보세요
var box = document.getElementById("windowbox");
let timer;

// box.addEventListener("mouseover", () => {
//   timer = setTimeout('load("https://www.naver.com")', 3000);
// });

// box.addEventListener("mouseout", () => {
//   clearTimeout(timer);
// });

// function f() { //2초마다 호출할 함수의 정의

// }
// let timerId = setInterval('',2000); //on

// clearInterval(timerId); //off
// p태그에 어떤 문장이 쓰여있고, p태그의 기본 배경색은 red 색상이다.
// p태그의 우측에는 2개의 div로 만들어진 버튼이 있고 첫번째 버튼은 On버튼 두번째 버튼은 OFF 버튼이다.
// ON버튼을 누르면 2초마다 반복적으로 배경색상이 R->G->B->R->G ... 형태로 변경되는 작동이 켜지고
// OFF버튼을 누르면 작동이 꺼진다.

var on = document.getElementById("on");
var off = document.getElementById("off");
var ptag = document.getElementById("ptag");

function changeBG() {
  ptag.style.transition = "backgroundColor, 0.5s, easy-in";
  if (ptag.style.backgroundColor == "red") {
    ptag.style.backgroundColor = "blue";
  } else if (ptag.style.backgroundColor == "blue") {
    ptag.style.backgroundColor = "green";
  } else {
    ptag.style.backgroundColor = "red";
  }
}

on.addEventListener("click", () => {
  ptag.style.backgroundColor = "red";
  timer = setInterval("changeBG()", 100);
});

off.addEventListener("click", () => {
  clearInterval(timer);
});

let span = document.getElementById("sp1");
let timerITV = setInterval("dort()", 0);
span.onclick = function (e) {
  clearInterval(timerITV);
};

function dort() {
  let str = span.innerHTML;
  let firstChar = str.substr(0, 1);
  let remains = str.substr(1, str.length - 1);
  str = remains + firstChar;
  span.innerHTML = str;
}

// window.scrollBy(0, 10);
// window.scrollBy(10, -15);
// window.scrollTo(0, 200);

//location 객체
//window.location
//location객체는 윈도우에 로드댑된 웹페이지URL정도 나타내는 개체
//윈도우가 열릴 때 자동 생성 됨
//window.은 생략가능하다

//https://www.example.com:8000/content/ABC.html#labe11
//https: 프로토콜
//wwww.exapmle.com : 호스트 네임
//8080 : 포트번호
//content/ABC.HTML경로
//#labeli : 해시(#을 포함하는 앵커 이름 문자열)

//history 객체
//히스토리 객체는 사용자가 방문한 웹 페이의 리스ㅅ,트 정보를 담고 있는 객체
//window.history 혹은 history로 접근

//history 관련 프로퍼티와 메서드
//length : 히스토리 리스트에 있는 엔트리 수
//back() : 히스토리에 있는 이전 웹 페이지로 이동하는 메서드 브라우저의 뒤로 버튼과 동일
//forward(): 히스토리에 있는 다음 웹 페이지
//

// let canvas = document.getElementById("cv1");
// let context = canvas.getContext("2d");
//getContext('2d')가 리턴한 context 객체는 2차원 그래픽에 사용되는 프로퍼티와 메서드 제공
//let context변수에 할당 된 객체는 CanvasRenderingContext2D 타입의 객체임
//HTML5의 캔버스는 비트맵 렌더링 엔진을 장착하여 브라우저에 즉시 그려내는 구조
//속도가 빠르다.

//canvas 객체의 프로퍼티와 메서드
//width : 캔버스의 폭
//height : 캔버스의 높이
//style : 캔버스의 스타일
//getContext() : 캔버스에 그림을 그리는 컨텍스트 객체 리턴하는 메서드

// context.beginPath(); //그리기 시작
// context.strokeStyle = "red"; //색상
// context.fillStyle = "green";
// context.rect(60, 60, 50, 50); //60,60 좌표에 50x50 사이즈 사각형(rect)
// context.stroke(); //그리기
// context.fill();
//context 객체 프로퍼티 메서드
//strokeStyle : 선 색상
//fillStyle : 채우기 색상
//lineWidth : 선 두께
//font : 텍스트 폰트 설정
//textAlign : 텍스트 정렬 방식

//beginPath() : 이전 경로 모두 지우고 새로운 경로 시작
//closePath() : 경로의 끝 점과 시작점을 연결하는 선을 추가하고 경로 닫음.
//moveTo() : 경로에 새 점을 만듬
//lineTo() : 경로의 끝 점과 연결하는 선을 추가한다.
//rect() : 사각형 그리기
//arc() : 원호 그리기
//fill() : 경로에 만들어진 도형을 외곽선 없이 내부 색을 채워 그린다.\
//stroke() : 경로에 담겨진 모든 도형을 외곽선만 캔버스에 그린다.
//clearRect() : 캔버스에 사각형 영역을 지운다.
//fillRect() : 캔버스에 외곽선 없이 사각형 영역을 색으로 바로 칠한다.
//strokeRect() : 사각형을 경로에 추가하지 않고 캔버스에 바로 그림
//strokeText() : 텍스트를 캔버스에 바로 그린다.
//drawImage() : 이미지를 캔버스에 바로 그린다.

// let canvas2 = document.getElementById("cv2");
// let context2 = canvas2.getContext("2d");

// context2.beginPath(); //빈 경로 만들기
// context2.strokeStyle = "blue"; //선 색상 설정
// context2.rect(30, 30, 50, 50); //30,30 에 50x50 짜리 사각형을 경로에 넣는다.
// context2.stroke(); // 경로에 있는 모든 도형의 외곽선 그리기

// context2.beginPath(); //새 빈 경로 만들기
// context2.fillStyle = "violet"; //채우기 색상 설정
// context2.rect(60, 60, 50, 50); //60,60 좌표에 50x50 사이즈 사각형(rect)
// context2.fill(); //경로에 있는 모든 도형을 내부 색상 채워 그리기

// context2.font = "20px Gothic";
// context2.fillStyle = "red";
// context2.fillText("text123123123", 100, 50);

//도형 그리기
//1.Path만들기
//2.캔버스에 담긴 경로를 그려내기

//경로path란 캔버스위에 펜이 지나가는 길
//경로 만들기는 캔버스에 그리고자 하는 도형들을 먼저 컨텍스트 내의 경로에 담는 과정이다.
//moveTo() lineTo() rect() arc() 등 메서드는 캔버스에 직접 그리지 않고 도형을 경로에 추가하는 메서드이다.
//stroke이나 fill 메서드가 호출될때 실질적으로 경로에서 그림으로 캔버스에 올라옴
//closePath : 경로 종료

// context.beginPath();
// context.moveTo(150, 180); //경로에 담긴 도형은 그대로 두고, 점 x,y를 새 시작점으로 삽입
// context.lineTo(30, 250); //경로의 끝점에서 x,y 까지 직선을 경로에 추가
// context.lineTo(150, 320);
// context.lineTo(50, 320);
// context.lineTo(150, 180);
// context.stroke();

//원그리기 arc()
//arc(x,y,radius,startAngle,endAngle,anticlockwise)
//x,y 원호의 중심
//radius 반지름
//startAngle : 시작 각도 3시가 기준점(시계방향)
//endAngle : 종료 각도
//anticlockwise : 시계 방향은 true 반시계방향은 false로 설정

//각도법에서는 360도로 표현 -> 호도법으로 표현하면 라디안 단위로 표현
//360도 = 2파이
//1도 = 파이/180

//arc() 메서드에서 startangle과 endangle은 원주율로 지정한다.
//각도는 3시에서 기준점 시작
//math클래스에 있는 PI상수를 이용해서 각도 설정
//270도 => math.PI * 1.5
//360도 => math.PI * 2

// context.arc(50, 50, 10, 50, 1.5 * Math.PI, false);
// context.fillStyle = "red";
// context.fill();

// context.beginPath();
// context.arc(150, 150, 50, Math.PI * 2, false);
// context.fillStyle = "blue";
// context.fill();

// context.fillStyle = "violet";
// context.fillRect(20, 20, 100, 100);

// context.beginPath();
// context.rect(20, 150, 100, 100);
// context.fillStyle = "violet";
// context.fill();

// context.strokeStyle = "grey";
// context.lineWidth = 10;
// context.stroke();

// context.beginPath();
// context.moveTo(80, 340);
// context.arc(80, 340, 50, 0, 1.5 * Math.PI);
// context.closePath();

// context.fillStyle = "skyblue";
// context.fill();

// context.strokeStyle = "gray";
// context.lineWidth = 20;
// context.stroke();

//이미지그리기
//이미지 객체의 생성
//캔버스에 이미지를 그리기 위해서는 이미지를 담을 이미지 객체가 필요함
//이미지 객체는 JS코드로 new 키워드 사용해서 만듬
//let img = new Image();

//이미지의 로딩과 onload
//이미지 파일로부터 이미지를 로딩시키기 위해서는 Image 객체의 src 프로퍼티 이용

// Image.onload=function() {
//     -------
//     ------- // img 객체에 로드된 이미지를 그리는 코드
// }

// img.src = "src/test2.jpg"; //img 객체에 ~~~~파일로부터 이미지 로딩 시작

// img.src = "src/test2.jpg"; 라인은 이미지 로딩을 시작시키는 코드
//이미지 로딩이 완료되어야 이미지를 그릴 수 있기 때문에, 이밎 ㅣ로딩을 지시하기 전
//img.onload 리스너에 이미지가 로딩 되었을 때 이미지를 그리는 JS코드를 쓴다.

//이미지 그리기
//이미지 로딩이 완료되면 컨텍스트 객체의 drawImage() 메서드를 이용해 이미지를 그린다.
//drawImage(img,dx,dy)
//img : 이미지 객체
//dx : 이미지 그릴 캔버스 좌표 x
//dy : 이미지 그릴 캔버스 좌표 y
//width : 이미지 폭
//height : 이미지 높이

let canvas = document.getElementById("cv1");
let context = canvas.getContext("2d");
let drawable = false;
let x = 0;
let y = 0;

// let img = new Image();
// img.onload = function () {
//   context.drawImage(img, 0, 0, canvas.width, canvas.height);
// };
// img.src = "src/test2.jpg";

canvas.addEventListener("mousemove", (e) => {
  if (drawable == true) {
    move(e);
    draw(x, y);
  }
});

canvas.addEventListener("mousedown", (e) => {
  context.beginPath();
  drawable = true;
});

canvas.addEventListener("mouseup", () => {
  drawable = false;
});

canvas.addEventListener("mouseout", () => {
  out();
});

function move(e) {
  //그림 그릴 수 있는 상태
  x = e.offsetX;
  y = e.offsetY;
  //그림 그리기가 가능한 상태
  console.log(x, y);
}

function out() {
  context.clearRect(0, 0, canvas.width, canvas.height); //캔벗 영역 밖으로 나간 상태
}
function up() {
  //마우스 움직여도 그림 안그려짐
}

function draw(x, y) {
  context.strokeStyle = "black";
  // context.fillStyle = "black";
  // context.arc(x, y, 10, Math.PI * 2, false);

  context.lineWidth = 10;
  context.lineTo(x, y);
  context.stroke();
  // context.fill();
  //마우스 좌표 움직임에 따라 캔버스에 그림 그리는 함수
}
// context.closePath();

// context.moveTo(x, y);
