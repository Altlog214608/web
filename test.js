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



let x; //전역변수 x 선언, var 로 선언해도 동일
let z; //전역변수 z 선언

function f(){ //함수 f() 선언
    let y; //지역변수 y 선언
    x = 10; //전역변수 x에 10 저장
    y = 20; //지역변수 y에 20 저장
    z = 30; //전역변수 z 선언 및 30 초기화
    if(y==20){ //if block 지역변수 y
        let b = 40; //블록변수 b 선언
        b++ //b = 41
    }
    //1.b빼고 다 접근 가능
}
//2. x와 z 접근 가능


console.log(x); //undefined
// console.log(b); //ReferenceError: b is not defined
console.log(z); //is not defined
console.log('Hello, Node.js!');

// var x = 10; // 전역변수 x선언
function xx(){ //함수 xx() 선언    
    var x; // 지역변수 x 선언
    x=1; // 지역변수 x에 1 저장
    this.x=100; // 전역변수 x에 100 할당당
}
console.log(x);

//let으로 선언된 변수는 this로 접근할 수 없음
//var로 선언된 전역변수: var로 선언된 전역변수는 전역 객체의 속성으로 저장된다.
//브라우저 환경에서 전역객체란? -> window객체이고 this로 접근: window.과 this. 같다

var globalVar = 100;
console.log(this.globalVar); // 100)

//var와 let의 작동상 차이점
//var는 동일한 변수를 재선언 할 수 있음
//let은 동일한 변수는 재선언 할 수 없음  
//let은 변수의 사용범위를 블록으로 제한
//var는 제한 없음.

var a = 1;
if(true){
    var a = 2;
    console.log(a); // 2
}
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
let today = new Date();
let msg = new String('Hello, Node.js!');
//객체에 대한 접근 : .을 찍어서 접근
//객체 프로퍼티와 메서드가 있음
//자바스크립트에서는 객체의 소멸 방법 없음
//가비지컬렉터에 의해 자동 소멸, 자동 관리 됨

//Array 객체
let arr = [1, 2, 3, 4, 5];
let n = ['apple', 'banana', 'cherry'];
//인덱스로 접근 가능
arr[0]="apple"; //인덱스를 통한 접근 후 값 변경
let a = new Array("1","2","3");
let b = new Array(7); 
b[0] = "apple";
let c = new Array(); //빈 배열 생성성
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
let d = new Date(2024,11,1);//24년도 12월 1일
let now = new Date(); //현재시간 객체 생성
let date = now.getDate(); //날짜(1~31)
let month = now.getMonth() + 1; //달(1~12)
let year = now.getFullYear(); //년
let hour = now.getHours(); //시간(0~23)
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
document.getElementById(); 
document.body.style.backgroundColor = "red"; 




//3.프로토타입 객체 : Object, Function, Array, Date, RegExp, String, Number, Boolean
//4.BOM : Window, Document, Location, History
//5.window 객체 : window.open(), window.close(), window.alert(), window.confirm(), window.prompt(), window.location, window.history, window.navigator, window.screen, window.innerWidth



let obj = {
    name: 'John',
    age: 30,
    sayHello: function(){
        console.log(`Hello, my name is ${this.name}`);
    }
};