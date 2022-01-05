import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tabs from "./components/Tabs";
import Mypage from "./components/Mypage";
import Notifications from "./components/Notifications";
import CreateNotifications from "./components/CreateNotifications";
import UpdateNotifications from "./components/UpdateNotifications";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_notifications = 1;
    this.state = {
      mode: "home", // "mypage" "notifications" "update"
      notifications_mode: "hide", // "show"

      select_notification_id: 0,

      tabs: [
        { id: 1, directory_name: "mypage", menu: "my page" },
        { id: 2, directory_name: "notifications", menu: "notifications" },
      ],

      contents: [
        {
          home: {
            id: 1,
            home_title: "Influencer Social Group App",
            sub: "Build your own community and grow your own brand. You will be able to stay connected with your subscribers and share some stuff to entertain them instantly. Sign up now to get started.",
            hero: [
              {
                id: 1,
                title: "Live streaming",
                content: "You can stream live any time and any place you want.",
              },
              {
                id: 2,
                title: "Dynamic chat feature",
                content:
                  "Everyone in your group can share whatever they want in the live chat room.",
              },
            ],
          },
        },
        {
          mypage: {
            id: 2,
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
              { id: 1, interest: "Music" },
              { id: 2, interest: "Yoga" },
              { id: 3, interest: "Movie" },
            ],
          },
        },
        {
          notifications: {
            id: 3,
            notifications_contents: [
              {
                id: 1,
                channel_name: "Snoopies",
                notification_title: "Our first live meetup is about to happen.",
              }
            ],
          },
        },
      ],
    };
  }

  getCurrentNotification() {
    let data = null;
    let contents = this.state.contents[2].notifications.notifications_contents;
    let id = Number(this.state.select_notification_id);
    for (let i = 0; i < contents.length; i++) {
      if (contents[i].id === id) {
        data = contents[i];
        break;
      }
    }
    return data;
  }

  setContent() {
    let $mode = this.state.mode;
    let $article = null;
    if ($mode === "home") {
      $article = <Hero home={this.state.contents[0].home}></Hero>;
    } else if ($mode === "mypage") {
      if (this.state.notifications_mode === "hide") {
        $article = (
          <Mypage
            mypage={this.state.contents[1].mypage}
            onChangeNotificationMode={function (_notifications_mode) {
              this.setState({ notifications_mode: _notifications_mode });
            }.bind(this)}
          ></Mypage>
        );
      } else if (this.state.notifications_mode === "show") {
        $article = (
          <CreateNotifications
            mypage={this.state.contents[1].mypage}
            onChangeNotificationMode={function (_notifications_mode) {
              this.setState({ notifications_mode: _notifications_mode });
            }.bind(this)}
            onSubmit={function (_channel_name, _notification_title) {
              console.log(_channel_name, _notification_title);
              this.max_notifications = this.max_notifications + 1;

              let _notifications_contents = Array.from(
                this.state.contents[2].notifications.notifications_contents
              );
              _notifications_contents.push({
                id: this.max_notifications,
                channel_name: _channel_name,
                notification_title: _notification_title,
              });

              let copied_contents = Array.from(this.state.contents);
              copied_contents[2].notifications.notifications_contents =
                _notifications_contents;

              console.log("copied_contents ", copied_contents);

              this.setState({
                contents: copied_contents,
                mode: "notifications",
              });
            }.bind(this)}
          ></CreateNotifications>
        );
      }
    } else if ($mode === "notifications") {
      let _content = this.getCurrentNotification();
      console.log("contents: ", _content);
      $article = (
        <Notifications
          notifications={this.state.contents[2].notifications}
          onChangeMode={function (_mode) {
            this.setState({
              mode: _mode
            })
          }.bind(this)}
          onChangeNotificationsId={function (_id) {
            this.setState({
              select_notification_id: _id
            });
          }.bind(this)}
        ></Notifications>
      );
    } else if ($mode === "update") {
      $article = (
        <Notifications
          notifications={this.state.contents[2].notifications}
          onChangeMode={function (_mode) {
            this.setState({
              mode: _mode
            })
          }.bind(this)}
          onChangeNotificationsId={function (_id) {
            this.setState({
              select_notification_id: _id
            });
          }.bind(this)}
        ></Notifications>
      )
    }
    return $article;
  }

  render() {
    return (
      <div className="App">
        <Header home={this.state.contents[0].home}></Header>
        <Tabs
          tab_menu={this.state.tabs}
          onChangeMode={function (_mode) {
            if (_mode === "mypage") {
              this.setState({
                mode: "mypage",
                notifications_mode: "hide"
              });
            }
            if (_mode === "notifications") {
              this.setState({
                mode: "notifications",
                notifications_mode: "hide"
              });
            }
          }.bind(this)}
        ></Tabs>
        {this.setContent()}
      </div>
    );
  }
}

export default App;
