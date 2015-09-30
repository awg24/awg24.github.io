var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Work = require("./Work");

module.exports = React.createClass({
	render: function(){
		return (
			<section>
				<div id="success-message" className="success">Message Sent!</div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeave={false}>
						<h4>Hi, My name is Allen and welcome to my portfolio site!</h4>
						<p>
							So a little about me.. I grew up in Brownsville, TX, and attended the University of 
							Texas at Brownsville, now named University of Texas Rio Grande Valley. I obtained a Bachelors 
							in Mathematics and an Associates in Computer Science. After I graduated, I became a high school
							math teacher. After a year, I realized that it was not the career path for me. I soon realized
							that I definitely wanted to do programming, which is when I found <a href="http://theironyard.com/courses/front-end-engineering/"><strong>The Iron Yard</strong></a>. I enrolled in their 
							coding bootcamp and embarked on a 3 month journey in Front-End development. 
							Feel Free to look through my samples in the <a href="#work"><strong>work</strong></a> page, and shoot me an email 
							via the <a href="#contact"><strong>contact</strong></a> page if you want to get to know me a little more!<br/>
							<label>This portfolio site is brought to you by React, Backbone, Materialize, Github pages, the letter H, and me!</label>
						</p>
						<div className="row">
							<div className="col s6">
								<h4>Skills:</h4>
								<ul>
									<li>Javascript</li>
									<li>Jquery</li>
									<li>BackboneJS</li>
									<li>ReactJS</li>
									<li>CSS frameworks (Bootstrap, Materialize)</li>
									<li>HTML5</li>
									<li>CSS3</li>
									<li>Sass</li>
									<li>Responsive/Mobile First Design</li>
								</ul>
							</div>
							<div className="col s6">
								<img className="responsive-img resize" src="../../images/me.jpg"/>
							</div>
						</div>
				</ReactCSSTransitionGroup>
			</section>
		);
	}
});