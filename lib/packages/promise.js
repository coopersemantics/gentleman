"use strict";

var Q = require("q");

module.exports = function promise($$root) {
    var that = this;
    var utils = $$root.utils;

    utils.extend(that, Q);
};
