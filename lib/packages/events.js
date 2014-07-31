"use strict";

var EventEmitter = require("events").EventEmitter;

module.exports = function events($$root) {
    var that = this;
    var utils = $$root.utils;

    utils.extend(that, EventEmitter.prototype);
};
