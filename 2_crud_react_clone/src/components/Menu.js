import { Component } from "react";

class Menu extends Component {
  shouldComponentUpdate(newProps, newState) {
    console.log("shouldComponentUpdate executed.", newProps.data, this.props.data);
    if(this.props.data === newProps.data) {
      return false;
    }
    return true;
  }
  
  render() {
    console.log("Menu rendered.");
    let lists = [];
    let data = this.props.data;
    let i;
    for(i = 0; i < data.length; i++) {
      lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id} // 페이지 경로 설정.
      data-id={data[i].id} 
      onClick={function(event) {
        event.preventDefault();
        this.props.onChangePage(event.target.dataset.id); // 클릭한 태그의 dataset은 순서에 비례한다. 단, 시작은 1이다. 태그는 항상 자동으로 순서를 1부터 매긴다. 
      }.bind(this)}>{data[i].title}</a></li>);
    }

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    )
  }
}

export default Menu;
