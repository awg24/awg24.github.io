var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<div className="footer-copyright">
				<div>
					<label>Made by Allen Garcia</label>
					<a className="right" href="https://twitter.com/Allenwg">
						<img className="reduce some-margin" src="../../images/Twitter_logo_white.png"/>
					</a>
					<a className="right" href="https://github.com/awg24">	
						<img className="some-margin" src="../../images/Github-Mark-Light-32px.png"/>
					</a>
				</div>
			</div>
		);
	}
});