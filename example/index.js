"use strict";

var Gentleman = require("../lib/gentleman");

Gentleman.addPackage("baz", function (/*$$root*/) {
	var that = this;

	that.baz = "baz";

	that.setBaz = function (value) {
		that.baz = value;

		console.log("foo " + that.baz);
	};
});

Gentleman(["baz", "events", "command", "decorator", "promise"], function (/*error*/) {
	var that = this;

	// Baz Package

	that.bazPackage.setBaz("boo");

	// Command Package

	that.commandPackage.defineManager({
		getById: function (id) {
			console.log("`.getById` " + id);
		},

		sortById: function (id) {
			console.log("`.sortById` " + id);
		}
	}).execute("getById", "6747467");

	// Events package

	that.eventsPackage.on("foo", function () {
		console.log("You truly are a Gentleman!");
	});

	setTimeout(function () {
		that.eventsPackage.emit("foo");
	}, 1000);

	that.baz = {
		boo: function () {
			return "boo";
		}
	};

	// Decorator package

	that.decoratorPackage.wrap(that.baz, function (object)	 {
		var boo = object.boo();

		object.boo = function () {
			return boo + " baz";
		};

		console.log(object.boo());
	});

	// Promise package

	var foo = function () {
		var deferred = that.promisePackage.defer();

		setTimeout(function () {
			deferred.resolve("sweet");
		}, 1000);

		return deferred.promise;
	};

	foo()
		.then(function (value) {
			return value + " peas";
		})
		.done(function (value) {
			console.log(value);
		});
});

