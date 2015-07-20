var React = require("react");

module.exports = React.createClass({
	render: function(){
		console.log(document.documentElement.clientWidth)
		if (document.documentElement.clientWidth <= 500) {
			document.getElementById("banner").style.background = "#EFEFEF url(../assets/bg-image.jpg)"
			document.getElementById("banner").style.backgroundRepeat = "no-repeat";
			document.getElementById("banner").style.backgroundSize = "cover";
			document.getElementById("container").style.color = "#666666";
		} else {
			document.body.style.background = "#EFEFEF url(../assets/bg-image.jpg)"
			document.body.style.backgroundRepeat = "no-repeat";
			document.body.style.backgroundSize = "cover";
			document.body.style.color = "white";
		}
		return (
			<div>
				<div className="container-fluid">
					<div className="col-md-5"></div>
					<div className="col-md-2">
						<img className="img-responsive" src="../../assets/logo.png"/>
					</div>
					<div className="col-md-5">
					</div>
				</div>
				<div className="text-center container">
					<div className="center-block add-bottom-margin change-font">
						ARE YOU READY TO DESIGN LIKE MAD?
					</div>
				</div>
			</div>
		);
	}
});