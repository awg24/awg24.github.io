var Backbone = require("backbone");
var BlogModel = require("../models/BlogModel");

module.exports = Backbone.Collection.extend({
	model: BlogModel,
	url: "http://www.mockaroo.com/api/generate.json?key=e71c61c0&schema=blogList"
});