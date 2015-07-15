var React = require("react");
var AppBanner = require("./AppBanner");
var $ = require("jquery");
var fileKey = require("../../node_modules/config/config");
filepicker.setKey(fileKey.key);
var designer;
var developer; 
module.exports = React.createClass({
	getInitialState: function(){
		designer = (
					<div>
						<div className="div-width">
							If you are a designer, please submit a pdf with a 
							maximum of 5 examples of your work.
							Students can user works from school projects
						</div>
						<div>
							<button className="btn-blue bottom-margin" onClick={this.uploadFile}>UPLOAD WORK SAMPLES</button>
						</div>
					</div>
					);
		return {
			appType: designer
		};
	},
	render: function(){
		var user  = this.props.loggedInUser.attributes;

		developer = (
					<div>
						<div className="div-width">
							Developers, please submit at least 1 link that demostrates your work
						</div>
						<div>
							<input className="input-style" ref="link1" type="text" placeholder="Link 1"/><br/>
							<input className="input-style" ref="link2" type="text" placeholder="Link 2"/><br/>
							<input className="input-style" ref="link3" type="text" placeholder="Link 3"/><br/>
						</div>
					</div>
					);

		return(
			<div className="text-center set-gray">
				<div className="div-bottom-margin set-div-width">
					Designer/Developer Application
				</div>
				<input className="input-style" type="text" placeholder="Name" defaultValue={user.name}/><br/>
				<input className="input-style" type="text" placeholder="Email" defaultValue={user.email}/><br/>
				<input className="input-style" ref="phoneNum" type="text" placeholder="Phone Number"/><br/>
				<select ref="designerType" onChange={this.changeApp} className="input-style">
					<option value="" >Select Profession</option>
					<option>Graphic Designer</option>
					<option>Web Designer</option>
					<option>Developer</option>
					<option>Architect</option>
					<option>Interior Designer</option>
				</select>
				<div className="div-top-bottom">
				<input id="radio1" name="edu-type" value="student" type="radio"/><label htmlFor="radio1"><span className="change-label">
				</span></label><span>Student</span>
				<input id="radio2" name="edu-type" value="professional" type="radio"/><label htmlFor="radio2"><span className="change-label">
				</span></label><span>Professional</span>
				</div>
				{this.state.appType}
				<div>
					<textarea className="input-style add-height" ref="extraSkills" placeholder="List Additional Skills"></textarea>
				</div>
				<div>
					<select ref="tshirtSize" className="input-style">
						<option value="">Select T-Shirt Size</option>
						<option>small</option>
						<option>medium</option>
						<option>large</option>
						<option>x-large</option>
						<option>xx-large Designer</option>
					</select>
				</div>
				<div>
					<textarea className="input-style add-height" ref="comments" placeholder="Comments"></textarea>
				</div>
				<div>
					<button className="btn-blue" onClick={this.submitApp}>SUBMIT APPLICATION</button>
				</div>
			</div>
		);
	},
	changeApp: function(){
		var type = this.refs.designerType.getDOMNode().value;
		if(type === "Developer"){
			this.setState({appType: developer});
		} else {
			this.setState({appType: designer});
		}
	},
	uploadFile: function(){
		var that = this;
		console.log(this.props.loggedInUser);
		var user = this.props.loggedInUser;
		filepicker.pickAndStore({
			openTo: '~/Documents/'
			},{},
			function(Blobs){
				console.log("Blobs:", Blobs[0].url);
				user.save({portfolioUrl:Blobs[0].url}, {
					success: function(res){
						console.log(res);
					},
					error: function(err){
						console.log(err);
					}
				});
				console.log(that.props.loggedInUser);
			},
			function(error){
				console.log("error:", error);
				console.log(JSON.stringify(error));
			},
			function(progress){
				console.log("progress:", progress);
				console.log(JSON.stringify(progress));
			}
		);
		//user.save({portfolioUrl: "http:test/ha"});
	},
	submitApp: function(){
		var designerType = this.refs.designerType.getDOMNode().value;
		var phoneNum = this.refs.phoneNum.getDOMNode().value;
		var userEdu = $("input[name=edu-type]:checked").val();
		var extraSkills = this.refs.extraSkills.getDOMNode().value;
		var extraComments = this.refs.comments.getDOMNode().value;
		var shirtSize = this.refs.tshirtSize.getDOMNode().value;
		if(designerType === "Developer"){
			var links = "";

			if(this.refs.link1.getDOMNode().value){
				links += this.refs.link1.getDOMNode().value;
			}

			if(this.refs.link2.getDOMNode().value){
				var link2 = this.refs.link2.getDOMNode().value;
				links += " "+link2;

				if(this.refs.link3.getDOMNode().value){
					var link3 = this.refs.link3.getDOMNode().value;
					links += " "+link3;
				}
			} else if(this.refs.link3.getDOMNode().value){
				var link3 = this.refs.link3.getDOMNode().value;
				links += " "+link3;
			}
		}

		console.log(designerType, phoneNum, userEdu, extraSkills, extraComments, shirtSize);

		if(links){
			this.props.loggedInUser.set("developerLinks", links);
		}
		console.log(this.props.loggedInUser);
		this.props.loggedInUser.save({
				designerType: designerType, 
				tshirtSize: shirtSize, 
				additionalSkills: extraSkills,
				additionalComments: extraComments,
				phoneNum: phoneNum,
				userEdu: userEdu
		},{
			success: function(){
				console.log("saved to server");
			},
			error: function(){
				console.log("didnt work yo");
			}
		});
	}
});

















