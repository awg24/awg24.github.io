var React = require("react");
var async = require("async");
var PDF = require("./PDFViewer");
var UserCollection = require("../collections/UserCollection");
var RelationCollection = require("../collections/RelationCollection");
var userCollection = new UserCollection();
var exisitingRelations = new RelationCollection();
var Relation = require("../models/UserOrganizationRelationModel");
var applicants;
module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;
		async.parallel([
			function(callback){
				userCollection.fetch({
					query: {userType:"applicant"},
					success: function(data){
						// if(data.models[0].attributes.portfolioUrl){
						// 	that.setState({applicants: data, pdfFile:data.models[0].attributes.portfolioUrl});
						// } else {
						// 	that.setState({applicants: data, pdfFile:data.models[0].attributes.developerLinks});
						// }
						callback(null, data);
					},
					error: function(err){
						console.log(err);
						callback(err);
					}
				});
			},
			function(callback){
				exisitingRelations.fetch({
					query: {OrganizerId: that.props.loggedInUser.id},
					success: function(data){
						console.log("worked, got back", data);
						// that.setState({ratings: data});
						callback(null, data);

					},
					error: function(err){
						console.log("didnt worke");
						callback(err);
					}
				});
			}
		],
		function(err, results){
			that.setState({applicants: userCollection, 
						pdfFile: userCollection.at(0).get("portfolioUrl")||userCollection.at(0).get("developerLinks"), 
						ratings: exisitingRelations})
		});
	},
	getInitialState: function(){
		return {
			applicants: userCollection,
			pdfFile: "../../assets/logo.png",
			ratings: exisitingRelations
		};
	},
	render: function(){

		console.log('render', this.state.applicants.length, this.state.ratings.length);

		var that = this;
		
		if(this.state.applicants){
			var toShow = this.state.applicants.map(function(models){
				var rating = "";
				var ratingModel = that.state.ratings.findWhere({ApplicantId: models.id});
				if(ratingModel){
					rating = ratingModel.get("rating");
					console.log("look here ",rating);
				}
				return (
					<div onClick={that.showPDF} key={models.cid}>
						<label className="padding-top">{models.attributes.username}</label>
						<select onChange={that.rate} ref="rating" defaultValue={rating} className="selecting small-width pull-right">
							<option value="">Unrated</option>
							<option value="5">5</option>
							<option value="4">4</option>
							<option value="3">3</option>
							<option value="2">2</option>
							<option value="1">1</option>
						</select>
					</div>
				);
			});
		}
		return (
			<div className="give-top-margin container">
				<div className="text-left give-border div-width col-sm-4 make-scroll">
					<h4>Applicants</h4><br/><br/>
					<div className="bottom-border">
						<label>Name</label>
						<label className="pull-right">Rating</label>
					</div>
					{toShow}
				</div>
				<div className="col-sm-2"></div>
				<div className="col-sm-6">
					<PDF key="2" url={this.state.pdfFile}/>
				</div>
				<button onClick={this.goToAveraging} className="btn-blue">SUBMIT</button>
			</div>
		);
	},
	showPDF: function(event){
		if(!event.target.type){
			var that = this;
			var userClicked = new UserCollection();
			userClicked.fetch({
				query: {username: event.target.innerHTML},
				success: function(data){
					console.log("called",data.models[0].attributes.developerLinks);
					if(data.models[0].attributes.portfolioUrl){
						that.setState({pdfFile: data.models[0].attributes.portfolioUrl});
					} else {
						that.setState({pdfFile: data.models[0].attributes.developerLinks});
					}
				}
			});
		}
	},
	goToAveraging: function(){
		this.props.routing.navigate("results", {trigger: true});
	},
	rate: function(event){
		var that = this;
		var applicant = event.target.parentNode.childNodes[0].innerHTML;
		var rating = event.target.value;
		console.log(applicant, "'s rating is",rating);
		var applicantRated = new UserCollection();
		applicantRated.fetch({
			query: {username: applicant},
			success: function(data){
				var hasBeenRated = new RelationCollection();
				var relation = new Relation({
					ApplicantId: data.models[0].id,
					username: applicant,
					OrganizerId: that.props.loggedInUser.id,
					rating: rating
				});
				hasBeenRated.fetch({
					query: {ApplicantId: data.models[0].id, OrganizerId: that.props.loggedInUser.id},
					success:function(data){
						if(data.length !== 0){
							relation.set({objectId: data.at(0).id})
						}
						relation.save();
					}
				});	
			}
		})	
	}
});