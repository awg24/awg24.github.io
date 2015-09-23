var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render: function(){
		return (
			<section>
				<div id="success-message" className="success">Message Sent!</div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeave={false}>
						<h4>Hi, My name is Allen and welcome to my portfolio site!</h4>
						<label>Go Away.</label>
						<p>
							Just kidding, so a little about me.. I grew up in Brownsville, TX, attended the University of 
							Texas at Brownsville, now named University of Texas Rio Grande Valley. I obtained a Bachelors 
							in Mathematics, and an Associates in Computer Science. After I graduated, I became a high school
							math teacher, and after a year I realized that it was not the career path for me. I soon realized
							that I definitely wanted to do programming, which is when I found The Iron Yard. I enrolled in their 
							coding bootcamp and embarked on a 3 month jounrney in Front-End development.<br/>
							Feel Free to look through my samples via the <strong>Work</strong> tab, and shoot me an email 
							via <strong>Contact!</strong>
						</p>
						<h4>Skills:</h4>
						<ul>
							<li>Javascript</li>
							<li>Jquery</li>
							<li>BackboneJS</li>
							<li>ReactJS</li>
							<li>CSS frameworks (Bootstrap, Materialize)</li>
							<li>HTML5</li>
							<li>CSS3</li>
							<li>Responsive/Mobile First Design</li>
						</ul>
				</ReactCSSTransitionGroup>
			</section>
		);
	}
});