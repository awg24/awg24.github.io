'use strict';
var React = require("react");
var Backbone = require("backbone");
var NavBar = require("./components/NavBar");
var About = require("./components/About");
var Work = require("./components/Work");
var Contact = require("./components/Contact");
var Footer = require("./components/Footer");

var containerEl = document.getElementById("container");
var navEl = document.getElementById("header");
var footerEl = document.getElementById("footer");

React.render(<NavBar/>, navEl);
React.render(<Footer/>, footerEl);

var Site = Backbone.Router.extend({
	routes:{
		"":"about",
		"work":"myWork",
		"about":"about",
		"contact":"contact"
	},
	about: function(){
		React.render(<About/>, containerEl);
	},
	myWork: function(){
		React.render(<Work/>, containerEl);
	},
	contact: function(){
		React.render(<Contact/>, containerEl);
	}
});

var site = new Site();
Backbone.history.start();