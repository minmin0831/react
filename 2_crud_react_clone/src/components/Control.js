import { Component } from "react";

class Control extends Component {
  render() {
    console.log("Control rendered.");
    return (
      <ul>
        <li><a href="/create" onClick={function(event) {
          event.preventDefault();
          this.props.onChangeMode("create");
          //debugger;
        }.bind(this)}>Create</a></li>

        <li><a href="/update" onClick={function(event) {
          event.preventDefault();
          this.props.onChangeMode("update");
        }.bind(this)}>Update</a></li>
        
        <li><input type="button" value="Delete" onClick={function(event) {
          event.preventDefault();
          this.props.onChangeMode("delete");
          //debugger;
        }.bind(this)}></input></li>
      </ul>
    )
  }
}

export default Control;
