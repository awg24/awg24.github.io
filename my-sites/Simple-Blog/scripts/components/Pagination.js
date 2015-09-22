var React = require("react");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			currentPage: 1
		};
	},
	render: function(){
		var that = this;
		var nums = getPageNumbers(this.props.content);
		var pages = nums.map(function(num, index){
			return (<li key={index}><a onClick={that.setNum} value={num} href={"#blogs/page/"+num+"/"+that.props.user.username}>{num}</a></li>);
		});
		return (
		<nav className="text-center">
		  <ul className="pagination">
			<li>
			  <a onClick={this.goBack} value={this.state.currentPage} href={"#blogs/page/"+this.state.currentPage+"/"+this.props.user.username} aria-label="Previous">
				<span aria-hidden="true">&laquo;</span>
			  </a>
			</li>
			{pages}
			<li>
			  <a onClick={this.goForward} value={this.state.currentPage} href={"#blogs/page/"+this.state.currentPage+"/"+this.props.user.username} aria-label="Next">
				<span aria-hidden="true">&raquo;</span>
			  </a>
			</li>
		  </ul>
		</nav>
		);
	},
	setNum: function(e){
		this.setState({currentPage:parseInt(event.target.getAttribute("value"))});
	},
	goBack: function(){
		if(this.state.currentPage !== 1){
			var newNum = this.state.currentPage - 1;
			this.setState({currentPage: newNum});
		}
	},
	goForward: function(){
		if(this.state.currentPage < Math.ceil(this.props.content.length/5)){
			var newNum = this.state.currentPage + 1;
			this.setState({currentPage: newNum});
		}
	}
});
function getPageNumbers(array){
	var pages = [];
	var number = Math.ceil(array.length/5);

	for(var i = 1; i  <= number; i++){
		pages.push(i);
	}
	return pages;
}