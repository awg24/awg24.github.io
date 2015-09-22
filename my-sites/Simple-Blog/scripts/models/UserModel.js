var React = require("react");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");

module.exports = Backbone.Model.extend({
	defaults: {
		id: null,
		username: null,
		password: null,
		userType: null
	},
	idAttribute: "id",
	validate: function(attr){
		var errors = {};
		if(!attr.username){
			errors.username = "Field must not be blank!"
		}
		if(!attr.password){
			errors.password = "Field must not be blank!"
		} else if(attr.password.length <= 3){
			errors.password = "Passowrd must be longer than 3 characters!"
		}
		if(!attr.userType){
			errors.userType = "User type must be selected!"
		}
		if(_.isEmpty(errors)){
			return false;
		} else {
			return errors;
		}
	}
});