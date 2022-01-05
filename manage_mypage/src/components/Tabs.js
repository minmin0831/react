import { Component } from "react";

class Tabs extends Component {
  render() {
    console.log("Tabs rendered.");
    let lists=[];
    let data=this.props.tabs;
    for(let i=0; i<data.length; i++) {
      lists.push(
        <li key={data[i].id}><a 
        href={"/tabs/" + data[i].id} 
        data-id={data[i].id}
        onClick={function(event) {
          event.preventDefault();
          //this.props.onChangePage(event.target.dataset.id);
          if(event.target.dataset.id === 1) {
            this.props.onChangeMode("read_mypage");
          } 
          if(event.target.dataset.id === 2) {
            this.props.onChangeMode("read_noti");
          }
          
        }.bind(this)}>{data[i].menu}</a></li>
      )
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    )
  }
}

export default Tabs;
