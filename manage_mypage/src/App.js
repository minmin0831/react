import "./App.css";
import { Component } from "react";
//import Mypage from "./components/Mypage";
//import Tabs from "./components/Tabs";
import Home from "./components/Tabs";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_noti_id=1;
    this.state={
      mode: "read_home", // "read_mypage" "read_noti"

      tabs: [
        {id: 1, menu: "my page"},
        {id: 2, menu: "notification"}
      ],
      home: {
        title: "Influencer Social Group App",
        sub: "Build your own community and grow your own brand. You will be able to stay connected with your subscribers and share some stuff to entertain them instantly. Sign up now to get started.",
        contents: [
          {
            id: 1,
            title: "Live streaming",
            content: "You can stream live any time and any place you want."
          },
          {
            id: 2,
            title: "Dynamic chat feature",
            content: "Everyone in your group can share whatever they want in the live chat room."
          }
        ]
      },

      mypage: {
        img_src_mode: "read",
        image_src: "images/snoopdog.jpeg", 
        firstname_mode: "read",
        firstname: "Snoop", 
        lastname_mode: "read",
        lastname: "Dog", 
        email: "snoopdog@gmail.com", 
        interest_mode: "read", 
        select_interest_id: 1,
        interests: [
          {id: 1, interest1: "Music"}, 
          {id: 2, interest2: "Yoga"}, 
          {id: 3, interest3: "Movie"}
        ]
      },

      select_noti_id: 1,
      noti: {
        ch_name: "snoopies",
        ch_content: "Our first live meetup is about to happen."
      }
    };
  }

  render() {
    return (
      <div className="App">
        <Home
          home_contents={this.state.home}
          onChangePage={function(page) {
            this.setState({mode: "read_mypage"});
          }.bind(this)}
        ></Home>
        <Tabs
          tab_menu={this.state.tabs}
          onChangeMode={function(_mode) {
            if(_mode === "read_home") {
              this.setState({mode: _mode});
              console.log(this.state.mode);
            } else {
              this.setState({mode: _mode});
              console.log(this.state.mode);
            }
          }.bind(this)}
        ></Tabs>
        <Mypage></Mypage>
      </div>
    );
  }
}

export default App;
