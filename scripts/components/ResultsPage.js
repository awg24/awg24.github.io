var React = require("react");
var async = require("async");
var _ = require("backbone/node_modules/underscore");
var Ratings = require("../collections/RelationCollection");
var Users = require("../collections/UserCollection");
var NonProfits = require("../collections/NonProfitCollection");
Parse.initialize("S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj", "9MYqzYFPqsuMvKAchWSBVZiK3sxzG5hr8jWJ6FU1");

var applicants = new Users();
var nonProfits = new NonProfits();
var ratings = new Ratings();

module.exports = React.createClass({
	getInitialState: function(){
		return {
			results: {average: 23}
		};
	},
	componentWillMount: function(){
		this.calculateResults();
	},
	render: function(){
		return (
			<div>
				<h2>{this.state.results.average}</h2>
			</div>
		);
	},
	calculateResults: function(){
		console.log("do i work?")
		async.parallel([
			function(callback){
				Parse.Cloud.run("storeUserRating",null, {
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						callback(err);
					}
				});
			},
			function(callback){
				applicants.fetch({
					query: {userType: "applicant"},
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						callback(err);
					}
				});
			},
			function(callback){
				nonProfits.fetch({
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						callback(err);
					}
				});
			}
			], function(err, results){
				console.log(results);

				var theRatings = results[0];
				var theApplicants = results[1];
				var theNonProfits = results[2];

				for(var name in theRatings){
					var model = theApplicants.findWhere({username: name});
					model.set("skillRating", theRatings[name]);
				}
				console.log(theApplicants);
				console.log(theNonProfits);
				var master = {};
				theNonProfits.map(function(model){
					var type = model.get("nonProfitType");
					if(master.hasOwnProperty(type)){
						master[type].count++;
					} else {
						master[type] = {count: 1, members: []};
					}
				});
				var sortedApplicants = theApplicants.sortBy(function(model){
					return -1*model.get("skillRating");
				});
				var hasDeveloper = false;
				for(var i = 0; i < sortedApplicants.length; i++){
					if(sortedApplicants[i].get("designerType") === "Graphic Designer"){
						if(master["Branding"].members.length === 3){
							master["Event Collateral"].members.push(sortedApplicants[i].get("name"));
						} else {
							master["Branding"].members.push(sortedApplicants[i].get("name"));
						}
					} else if(sortedApplicants[i].get("designerType") === "Architect"){
						if(master["Architecture"].members.length <= 4){
							master["Architecture"].members.push(sortedApplicants[i].get("name"));
						}
					} else if(sortedApplicants[i].get("designerType") === "Web Designer" ||
							sortedApplicants[i].get("designerType") === "Developer"){
						if(master["Web"].members.length <= 3){
							master["Web"].members.push(sortedApplicants[i].get("name"));
						}
						if(!hasDeveloper && sortedApplicants[i].get("designerType") === "Developer" &&
							master["Web"].members.length < 4){
							master["Web"].members.push(sortedApplicants[i].get("name"));
							hasDeveloper = true;
						}
					} else if(sortedApplicants[i].get("designerType") === "Interior Designer"){
						if(master["Interior Design"].members.length <= 4){
							master["Interior Design"].members.push(sortedApplicants[i].get("name"));
						}
					}
				}
				console.log(master);
			}
		);
	}
});















