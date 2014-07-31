"use strict";

/*jshint -W079 */

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var mocha = require("gulp-mocha");

var PATHS = {
    scripts: ["./*.js", "./lib/*.js", "./lib/**/*.js", "./test/*.js"],
    tests: "./test/*.js",
    lint: ".jshintrc",
    main: "./lib/gentleman.js"
};

var test = function () {
    return gulp.src([PATHS.tests], { read: false })
        .pipe(mocha({ reporter: "nyan" }));
};

var lint = function (pathOrPaths) {
    return gulp.src(pathOrPaths)
        .pipe(jshint(PATHS.lint))
        .pipe(jshint.reporter(stylish));
};

gulp.task("test", function () {
    return test();
});

gulp.task("lint", function () {
    return lint(PATHS.scripts);
});

gulp.task("watch", function () {
    gulp.watch(PATHS.scripts, function (event) {
        if (event.type !== "deleted") {
            lint([event.path]);
        }
    });

    gulp.watch([PATHS.tests], ["test"]);
});

gulp.task("default", ["watch"]);
