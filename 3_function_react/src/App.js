import React, {Component, useState} from 'react';
import { render } from 'react-dom';
import './App.css';

// 함수로 만든 컴포넌트
function FuncComp(props) { // 함수는 속성을 매개변수로 받는다. 해당 매개변수를 통해 해당 컴포넌트 내 props들을 호출할 수 있다. 
  let numState=useState(props.initNum); // useState라는 함수를 호출하여 class로 만든 컴포넌트의 state 처럼 사용할 수 있다. 
  console.log("전달받은 값: ", numState); // 값을 두 개 전달받은 것을 확인할 수 있다. 0번째 방에는 initNum 값을 받고, 1번째 방에는 FuncComp를 호출하는 함수를 받는다. 

  let num = numState[0];
  let setNum = numState[1];
  console.log("numState 0번째 방에 전달받은 값: ", num);
  console.log("numState 0번째 방에 전달받은 값: ", setNum);
  
  return (
    <div className="container">
      <h2>함수 스타일로 만들어진 컴포넌트</h2>
      <p>형태 : {props.sub} - {num}</p>
      <input
      type="button"
      value="주사위"
      onClick={
        function () {
          setNum(Math.ceil(Math.random()*6));
        }
      }
      ></input>
    </div>
  )
}

// 클래스로 만든 컴포넌트
class ClassComp extends React.Component { // 반면 클래스는 this.props로 어디서든 props를 호출할 수 있다. 
  state={
    num: this.props.initNum,
    subject: this.props.sub
  }
  render() {
    return (
      <div className="container">
        <h2>클래스 스타일로 만들어진 컴포넌트</h2>
        <p>형태 : {this.state.subject} - {this.state.num}</p> 
        <input 
        type="button" 
        value="주사위" 
        onClick={
          function() {
            this.setState({num:Math.ceil(Math.random()*6)})
          }.bind(this)
        }></input>
      </div>
    );
  }
}


function App() {

  return (
    <div className="container">
      <h1>길동이의 홈</h1>
      <FuncComp sub="함수로 랜덤하게 주사위 굴리기" initNum={1}></FuncComp>
      <ClassComp sub="클래스로 랜덤하게 주사위 굴리기" initNum={1}></ClassComp>
    </div>
  );
}

export default App;
