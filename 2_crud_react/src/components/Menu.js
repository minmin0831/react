import { Component } from "react";

class Menu extends Component {
  shouldComponentUpdate(newProps, newState) {
    console.log("shouldComponentUpdate 수행", newProps.data, this.props.data);
    if(this.props.data === newProps.data) {
      return false;
    }
    return true; 
    // false로 하면 render 함수를 수해하지 않고 빠져나온다. 
    // true로 하면 menu에 추가된 이후 더 이상 추가항목이 없음에도 불구하고 menu 컴포넌트를 계속 렌더링한다.
    // 그렇다고 false로 설정하면 menu가 애초에 렌더링이 안되어 새로운 menu 컨텐츠가 추가되어도 menu가 렌더링안되는 문제가 발생. 
    // 필요 없는데 계속 다시 그려주면 데이터 성능 저하의 원인이 될 수 있다. 
  }
  render() {
    console.log("Menu rendered");
    let lists = [];
    let data = this.props.data;
    let i;
    for (i = 0; i < data.length; i++) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            data-id={data[i].id}
            onClick={function (event) {
              event.preventDefault();
              this.props.onChangePage(event.target.dataset.id); // event.target.dataset.id 는 
            }.bind(this)}
          >
            {data[i].title}
          </a>
        </li>
      );
    }

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default Menu;
