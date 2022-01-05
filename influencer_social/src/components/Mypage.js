import { Component } from "react";

class Mypage extends Component {
  render() {
    let $style = {
      width: 100,
    };
    console.log("Mypage rendered");
    let $mypage = this.props.mypage;
    console.log($mypage);
    let $image = $mypage.image_src;
    let $firstname = $mypage.firstname;
    let $lastname = $mypage.lastname;
    let $email = $mypage.email;
    let $interests_data = $mypage.interests;
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
            onClick={function(event) {
              event.preventDefault();
							this.props.onChangeNotificationMode("show");
            }.bind(this)}
          >
            Send Notifications
          </a>
        </div>
      </section>
    );
  }
}

export default Mypage;
