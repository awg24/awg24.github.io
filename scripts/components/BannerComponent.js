var React = require("react");

module.exports = React.createClass({
	render: function(){
		var logoutBtn = [];
		if(this.props.loggedInUser.attributes.username){
			logoutBtn.push(<a key="1" className="pull-right" onClick={this.logoutUser}>LOGOUT</a>);
		} 
		return (
			<div>
				<div className="container-fluid">
					<div className="col-md-5"></div>
					<div className="col-md-2">
						<img className="img-responsive" src="../../assets/logo.png"/>
					</div>
					<div className="col-md-5">
						{logoutBtn}
					</div>
				</div>
				<div className="text-center container">
					<div className="center-block add-bottom-margin change-font">
						ARE YOU READY TO DESIGN LIKE MAD?
					</div>
				</div>
			</div>
		);
	},
	logoutUser: function(){
		var that = this;
		this.props.loggedInUser.logout({
			success: function(userModel) {
				console.log('user was logged out');
				that.props.routing.navigate("", {trigger:true});
			},
			error: function(userModel, response) {
				console.log('problem logging out the user', response.responseJSON);
			}
		});
	}
});