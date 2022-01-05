import { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    // UpdateContent 컴포넌트를 초기화시키는 생성자
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    };

    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  // 모든 input에 값이 들어올 때 수정가능하도록 하는 함수
  inputFormHandler(event) {
    this.setState({[event.target.name]: event.target.value});
    // function (event) {this.setState({title: event.target.value})}.bind(this);를 this.inputFormHandler와 같은 구문으로 리팩토링할 수 있다. 
    // onChange={this.inputFormHandler} 
    // 중괄호 안에 객체타입을 넣을 수 있다. 
    // 어떤 태그든 이벤트가 발생하면 해당 태그의 속성이 .name 부분에, 속성값이 .value에 들어간다. 
  }

  render() {
    console.log(this.props.data);
    console.log("UpdateContent rendered");
    return (
      <article>
        <h2>수정하기</h2>
        <form
          action="/update_process"
          method="post"
          onChange={function () {
            document.title.value = this.props.data.title
            document.desc.value = this.props.data.desc
          }.bind(this)}
          onSubmit={function (event) {
            event.preventDefault();
            //debugger;
            this.props.onSubmit(
              // event.target.title.value,
              // event.target.desc.value
              this.state.id, this.state.title, this.state.desc
            );
            // App.js에 정의한 onSubmit 함수 호출. 파라미터로 아래 input, textarea 태그로 받은 값을 전달한다.
            alert("수정 성공!");
          }.bind(this)}>
          <input name="id" type="hidden" value={this.state.id}></input>
          <p>
            <input type="text" name="title" 
            value={this.state.title}
            onChange={this.inputFormHandler}
            ></input>
          </p>
          <p>
            <textarea name="desc" cols="80" rows="5"
            value={this.state.desc}
            onChange={this.inputFormHandler} // onChange 속성을 이용하지 않으면, 텍스트 수정을 할 수 없다. 
            ></textarea>
          </p>
          <p>
            <input type="submit" value="수정"></input>
          </p>
        </form>
      </article>
    );

    // value={this.props.data.title}을 value에 넣어 client 화면 상에 수정할 게시물의 데이터를 뿌려준다. 
    // 위와 같은 방식으로 직접 때려박으면, 텍스트가 생성이 되는 것이라 수정이 불가하다. 
  }
}

export default UpdateContent;
