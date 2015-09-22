var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render: function(){
		return (
			<section>
				<div id="success-message" className="success">Message Sent!</div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeave={false}>
					<h3>My Work</h3>
					<span>
						<a href="../../my-sites/Responsive-site/index.html"> work!</a>
					</span>
					<span>
						<a href="../../my-sites/Design-Like-Mad/index.html"> Design Like Mad!</a>
					</span>
					<span>
						<a href="../../my-sites/Simple-Blog/index.html">Simple-Blog</a>
					</span>
				</ReactCSSTransitionGroup>
			</section>
		);
	}
});