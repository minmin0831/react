import { Component } from "react";

class Hero extends Component {
  render() {
    console.log("Hero rendered.");
		let heros=[];
		for(let i=0; i<this.props.home.hero.length; i++) {
			heros.push(<div><h2 key={"home_title" + this.props.home.hero[i].id}>{this.props.home.hero[i].title}</h2>
				<p key={"home_content" + this.props.home.hero[i].id}>{this.props.home.hero[i].content}</p></div>);
		}
    return (
			<main className="hero">
      	<div>{heros}</div>
			</main>
    )
  }
}

export default Hero;