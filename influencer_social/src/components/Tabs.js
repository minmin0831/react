import { Component } from "react";

class Tabs extends Component {
  render() {
    console.log("Tabs rendered");
		let tab_menu=[];
		let data=this.props.tab_menu;
		for(let i=0; i<data.length; i++) {
			tab_menu.push(
				<li key={data[i].id}>
					<a href={"/tabs/" + data[i].directory_name}
					data-id={data[i].id}
					onClick={function(event) {
						event.preventDefault();
						console.log("menu clicked")
						console.log(typeof Number(event.target.dataset.id));
						if(Number(event.target.dataset.id) === 1) {
							this.props.onChangeMode("mypage");
						} else if(Number(event.target.dataset.id) === 2) {
							this.props.onChangeMode("notifications");
						} else {
							this.props.onChangeMode("home");
						}
					}.bind(this)}>{data[i].menu}</a>
				</li>
			)
		}
    return (
			<nav>
				<ul>{tab_menu}</ul>
			</nav>
    )
  }
}

export default Tabs;