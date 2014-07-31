"use strict";

var mocha = require("mocha");
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var Gentleman = require("../lib/gentleman");
var utils = require("../lib/utils");

describe("Gentleman", function () {
	it("should load specified packages when they are available", function () {
		var callback = sinon.spy();

		Gentleman(["command", "promise"], callback);
		expect(callback.thisValues[0]).to.contain.keys("commandPackage", "promisePackage");
		callback.reset();

		// Will pass a key/value `error {object}` to `callback(error)` when unavailable packages are specified

		Gentleman(["foo", "bar", "command", "promise"], callback);
		expect(callback.args[0][0]).to.contain.keys("foo", "bar");
	});

	describe("#addPackage()", function () {
		it("should add a new package when there is not one already present", function () {
			Gentleman.addPackage("boo", utils.noop);
			expect(!!Gentleman.getPackage("boo")).to.be.true;

			// Will throw an error when a package of the same name is present

			expect(function () {
				Gentleman.addPackage("boo", utils.noop);
			}).to.throw(Error);
		});
	});

	describe("#getPackage()", function () {
		it("should get a package when there is one present", function () {
			expect(!!Gentleman.getPackage("command")).to.be.true;

			// Will throw an error when a package is not present

			expect(function () {
				Gentleman.getPackage("foo");
			}).to.throw(ReferenceError);
		});
	});

	describe("#generatePackageNames", function () {
		it("should generate package names", function () {
			Gentleman(["*"], utils.noop);
			expect(Gentleman.generatePackageNames()).to.include.members(["command", "decorator", "events", "promise"]);
		});
	});
});
