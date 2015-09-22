var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render: function(){
		return (
			<section>
				<div id="success-message" className="success">Message Sent!</div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeave={false}>
					<h3>About Me</h3>
					<span>
						This is all about me!This is all about me!This is all about me!
						3This is all about me!This is all about me!This is all about me!
					</span>
				</ReactCSSTransitionGroup>
			</section>
		);
	}
});