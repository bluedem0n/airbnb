var gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	cleancss = require("gulp-clean-css");

gulp.task("devjs", function () {
	gulp.src("src/js/*.js")
	.pipe(concat("main.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js/"))
});

gulp.task("devcss", function(){
	gulp.src(["src/css/*.css", "src/sass/*.scss"])
	.pipe(sass())
	.pipe(concat("style.min.css"))
	.pipe(cleancss({keepSpecialComments : 1}))
	.pipe(gulp.dest("dist/css/"))
});