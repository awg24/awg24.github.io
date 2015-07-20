var React = require("react");
var Backbone = require("backbone");

var LoginPortal = require("./components/LoginPortal");
var SignUpPortal = require("./components/SignUpPortal");
var ApplicationPage = require("./components/ApplicationPage");
var NonProfitApp = require("./components/NonProfitApplication");
var OrgPage = require("./components/OrganizationPage");
var ResultsPage = require("./components/ResultsPage");
var NoPremission = require("./components/NoPremission");
var Banner = require("./components/BannerComponent");
var SuccessPage = require("./components/SubmitSuccess");

var containerEl = document.getElementById("container");
var bannerEl = document.getElementById("banner");
var UserModel = require("./models/UserModel");
var AppBanner = require("./components/AppBanner");
var user = new UserModel(); 


var App = Backbone.Router.extend({
	routes: {
		"": "signUp",
		"login": "login",
		"signUp": "signUp",
		"application/:type":"application",
		"results":"results",
		"success":"submitSuccess"
	},
	login: function(){
		document.body.style.background = "#EFEFEF url(../assets/bg-image.jpg)"
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundSize = "cover";
		document.body.style.color = "white";
		React.render(<Banner loggedInUser={user} routing={myRoutes} />, bannerEl);
		React.render(<LoginPortal loggingIn={user} routing={this} />, containerEl);
	},
	signUp: function(){
		//document.body.style.background = "#EFEFEF url(../assets/bg-image.jpg)"
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundSize = "cover";
		document.body.style.color = "white";
		React.render(<Banner loggedInUser={user} routing={myRoutes} />, bannerEl);
		React.render(<SignUpPortal routing={this} user={user} />, containerEl);
	},
	submitSuccess: function(){
		var that = this;
		React.render(<AppBanner loggedInUser={user} routing={this}/>, document.getElementById("banner"));
		user.me({
			error: function(user, res){
				console.log(res);
				that.navigate("", {trigger: true});
			},
			success: function(){
				React.render(<SuccessPage routing={that} loggedInUser={user}/>, containerEl);
			}
		});
	},
	results: function(){
		React.render(<AppBanner loggedInUser={user} routing={this}/>, document.getElementById("banner"));
		var that = this;
		user.me({
			error: function(user, res){
				console.log(res);
				that.navigate("", {trigger: true});
			},
			success: function(){
				if(user.attributes.userType === "organizer"){
					React.render(<ResultsPage routing={that} user={user} />, containerEl);
				} else {
					React.render(<NoPremission />, containerEl);
				}
			}
		});
	},
	application: function(type){
		var that = this;
		user.me({
			error: function(user, res){
				console.log(res);
				that.navigate("", {trigger: true});
			},
			success: function(model){
				document.body.style.background = "#EFEFEF"
				document.body.style.color = "#666666"
				React.render(<AppBanner loggedInUser={user} routing={that}/>, document.getElementById("banner"));
				if(type === "non-profit" && user.attributes.userType === type){
					React.render(<NonProfitApp userType={type} loggedInUser={user} routing={that} />, containerEl);
				} else if(type === "applicant" && user.attributes.userType === type){
					React.render(<ApplicationPage userType={type} loggedInUser={user} routing={that} />, containerEl);
				} else if(user.attributes.userType === "organizer"){
					React.render(<OrgPage userType={type} loggedInUser={user} routing={that} />, containerEl);
				} else {
					React.render(<NoPremission />, containerEl);
				}
			}
		})
		
	}
});

var myRoutes = new App();

// React.render(<Banner loggedInUser={user} routing={myRoutes} />, bannerEl);
Backbone.history.start();
