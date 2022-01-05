import { Component } from "react";

class Home extends Component {
  render() {
    console.log("Home rendered.");
		let _home=this.home;
		let _title=_home.title;
		let _sub=_home.sub;
		let _heros=[];
		for(let i=0; i<_home.contents.length; i++) {
			_heros.push(<div><h2 key={_home.contents[i].id}>{_home.contents[i].title}</h2>
				<p key={_home.contents[i].id}>{_home.contents[i].content}</p></div>);
		}
    return (
			<main className="home">
				<h1>Title</h1>
				<h2>{_sub}</h2>
      	<div>{_heros}</div>
			</main>
    )
  }
}

export default Home;