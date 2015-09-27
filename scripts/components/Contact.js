var React = require("react/addons");
var $ = require("jquery");
var _ = require("backbone/node_modules/underscore");
var validator = require('validator');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	getInitialState: function(){
		return {
			errors: {},
			success: null
		};
	},
	render: function(){
		return (
			<section>
				<div id="success-message" className="success">Message Sent!</div>
				<ReactCSSTransitionGroup transitionName="example" component="div" transitionAppear={true} transitionLeave={false}>
					<h4>So you want to talk, hm?</h4>
					<form>
						<div className="input-field">
							<input type="text" ref="name" placeholder="Name"/>
						</div>
						<label>{this.state.errors.name}</label>
						<div className="input-field">
							<input type="text" ref="sender" placeholder="Email"/>
						</div>
						<label>{this.state.errors.sender}</label>
						<div className="input-field">
							<textarea className="materialize-textarea" ref="message" placeholder="Message Me"></textarea>
						</div>
						<label>{this.state.errors.message}</label><br/><br/>
						<a onClick={this.submitForm} className="waves-effect waves-light btn">Submit</a>
					</form>
				</ReactCSSTransitionGroup>
			</section>
		);
	}, 
	submitForm: function(){
		var that = this;
		var sender = this.refs.sender.getDOMNode().value;
		var message = this.refs.message.getDOMNode().value;
		var name = this.refs.name.getDOMNode().value;
		var isNotValid = validation(sender, message, name);
		if(isNotValid){
			this.setState({errors: isNotValid});
		} else {
			that.setState({errors: {}});
			document.getElementById("success-message").style.opacity = 1;
			document.getElementById("success-message").innerHTML = "Sending...";
			$.ajax({
				type: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				data: {
					'key': '5Xi8gAWN9LOqELzZW0wNuw',
					'message': {
					'from_email': sender ,
					'to': [
						{
						'email': 'allen.wes.g@gmail.com',
						'name': 'Wes',
						'type': 'to'
						}
						],
					'autotext': 'true',
					'subject': 'From your portfolio site from '+ name,
					'html': "<p>"+message+"</p>"
					}
				}
					}).done(function(response) {
						document.getElementById("success-message").innerHTML = "Message Sent!";
						window.setTimeout(function(){
							that.props.router.navigate("about", {trigger: true});
						},700);
					});
		}
	}
});
function validation(sender, message, name){
	var error = {};
	if(sender === ""){
		error.sender = "Field must not be left blank!";
	} else if (!validator.isEmail(sender)){
		error.sender = "Must be a valid email!";
	}
	if(message === ""){
		error.message = "Field must not be left blank!";
	}
	if(name === ""){
		error.name = "Field must not be left blank!";
	}

	if(_.isEmpty(error)){
		return false;
	} else {
		return error;
	}

}