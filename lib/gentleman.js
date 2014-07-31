"use strict";

var fs = require("fs");
var path = require("path");
var utils = require("./utils");

/**
 * Creates a new `Gentleman`
 * @param {array} packageNames
 * @param {function} callback
 * @class
 * @public
 */

var Gentleman = module.exports = function Gentleman(packageNames, callback) {
	return new proto.initialize(packageNames, callback);
};

var proto = utils.extend(Gentleman.prototype, {
	version: "0.1.0",

	/**
	 * @constructs `Gentleman`
	 * @see `Gentleman`
	 */

	initialize: function (packageNames, callback) {
		var that = this;
		var errors = {};

		(function next() {
			var packageName;
			var context;

			try {
				packageName = packageNames.shift();

				if (packageName && packageName !== "*") {
					context = (that[packageName + "Package"] = {});

					that.constructor.getPackage(packageName).call(context, that);

					return next();
				} else if (packageName === "*") {
					packageNames = that.constructor.generatePackageNames();

					return next();
				}
			} catch (error) {
				error.packageName = packageName;
				errors[packageName] = error;

				return next();
			}
		})();

		(callback || utils.noop).call(that, errors);
	},

	utils: utils
});

proto.initialize.prototype = proto;

utils.extend(Gentleman, {
	addPackage: function (packageName, callback) {
		var that = this;

		if (utils.hasOwnProp(that.packages, packageName)) {
			throw new Error(packageName + " already exists");
		}

		that.packages[packageName] = callback;
	},

	getPackage: function (packageName) {
		var that = this;

		if (!utils.hasOwnProp(that.packages, packageName)) {
			throw new ReferenceError(packageName + " does not exist");
		}

		return that.packages[packageName];
	},

	generatePackageNames: function () {
		var that = this;

		return Object.keys(that.packages).map(function (packageName) {
			return packageName;
		});
	}
});

/**
 * Collections of modules
 * @public
 */

Gentleman.packages = exports.packages = {};

/**
 * Auto-loads packages
 * @public
 */

(function (load) {
	fs.readdirSync(path.join(__dirname, "./", "packages")).forEach(function (filename) {
		var packageName;

		if (!(/\.js$/.test(filename))) {
			return;
		}

		packageName = path.basename(filename, ".js");
		Gentleman.packages[packageName] = load(packageName);
	});
})(function (packageName) {
	return require("./packages/" + packageName);
});
