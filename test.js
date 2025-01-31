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
var mybox = document.getElementById("zboxcont");
console.log(mybox);
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

//3.프로토타입 객체 : Object, Function, Array, Date, RegExp, String, Number, Boolean
//4.BOM : Window, Document, Location, History
//5.window 객체 : window.open(), window.close(), window.alert(), window.confirm(), window.prompt(), window.location, window.history, window.navigator, window.screen, window.innerWidth
