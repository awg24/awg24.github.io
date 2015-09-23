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
									<img src="../../images/rs.png"/>
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
									<img src="../../images/sbl.png"/>
								</div>
								<div className="card-content">
									<span className="card-title">Simple Blog Platform</span>
									<p>Example of a simple blogging platform using React, and Backbone.
									 The blog uses CookieJS for simulated user permissions, and mockaroo for mock data</p>
								</div>
								<div className="card-action">
									<a href="../../my-sites/Simple-Blog/index.html">Take a look!</a>
								</div>
							</div>
						</div>
						<div className="col s12 m12 l4">
							<div className="card medium">
								<div className="card-image">
									<img src="../../images/dlm.png"/>
								</div>
								<div className="card-content">
									<span className="card-title">Design Like Mad</span>
									<p>
										Used a sorting algorithm to sort applicants intelligently into appropriate 
										non-profit teams based on the applicant’s skill rating, designer type, and the non-profits project type. 
										It also allows applicants to apply, and organizers to check on the applicant’s portfolio and rate them
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