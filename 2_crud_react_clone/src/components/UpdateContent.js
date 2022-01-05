import { Component } from "react";

class UpdateContent extends Component {
    // UpdateContent를 초기화시키는 생성자
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      };
      this.inputFormHandler = this.inputFormHandler.bind(this); // 함수를 호출할 때 this 바인딩을 해야한다. 
    }
    
    // input태그로 불러온 데이터 수정을 가능하게 하는 함수
    inputFormHandler(event) {
      this.setState({[event.target.name]: event.target.value});
    }

  render() {
    console.log(this.props.data);
    console.log("UpdateContent rendered.");
    return (
      <article>
        <h2>Update</h2>
        <form action="/update_process" method="post" 
        onChange = {function() {
          document.title.value = this.props.data.title
          document.desc.value = this.props.data.desc
        }.bind(this)}
        onSubmit={function(event) {
          event.preventDefault();
          this.props.onSubmit(this.state.id, this.state.title, this.state.desc); 
          // form 태그를 post할 때, hidden input 태그로 수정한 content의 id도 함께 전달. 
          alert("Updated!");
        }.bind(this)}
        >
          <input name="id" type="hidden" value={this.state.id}></input>
          <p>
            <input type="text" name="title" value={this.state.desc} onChange={this.inputFormHandler}></input>
          </p>
        </form>
      </article>
    )
  }
}

export default UpdateContent;
