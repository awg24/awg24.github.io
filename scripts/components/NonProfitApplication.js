var React = require("react");
var $ = require("jquery");
var NonProfitModel = require("../models/NonProfitModel");

module.exports = React.createClass({
	render: function(){
		return (
			<div className="text-center">
				<div className="div-bottom-margin set-div-width">
					Non Profit Application
				</div>
				<div>
					<input className="input-style" ref="orgName" type="text" placeholder="Organization Name" />
				</div>
				<div>
					<input className="input-style" ref="site" type="text" placeholder="Website (if any)" />
				</div>
				<div>
					<input className="input-style" ref="contactName" type="text" placeholder="Contact Person" />
				</div>
				<div>
					<input className="input-style" ref="contactEmail" type="text" placeholder="Contact Email" />
				</div>
				<div>
					<input className="input-style" ref="contactNum" type="text" placeholder="Contact Phone Number" />
				</div>
				<div>
					<textarea className="input-style add-height" ref="missionStatement" placeholder="Mission Statement"></textarea>
				</div>
				<div>
					<textarea className="input-style add-height" ref="additionalComments" placeholder="Addition Comments"></textarea>
				</div>
				<div className="div-width">
					Please select a package of deliverables that your organization needs
				</div>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio1" name="nonProfitType" value="event collateral" type="radio"/><label htmlFor="radio1"><span className="change-label">
						</span></label><span>Event Collateral</span>
					</div>
					<div className="side-padding">
						-logo<br/>
						-Invitation<br/>
						-Event Poster/Flyer<br/>
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio2" name="nonProfitType" value="web" type="radio"/><label htmlFor="radio2"><span className="change-label">
						</span></label><span>Web</span><br/>
					</div>
					<div className="side-padding">
						-logo<br/>
						-Invitation<br/>
						-Event Poster/Flyer<br/>
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio3" name="nonProfitType" value="interior design" type="radio"/><label htmlFor="radio3"><span className="change-label">
						</span></label><span>Interior Design</span><br/>
					</div>
					<div className="side-padding">
						-logo<br/>
						-Invitation<br/>
						-Event Poster/Flyer<br/>
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio4" name="nonProfitType" value="branding" type="radio"/><label htmlFor="radio4"><span className="change-label">
						</span></label><span>Full Branding or Branding Redesign</span><br/>
						</div>
					<div className="side-padding">
						-logo
						-Invitation
						-Event Poster/Flyer
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio5" name="nonProfitType" value="architecture" type="radio"/><label htmlFor="radio5"><span className="change-label">
						</span></label><span>Architecture</span><br/>
					</div>
					<div className="side-padding">
						-logo
						-Invitation
						-Event Poster/Flyer
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div>
					<button onClick={this.submitNonProfitApp} className="btn-blue">SUBMIT APPLICATION</button>
				</div>
				<br/>
			</div>
		);
	},
	submitNonProfitApp: function(){
		var orgName = this.refs.orgName.getDOMNode().value;
		var site = this.refs.site.getDOMNode().value;
		var contactName = this.refs.contactName.getDOMNode().value;
		var contactEmail = this.refs.contactEmail.getDOMNode().value;
		var contactNum = this.refs.contactNum.getDOMNode().value;
		var missionStatement = this.refs.missionStatement.getDOMNode().value;
		var additionalComments = this.refs.additionalComments.getDOMNode().value;
		var nonProfitType = $("input[name=nonProfitType]:checked").val();

		console.log(orgName, site, contactName, contactEmail, contactNum, missionStatement, additionalComments, nonProfitType);

		var nonProfit = new NonProfitModel({
			orgName: orgName,
			site: site,
			contactName: contactName,
			contactEmail: contactEmail,
			contactNum: contactNum,
			missionStatement: missionStatement,
			additionalComments: additionalComments,
			nonProfitType: nonProfitType,
			createdBy: this.props.loggedInUser.id
		});

		console.log(nonProfit);

		nonProfit.save(null, {
			success: function(){
				console.log("saved to server");
			},
			error: function(){
				console.log("didnt save to server");
			}
		});

	}
});

























