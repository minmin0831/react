import { Component } from "react";

class Header extends Component {
  render() {
    console.log("Header rendered.");
		let title=this.props.home.home_title;
		let sub=this.props.home.sub;
		console.log(title);
		
    return (
			<main className="header">
				<h1 key="header_title">{title}</h1>
				<h2 key="header_subtitle">{sub}</h2>
			</main>
    )
  }
}

export default Header;