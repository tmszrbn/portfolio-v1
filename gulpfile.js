/*global require*/
const del = require("del");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cache = require("gulp-cache");
const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");


gulp.task("browsersync", function() {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("styles", function () {
  return gulp.src("./scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer("last 2 versions"))
    // .pipe(gulp.dest("dist"))
    .pipe(cssnano())
    .pipe(gulp.dest("dist"))
    // .pipe(rename({suffix: ".min"}))
    .pipe(notify({message: "Styles task complete"}))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task("scripts"), function () {
  return gulp.src("./scripts/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist"))
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(notify({message: "Scripts task complete"}));
};

gulp.task("images", function () {
  return gulp.src("./src/images/**/*")
    .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest("dist"))
    .pipe(notify({message: "images task complete"}));
});

gulp.task("clean", function () {
  return del(["dist"]);
});


gulp.task("watch", ["browsersync"], function () {


  gulp.watch("scss/*.scss", ["styles"]);
  gulp.watch("js/*.js", ["scripts"]);
  gulp.watch("images/*");

  gulp.watch("./*.html").on("change", browsersync.reload);
});

gulp.task("default", ["clean"], function () {
  gulp.start("styles", "scripts", "images");
});
