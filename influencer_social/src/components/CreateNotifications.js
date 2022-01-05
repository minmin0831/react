import { Component } from "react";

class CreateNotifications extends Component {
  render() {
    console.log("CreateNotifications rendered");
    let $style = {
      width: 100,
    };
    console.log("Mypage rendered");
    let $mypage = this.props.mypage;
    console.log("mypage ", $mypage);
    let $image = $mypage.image_src;
    let $firstname = $mypage.firstname;
    let $lastname = $mypage.lastname;
    let $email = $mypage.email;
    let $interests_data = $mypage.interests;
		console.log("interests ", $interests_data);
    let $interests_list = [];
    for (let i = 0; i < $interests_data.length; i++) {
      $interests_list.push(
        <li key={$interests_data[i].id}>{$interests_data[i].interest}</li>
      );
    }

    return (
      <section className="mypage">
        <img style={$style} src={$image}></img>
        <div>
          <span>{$firstname}</span>
          <span>{$lastname}</span>
        </div>
        <div>
          <span>{$email}</span>
        </div>
        <ul>{$interests_list}</ul>
        <div>
          <a
            key={"/create_notifications/" + $mypage.id}
            data-id={$mypage.id}
            href="/"
            onClick={function (event) {
              event.preventDefault();
              this.props.onChangeNotificationMode("hide");
            }.bind(this)}
          >
            Cancel
          </a>
        </div>
        <div>
          <form
            action="/create_notifications"
            method="post"
            onSubmit={function (event) {
              event.preventDefault();
							this.props.onSubmit(event.target.channel_name.value, event.target.notification_title.value);
							alert("New notification sent!");
            }.bind(this)}
          >
            <p>
              <input name="channel_name" type="text"></input>
            </p>
            <p>
              <textarea name="notification_title" type="text"></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateNotifications;
