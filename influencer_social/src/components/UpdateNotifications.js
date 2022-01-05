import { Component } from "react";

class UpdateNotifications extends Component {
  render() {
		console.log("UpdateNotifications rendered");

		let $change = {
      backgroundColor: "yellow"
    };
		let $delete = {
      backgroundColor: "pink"
    };

		let $notifications=this.props.notifications;
		console.log("notifications ", $notifications);
		console.log("notifications_length ", $notifications.length);

		let $notifications_list=[];

		for (let i = 0; i < $notifications.notifications_contents.length; i++) {
      $notifications_list.push(
				<div key={$notifications.notifications_contents[i].id}><span>{$notifications.notifications_contents[i].channel_name}</span>&nbsp;&nbsp;<span>{$notifications.notifications_contents[i].notification_title}</span>&nbsp;&nbsp;
				<span style={$change}><a 
				href={"/notifications/" + $notifications.notifications_contents[i].id} 
				data-id={$notifications.notifications_contents[i].id}
				onClick={function(event) {
					event.preventDefault();
					let id = event.target.dataset.id;
					this.props.onChangeMode("update");
					this.props.onChangeNotificationsId(id);
					//debugger;
					console.log("id ",event.target.dataset.id);
				}.bind(this)}
				>change</a></span>&nbsp;&nbsp;
				<span style={$delete}><a 
				href="/"
				>delete</a></span></div>
      );
    }

		console.log("notifications_list ", $notifications_list);
    return (
			<section className="notifications">
				{$notifications_list}
			</section>
    )
  }
}

export default UpdateNotifications;