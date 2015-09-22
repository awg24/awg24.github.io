var React = require("react");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");

module.exports = Backbone.Model.extend({
	defaults: {
		id: null,
		title: null,
		feelings: null,
		createdAt: null
	},
	idAttribute: "id",
	validate: function(attr){
		var errors = {};
		if(!attr.title){
			errors.title = "Field must not be blank!";
		}
		if(!attr.feelings){
			errors.feelings = "Field must not be blank!";
		}
		if(_.isEmpty(errors)){
			return false;
		} else {
			return errors;
		}
	},
	urlRoot: "http://www.mockaroo.com/api/generate.json?key=e71c61c0&schema=blogList"
});