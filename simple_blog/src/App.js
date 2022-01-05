import React, {useState} from 'react'; // useState는 react의 내장 함수
import './App.css';


function App() {
  // 데이터 바인딩
  let posts = "강남 고기 맞집";
  
  // 스타일 변수
  let style= {color: 'blue', fontSize: '30px'};
  
  let [subject, setSubject] = useState(['남자 코트 추천', '강남 우동 맞집', '파이썬 독학']); // [a, b] 의 배열이 생성된다. a에는 '남자 코트 추천'이라는 데이터가, b에는 이 데이터를 수정할 수 있는 함수가 들어간다. 
  // Descructuring이라는 ES6 신규 문법이다. array, object에 있던 자료를 변수에 쉽게 담고 싶을 때 사용한다. 
  let [date, setDate] = useState(['2021-09-20', '2021-10-20', '2021-11-20']);  
  let [like, setLike] = useState(0);
  
  function changeSubject() {
    // let newArray = subject; // 값 공유
    let newArray = [...subject]; // ... 이라는 spread 오퍼레이터 사용. subject의 모든 자료를 deep copy 한다. 
    newArray[0] = "여자 코트 추천";
    setSubject(newArray); 
  }

  return (
    <div className="App">
      <div>
        <nav className="black-nav" >
          <div style={ style }>개발 Blog</div>
        </nav>
        <div className="list">
        <button onClick={ changeSubject }>버튼</button>
          <h3>{ subject[0] }<span onClick={ () => { setLike(like + 1) } }>😍</span>{ like }</h3>
          <p>{ date[0] }</p>
          <h3>{ subject[1] }</h3>
          <p>{ date[1] }</p>
          <h3>{ subject[2] }</h3>
          <p>{ date[2] }</p>
          <hr />
        </div>
      </div>

      <Modal subject={subject}/>

    </div>
  );
}

/* 
Component 만드는 법
1. 함수 만들고 이름 짓고
2. 축약을 원하는 HMTL 넣고
3. 원하는 곳에서 <함수명 />
주의사항: 
- 함수명 첫 글자는 대문자
- return() 안에 있는건 태그 하나로 묶어야 한다. 
- div를 꼭 나누어 사용하고 싶으면 fragment 라는 문법을 이용한다. <> ~내용~ </>

Component를 만드는 기준:
- 반복적으로 출현하는 리스트
- 자주 바뀌는 HTML UI (성능적인 이점)
- 페이지 구성

*/

function Modal() {

  return (
    <>
    <div className="modal">
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세 내용</p>
    </div>
    <div></div>
    </>
  )
}

export default App;

/*
1. className은 JSX 문법이다. HTML의 class를 대체한다. 
2. React를 사용하는 이유: 
  - 서버의 데이터를 바인딩하기 편리하다. 
  - 선언만 하고 html 내 어디든 {}를 삽입하여 안에 대입하여 사용만하면 된다. 
  - 변수명, 함수 등 바인딩할 수 있다. 
3. JSX에서 Style 속성을 집어넣읗 수 있다.
  - 다만 style={object 자료형으로 만든 스타일} 방식으로 넣어야 한다. 일반 html의 inline style 적용 방식은 js에서 민감한 기호들이 많이 사용되기 때문에 에러를 일으킨다. 
4. State는 변수 대신 사용하는 데이터 저장 공간이다. useState를 이용해 만들어야 한다. 
5. State에는 문자, 숫자, array, object 모두 저장이 가능하다. 
6. State에 데이터를 저장해놓는 이유: state가 변경되면 HTML은 자동으로 다시 렌더링된다. 
  - 반면, 일반 변수는 변경되어도 재렌더링이 안되고 새로고침을 해야만 데이터가 변경되어 표현된다. 
7. 이벤트 다루는 법:
  - onClick={클릭될 때 실행할 함수}
  - onClick={ () => {실행할 내용} }
8. setLike(대체할 데이터)
  - set 함수를 이용해야 state 변경과 동시에 재렌더링을 시킨다. 
9. Array, Object state 데이터 수정 방법
  - 일단 변경하는 함수를 생성한다. function changeSubject() {}
  - state는 직접 수정하면 안되기 때문에, 이것을 deep copy 해야 한다. 
  - 변경 함수 내에서 set 함수를 사용하여 데이터를 대체한다. 
    let newArray = [...subject]; // ... 이라는 ES6의 spread 오퍼레이터 사용. subject의 모든 자료를 deep copy 한다. 
    newArray[0] = "여자 코트 추천";
  - set 함수에 대체할 데이터를 입력한다. 
    setSubject(newArray);
*/