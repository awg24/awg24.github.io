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
		"about":"about",
		"work": "work",
		"contact":"contact"
	},
	about: function(){
		React.render(<About />, containerEl);	
	},
	contact: function(){
		React.render(<Contact router={this}/>, containerEl);
	},
	work: function(){
		React.render(<Work />, containerEl);
	}
});

var site = new Site();
Backbone.history.start();
