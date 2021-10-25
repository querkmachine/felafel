const gulp = require("gulp");
const del = require("del");
const argv = require("yargs").argv;
const sourcemaps = require("gulp-sourcemaps");

// CSS dependencies
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const postcssNano = require("cssnano");
const sass = require("gulp-dart-sass");

// JS dependencies
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");

/**
 * Static assets
 */

gulp.task("assets", () => {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets"));
});

/**
 * CSS compilation
 */

gulp.task("css:watch", () => {
  gulp.watch("./src/scss/**/*", gulp.parallel("css"));
});

gulp.task("css", () => {
  const postcssPlugins = [
    postcssPresetEnv({
      features: {
        "logical-properties-and-values": {
          dir: argv.dir || "ltr",
        },
      },
    }),
  ];
  if (argv.minify) {
    postcssPlugins.push(postcssNano());
  }
  return gulp
    .src("./src/scss/**/*.{sass,scss}")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
});

/**
 * JavaScript compilation
 */

gulp.task("js:watch", () => {
  gulp.watch("./src/js/**/*", gulp.parallel("js"));
});

gulp.task("js", () => {
  return gulp
    .src("./src/js/**/*")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(argv.minify, uglify()))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
});

/**
 * Global tasks
 */

gulp.task("clean", () => {
  return del(["./dist"]);
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("assets", "css", "js", (cb) => cb())
  )
);

gulp.task("watch", gulp.parallel("css:watch", "js:watch"));
gulp.task("default", gulp.series("build", "watch"));
