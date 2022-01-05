import { Component } from "react";

class CreateContent extends Component {
  render() {
    console.log("CreateContent rendered.");
    return (
      <article>
        <h2>Create Content</h2>
        <form action="/create_process" method="post" onSubmit={function(event) {
          event.preventDefault();
          this.props.onSubmit(event.target.title.value, event.target.desc.value);
          alert("Submitted!");
        }.bind(this)}>
          <p><input type="text" name="title" placeholder="title"></input></p>
          <p><textarea name="desc" placeholder="description"></textarea></p>
          <p><input type="submit"></input></p>
        </form>
        </article>
    )
  }
}

export default CreateContent;
