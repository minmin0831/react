import { Component } from "react";

class Subject extends Component {
    render() {
      console.log('Subject rendered');
        const style = {
            backgroundColor: 'white',
            color: 'black',
        }
      return (
        <header>
          <h1 style={style}><a href="/" onClick={function(event) {
            event.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          <p>{this.props.sub}</p>
        </header>
      );
    }
  }

  export default Subject;