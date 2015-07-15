var React = require("react");
var async = require("async");
var _ = require("backbone/node_modules/underscore");
var Ratings = require("../collections/RelationCollection");
var Users = require("../collections/UserCollection");
Parse.initialize("S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj", "9MYqzYFPqsuMvKAchWSBVZiK3sxzG5hr8jWJ6FU1");

var applicants = new Users();
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

		Parse.Cloud.run("storeUserRating",null, {
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err)
			}
		})

		// async.parallel([
		// 	function(callback){
		// 		ratings.fetch({
		// 			success: function(data){
		// 				console.log(data);
		// 				callback(null, data);
		// 			},
		// 			error: function(err){
		// 				console.log(err);
		// 				callback(err);
		// 			}
		// 		});	
		// 	},
		// 	function(callback){
		// 		applicants.fetch({
		// 			query: {userType: "applicant"},
		// 			success: function(data){
		// 				console.log(data);
		// 				callback(null, data);
		// 			},
		// 			error: function(err){
		// 				console.log(err);
		// 				callback(err);
		// 			}
		// 		})
		// 	}], function(err, results){
		// 			console.log(results);
			// 		var allRatings = results[0];
			// 		var allApplicants = results[1].models;
			// 		var ratingSelection = [];
			// 		for(var i = 0; i < allApplicants.length; i++){
			// 			ratingSelection = allRatings.where({ApplicantId: allApplicants[i].id});
			// 			var applicantRating = averageOut(ratingSelection);
			// 			sendToParse(allApplicants[i], applicantRating);
			// 		}

			// 		function averageOut(appArray){
			// 			var total = 0;
			// 			for(var i = 0; i < appArray.length; i++){
			// 				total += parseInt(appArray[i].attributes.rating);
			// 			}

			// 			return (total/appArray.length);
			// 		}
			// 		function sendToParse(model, rating){
			// 			model.set("skillRating", rating);
			// 			model.unset("password");
			// 			model.save(null, {
			// 				success: function(){
			// 					console.log("saved");
			// 				}, 
			// 				error: function(){
			// 					console.log("not saved");
			// 				}
			// 			});
			// 		}
			// 	}
			// );
				//}
			//);
		}
});