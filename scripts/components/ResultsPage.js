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
var master = [];

module.exports = React.createClass({
	getInitialState: function(){
		return {
			results: master
		};
	},
	componentWillMount: function(){
		this.calculateResults();
	},
	render: function(){
		var toShow = this.state.results.map(function(project){
			return (
				<div>
					<h3>{project.orgName}</h3>
					<p>{project.members.toString()}</p>
				</div>
			);
		});
		return (
			<div>
				{toShow}
			</div>
		);
	},
	calculateResults: function(){
		console.log("do i work?");
		var that = this;
		async.parallel([
			function(callback){
				Parse.Cloud.run("storeUserRating",{}, {
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

				console.log(theRatings);

				for(var name in theRatings){
					var model = theApplicants.findWhere({username: name});
					model.set("skillRating", theRatings[name]);
				}

				var sortedApplicants = theApplicants.sortBy(function(model){
					return -1*model.get("skillRating");
				});

				console.log(sortedApplicants);

				var limit = Math.floor((sortedApplicants.length-10)/(theNonProfits.models.length));
				var acceptedNonProfits = theNonProfits.models;
				var acceptedApplicants = _.first(sortedApplicants, sortedApplicants.length-10);

				var difference = _.difference(sortedApplicants, acceptedApplicants);
				console.log(difference);
				difference.map(function(model){
					console.log(model.get("name"),"who does", model.get("designerType"));
				});
				//console.log("applicants:",acceptedApplicants, "non-profits:",acceptedNonProfits);

				acceptedNonProfits.map(function(model){
					var name = model.get("orgName");
					var type = model.get("nonProfitType");
					if(type === "Web"){
						master.push({orgName: name, type: type, hasDeveloper: false ,members: []});
					} else {
						master.push({orgName: name, type: type, members: []});
					}
				});
				
				var didntMakeIt = [];
				_.each(acceptedApplicants, function(applicant, index){
					var finished = false;
					for(var i = 0; i < master.length; i++){
						switch(master[i].type){
							case "Branding":
								if(master[i].members.length < 3){
									if(applicant.get("designerType") === "Graphic Designer"){
										master[i].members.push(applicant.get("name")+" "+applicant.get("designerType"));
										finished = true;
										break;
									} else {
										didntMakeIt.push(applicant.get("name")+" "+applicant.get("designerType"));
									}
								}
								
							case "Event Collateral":
								if(master[i].members.length < 3){
									if(applicant.get("designerType") === "Graphic Designer"){
										master[i].members.push(applicant.get("name")+" "+applicant.get("designerType"));
										finished = true;
									} else {
										didntMakeIt.push(applicant.get("name")+" "+applicant.get("designerType"));
									}
								}
								break;
							case "Web":
								if(applicant.get("designerType") === "Web Designer"){
									var counter = 0;
									master[i].members.map(function(memberList){
										var stringToCheck = memberList.split("W");
										if(stringToCheck[1] === "eb Designer"){
											counter++;
										}
									});
									if(master[i].members.length < 4 && counter !== 3){
										master[i].members.push(applicant.get("name")+" "+applicant.get("designerType"));
										finished = true;
									} else {
										didntMakeIt.push(applicant.get("name")+" "+applicant.get("designerType"));
									}
									
								} else if(!master[i].hasDeveloper && applicant.get("designerType") === "Developer" &&
											master[i].members.length < 4){
											master[i].members.push(applicant.get("name")+" "+applicant.get("designerType"));
											master[i].hasDeveloper = true;
											finished = true;
										} else {
											didntMakeIt.push(applicant.get("name")+" "+applicant.get("designerType"));
										}
								break;
							case "Interior Design":
								if(applicant.get("designerType") === "Interior Designer"){
									if(master[i].members.length < 4){
										master[i].members.push(applicant.get("name")+" "+applicant.get("designerType"));
										finished = true;
									} else {
										didntMakeIt.push(applicant.get("name")+" "+applicant.get("designerType"));
									}
								}
								break;
							case "Architecture":
								if(applicant.get("designerType") === "Architect"){
									if(master[i].members.length < 4){
										master[i].members.push(applicant.get("name")+" "+applicant.get("designerType"));
										finished = true;
									} else {
										didntMakeIt.push(applicant.get("name")+" "+applicant.get("designerType"));
									}
								}
								break;
						}
						if(finished){
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
				//console.log(master);
				//console.log(didntMakeIt);
				that.setState({results:master});
			}
		);
	}
});















