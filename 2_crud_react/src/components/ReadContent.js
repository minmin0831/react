import { Component } from "react";

class ReadContent extends Component {
  render() {
    console.log("ReadContent rendered");
    return (
      <article>
        <h2>{this.props.title}</h2>
        <h3>{this.props.desc}</h3>
      </article>
    );
  }
}

export default ReadContent;
