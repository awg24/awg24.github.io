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

				var master = [];
				var sortedApplicants = theApplicants.sortBy(function(model){
					return -1*model.get("skillRating");
				});

				var limit = Math.floor((sortedApplicants.length-10)/(theNonProfits.models.length));
				var acceptedNonProfits = _.first(theNonProfits.models, limit);
				var acceptedApplicants = _.first(sortedApplicants, sortedApplicants.length-10);

				console.log("applicants:",acceptedApplicants, "non-profits:",acceptedNonProfits);

				acceptedNonProfits.map(function(model){
					var name = model.get("orgName");
					var type = model.get("nonProfitType")
					master.push({orgName: name, type: type, members: []});
				});
				
				var hasDeveloper = false;

				_.each(acceptedApplicants, function(applicant, index){
					for(var i = 0; i < master.length; i++){
						switch(master[i].type){
							case "Branding":
								if(master[i].members.length <= 3){
									if(applicant.get("designerType") === "Graphic Designer"){
										master.members.push(applicant.get("name"));
									}
								}
							case "Event Collateral":
								if(master[i].members.length < 3){
									if(applicant.get("designerType") === "Graphic Designer"){
										master[i].members.push(applicant.get("name"));
									}
								}
								break;
							case "Web":
								if(applicant.get("designerType") === "Web Designer" || 
									applicant.get("designerType") === "Developer"){
									if(master[i].members.length <= 3){
										master[i].members.push(applicant.get("name"));
									}
									if(!hasDeveloper && acceptedApplicants[i].get("designerType") === "Developer" &&
										master[i].members.length < 4){
										master[i].members.push(applicant.get("name"));
										hasDeveloper = true;
									}
								}
								break;
							case "Interior Design":
								if(master[i].members.length < 4){
									master[i].members.push(applicant.get("name"));
								}
								break;
							case "Architecture":
								if(master[i].members.length < 4){
									master[i].members.push(applicant.get("name"));
								}
								break;
						}
					}
				});

				// for(var i = 0; i < acceptedApplicants.length; i++){
				// 	if(acceptedApplicants[i].get("designerType") === "Graphic Designer"){
				// 		if(master["Branding"].members.length === 3){
				// 			master["Event Collateral"].members.push(acceptedApplicants[i].get("name"));
				// 		} else {
				// 			master["Branding"].members.push(acceptedApplicants[i].get("name"));
				// 		}
				// 	} else if(acceptedApplicants[i].get("designerType") === "Architect"){
				// 		if(master["Architecture"].members.length <= 4){
				// 			master["Architecture"].members.push(acceptedApplicants[i].get("name"));
				// 		}
				// 	} else if(acceptedApplicants[i].get("designerType") === "Web Designer" ||
				// 			acceptedApplicants[i].get("designerType") === "Developer"){
				// 		if(master["Web"].members.length <= 3){
				// 			master["Web"].members.push(acceptedApplicants[i].get("name"));
				// 		}
				// 		if(!hasDeveloper && acceptedApplicants[i].get("designerType") === "Developer" &&
				// 			master["Web"].members.length < 4){
				// 			master["Web"].members.push(acceptedApplicants[i].get("name"));
				// 			hasDeveloper = true;
				// 		}
				// 	} else if(acceptedApplicants[i].get("designerType") === "Interior Designer"){
				// 		if(master["Interior Design"].members.length <= 4){
				// 			master["Interior Design"].members.push(acceptedApplicants[i].get("name"));
				// 		}
				// 	}
				// }
				console.log(master);
			}
		);
	}
});















