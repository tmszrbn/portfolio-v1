/*global require*/
/* eslint-disable no-console */
const del = require(`del`);
const gulp = require(`gulp`);
const autoprefixer = require(`gulp-autoprefixer`);
const browsersync = require(`browser-sync`).create();
const cache = require(`gulp-cache`);
const concat = require(`gulp-concat`);
const cssnano = require(`gulp-cssnano`);
const imagemin = require(`gulp-imagemin`);
const notify = require(`gulp-notify`);
const plumber = require(`gulp-plumber`);
const rename = require(`gulp-rename`);
const sass = require(`gulp-sass`);
const uglify = require(`gulp-uglify-es`).default;

gulp.task(`browsersync`, function() {
  browsersync.init({
    server: {
      baseDir: `./`
    },
    browser: [`firefox-developer`]
  });
});

gulp.task(`styles`, function () {
  return gulp.src(`./scss/*.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(`last 2 versions`))
    .pipe(gulp.dest(`./dist/`))
    .pipe(cssnano())
    .pipe(rename({suffix: `.min`}))
    .pipe(gulp.dest(`./dist/`))
    .pipe(notify({message: `styles task completed`}));
});



gulp.task(`scripts`, function() {
  return gulp.src( [`./js/smooth-scroll.js`, `./js/run.js`])
    .pipe(plumber())
    .pipe(concat(`main.js`))
    .pipe(gulp.dest(`./dist/`))
    .pipe(rename({ suffix: `.min` }))
    .pipe(uglify())
    .pipe(gulp.dest(`./dist/`))
    .pipe(notify({ message: `scripts task completed` }));
});


gulp.task(`images`, function () {
  return gulp.src(`./images/**/*`)
    .pipe(plumber())
    .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest(`./dist/images`))
    .pipe(notify({message: `images task completed`}));
});

gulp.task(`clean`, function () {
  return del([`dist`]);
});


gulp.task(`watch`, [`browsersync`], function () {


  gulp.watch(`scss/*.scss`, [`styles`]);
  gulp.watch(`js/*.js`, [`scripts`]);
  gulp.watch(`images/*`);

  gulp.watch([`./*.html`, `./dist/styles.css`, `./dist/main.js`, `./dist/images/**`]).on(`change`, browsersync.reload);
  // gulp.watch(`./dist/**`).on(`change`, browsersync.reload);
});

gulp.task(`default`, [`clean`], function () {
  gulp.start(`styles`, `scripts`, `images`);
});
