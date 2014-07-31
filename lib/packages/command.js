"use strict";

module.exports = function command($$root) {
    var that = this;
    var utils = $$root.utils;

    that.defineManager = function (object) {
        return utils.extend(object, that);
    };

    that.execute = function (name) {
    	var context = this;

    	return (context[name] || utils.noop).apply(context, utils.toArray(arguments).slice(1));
    };
};
