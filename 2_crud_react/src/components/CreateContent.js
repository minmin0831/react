import { Component } from "react";

class CreateContent extends Component {
  render() {
    console.log("CreateContent rendered");
    return (
      <article>
        <h2>생성하기</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={function (event) {
            event.preventDefault();
            //debugger;
            this.props.onSubmit(event.target.title.value, event.target.desc.value);
            // App.js에 정의한 onSubmit 함수 호출. 파라미터로 아래 input, textarea 태그로 받은 값을 전달한다. 
            alert("제출 성공!");
          }.bind(this)}
        >
          <p><input type="text" name="title" placeholder="제목"></input></p>
          <p><textarea name="desc" placeholder="상세내용"></textarea></p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
