var React = require("react");
var $ = require("jquery");

module.exports = React.createClass({
	render: function(){
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo left"><i className="large material-icons">invert_colors</i></a>
					<ul id="nav-mobile" className="right">
						<li><a href="#about">About</a></li>
						<li><a href="#work">My Work</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
			   </div>
			 </nav>
		)
	}
});
