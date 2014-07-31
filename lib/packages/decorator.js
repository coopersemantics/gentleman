"use strict";

module.exports = function decorator($$root) {
    var that = this;
    var utils = $$root.utils;

    that.wrap = function (object, callback) {
        callback.apply(null, [Object.create(object)].concat(utils.toArray(arguments).slice(2)));
    };
};
