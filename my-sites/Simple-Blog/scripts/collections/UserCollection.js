var Backbone = require("backbone");
var UserModel = require("../models/UserModel");

module.exports = Backbone.Collection.extend({
	model: UserModel
});