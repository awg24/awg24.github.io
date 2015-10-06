var React = require("react");
var Pages = require("./Pagination");
var Modal = require("react-modal");
var _ = require("backbone/node_modules/underscore");
var NewPost = require("./NewPost");
var SingleView = require("./SingleView");
var BlogCollection = require("../collections/BlogCollection");
var FakePost = require("../models/BlogModel");
var mockData = require("./MockData");
var blogCollection = new BlogCollection(mockData);

var containerEl = document.getElementById("container");
Modal.setAppElement(containerEl);
Modal.injectCSS()

module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;
		blogCollection.fetch().then(function(data){
			console.log(data);
		}).done(function(){
			blogCollection.add(mockData);
			that.forceUpdate();
		});
	},

	getInitialState: function() {
		return { 
			modalIsOpen: false,
			modalIsOpen2: false, 
			modelToGet: null
		};
	 },
	render: function(){
		var links = [];
		var button = [];
		if(this.props.user.userType === "admin"){
			button.push(<button key="add button" onClick={this.openModal} className="btn btn-primary">Submit a New Post!</button>);
			links.push(<button key="button1" onClick={this.editPost} className="btn btn-info space">Edit</button>);
			links.push(<button key="button2" onClick={this.deletePost} className="btn btn-info space">Delete</button>);
		}
		var that = this;
		console.log(blogCollection);
		var sortedCollection = _.sortBy(blogCollection.models, function(blog){
			var date = new Date(blog.get("createdAt"));
			return -1*date.getTime();
		});
		var pagedContent = pagination(sortedCollection,this.props.page);
		var blogs = pagedContent.map(function(blog, index){
			return (
			<div key={blog.cid} value={blog.cid} className="blog-card center-block">
				<button className="btn btn-primary" value={blog.id} onClick={that.openModal2}>View</button>
				<div className="text-center">
					<h2>{blog.get("title")}</h2>
				</div>
				<div className="content-box padit">
					<p>{blog.get("feelings")}</p>
				</div>
				{links}
			</div>
			);
		});
		return (
		<div>
			<div className="text-center">
				<h1>Recent Posts!</h1>
				{button}
			</div>
			<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
				<NewPost closeModal={this.closeModal} blogCollection={blogCollection} blog={blogCollection.get(this.state.modelToGet)}/>
			</Modal>
			<Modal isOpen={this.state.modalIsOpen2} onRequestClose={this.closeModal2}>
				<SingleView closeModal={this.closeModal2} blog={blogCollection.get(this.state.modelToGet)}/>
			</Modal>
			<br/>
			{blogs}
			<Pages page={this.props.page} myRoutes={this.props.myRoutes} user={this.props.user} content={blogCollection} />
		</div>
		);
	},
	openModal: function() {
		this.setState({modalIsOpen: true, modelToGet:null});
	},
	closeModal: function() {
		this.setState({modalIsOpen: false});
	},
	openModal2: function() {
		this.setState({modalIsOpen2: true, modelToGet:event.target.value});
	},
	closeModal2: function() {
		this.setState({modalIsOpen2: false});
	},
	deletePost: function(){
		var cid = event.path[1].getAttribute("value");
		blogCollection.remove(blogCollection.get({cid: cid}));
		this.forceUpdate();
	},
	editPost: function(){
		var cid = event.path[1].getAttribute("value");
		this.setState({modalIsOpen: true, modelToGet:cid});
	}
});
function pagination(array, page){
	var sectionOf = [];
	var start = 0;
	var stop = 0;
	var index = 0;
	for(var i = 1; i < page; i++){
		start+=5;
	}
	stop = start + 4;
	if(stop > array.length-1){
		stop = array.length-1;
	}
	for(var j = start; j <= stop; j++){
		sectionOf.push(array[j]);
	}
	return sectionOf;
}
