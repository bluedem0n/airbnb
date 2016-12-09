var gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify");

gulp.task("devjs", function () {
	gulp.src("src/js/*.js")
	.pipe(concat("main.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js/"))
});