import { Component } from "react";

class Control extends Component {
  render() {
    console.log("Control rendered");

    return (
      <ul>
        <li>
          <a
            href="/create"
            onClick={function (event) {
              event.preventDefault();
              this.props.onChangeMode("create");
            }.bind(this)}
          >
            생성하기
          </a>
        </li>
        <li>
          <a
            href="/update"
            onClick={function (event) {
              event.preventDefault();
              this.props.onChangeMode("update");
            }.bind(this)}
          >
            수정하기
          </a>
        </li>
        <li>
          <input
            type="button"
            value="삭제하기"
            onClick={function (event) {
              event.preventDefault();
              this.props.onChangeMode("delete");
            }.bind(this)}
          ></input>
        </li>
      </ul>
    );
  }
}

export default Control;
