var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render: function(){
		return (
			<section>
				<div id="success-message" className="success">Message Sent!</div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeave={false}>
					<h4>Some Samples for Viewing</h4>
					<div className="row">
						<div className="col s12 m6 l4">
							<div className="card medium">
								<div className="card-image">
									<a href="../../my-sites/Responsive-site/index.html"><img src="../../images/rs.png"/></a>
								</div>
								<div className="card-content">
									<span className="card-title">Responsive Site</span>
									<p>This is an example of responsive design, and mobile first development.
									Note: The buttons are not actually functional</p>
								</div>
								<div className="card-action">
									<a href="../../my-sites/Responsive-site/index.html">Take a look!</a>
								</div>
							</div>
						</div>
						<div className="col s12 m6 l4">
							<div className="card medium">
								<div className="card-image">
									<a href="../../my-sites/Simple-Blog/index.html"><img src="../../images/sbl.png"/></a>
								</div>
								<div className="card-content">
									<span className="card-title">Simple Blog Platform</span>
									<p>Example of a simple blogging platform using React, and Backbone.
									 The blog uses CookieJS for simulated user permissions, but any user/password combination will let you in,
									  feel free to add any posts!</p>
								</div>
								<div className="card-action">
									<a href="../../my-sites/Simple-Blog/index.html">Take a look!</a>
								</div>
							</div>
						</div>
						<div className="col s12 m12 l4">
							<div className="card medium">
								<div className="card-image">
									<a href="../../my-sites/Design-Like-Mad/index.html"><img src="../../images/dlm.png"/></a>
								</div>
								<div className="card-content">
									<span className="card-title">Design Like Mad</span>
									<p>
										Used a sorting algorithm to sort applicants intelligently into appropriate 
										non-profit teams based on the applicant’s skill rating, designer type, and the non-profits project type. 
										It also allows applicants to apply, and organizers to check on the applicant’s portfolio and rate them.
										Use user3/1234 or admin3/1234 for username/password, or just sign up on your own!
									</p>
								</div>
								<div className="card-action">
									<a href="../../my-sites/Design-Like-Mad/index.html">Take a look!</a>
								</div>
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup>
			</section>
		);
	}
});