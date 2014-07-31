"use strict";

module.exports = {
	extend: function (destination, source) {
		var property;

		for (property in source) {
			destination[property] = source[property];
		}

		return destination;
	},

	toArray: function (object) {
		return Array.prototype.slice.call(object);
	},

	hasOwnProp: function (object, key) {
		return Object.prototype.hasOwnProperty.call(object, key);
	},

	noop: function () {}
};