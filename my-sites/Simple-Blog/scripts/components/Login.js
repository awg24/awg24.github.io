var React = require("react");
var User = require("../models/UserModel");
var $ = require("jquery");
var userCount = 0;
var Cookies = require("js-cookie");
module.exports = React.createClass({
	getInitialState: function(){
		return {
			errors: {}
		}
	},
	render: function(){
		return (
		<div className="text-center change-line shape shift-more-down">
			<div className="text-left">
				<h3>Login</h3>
			</div>
			<br/>
			<form onSubmit={this.loginUser}>
				<input ref="username" className="style-input2" placeholder="username" type="text"/>
				<label className="error">{this.state.errors.username}</label>
				<br/><br/>
				<input className="style-input2" ref="password" type="password" placeholder="super secret password"/>
				<label className="error">{this.state.errors.password}</label>
				<br/><br/>
				<label>admin:</label>  <input name="user-type" value="admin" type="radio"/>
				<div className="in-line"> </div>
				<label>reader:</label> <input name="user-type" value="reader" type="radio"/>
				<label className="error">{this.state.errors.userType}</label>
				<br/><br/>
				<input type="submit" className="btn btn-primary btn-md center-block add-bottom-margin"Login />
			</form>
		</div>
		);
	},
	loginUser: function(event){
		event.preventDefault();
		var user = this.props.loggingIn;

		user.set("id",userCount);
		user.set("username", this.refs.username.getDOMNode().value);
		user.set("password", this.refs.password.getDOMNode().value);
		user.set("userType", $("input[name='user-type']:checked").val());

		if(!user.isValid()){
			this.setState({errors: user.validationError})
		} else {
			userCount++;
			this.props.users.add(user);
			Cookies.set(user.get("username"), user);
			this.props.myRoutes.navigate("blogs/page/"+1+"/"+user.get("username"), {trigger: true});
		}
	}
});