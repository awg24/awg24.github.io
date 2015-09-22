var React = require('react');
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");

var Login = require("./components/Login");
var BlogList = require("./components/BlogList");
var NewPost = require("./components/NewPost");
var NoPermission = require("./components/NoPermission");
var User = require("./models/UserModel");
var UserCollection = require("./collections/UserCollection");
var userCollection = new UserCollection();
var Cookies = require("js-cookie");
var containerEl = document.getElementById("container");
var megaObj = Cookies.getJSON();

var Blog = Backbone.Router.extend({
	routes: {
		"": "login",
		"blogs/page/:num/:fromUser": "blogs"
	},
	login: function(){
		var user = new User();
		React.render(<Login myRoutes={this} loggingIn={user} users={userCollection}/>,containerEl);
	},
	blogs: function(num, fromUser){
		var loggedIn = Cookies.getJSON(fromUser);
		if(loggedIn){
			React.render(<BlogList myRoutes={this} user={loggedIn} page={num}/>, containerEl);
		} else {
			React.render(<NoPermission/>, containerEl);
		}
	}
});

var myRoutes = new Blog();
Backbone.history.start();