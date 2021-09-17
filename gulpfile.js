const gulp = require("gulp");
const del = require("del");
const argv = require("yargs").argv;
const sourcemaps = require("gulp-sourcemaps");

// CSS dependencies
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const sass = require("gulp-dart-sass");

// JS dependencies
const browserify = require("browserify");
const gulpif = require("gulp-if");
const vinylSource = require("vinyl-source-stream");
const vinylBuffer = require("vinyl-buffer");
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
  return gulp
    .src("./src/scss/**/*.{sass,scss}")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: argv.minify ? "compressed" : "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([postcssPresetEnv()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
});

/**
 * JavaScript compilation
 */

gulp.task("js:watch", () => {
  gulp.watch("./src/js", gulp.parallel("js"));
});

gulp.task("js", () => {
  const b = browserify({
    entries: ["./src/js/all.js"],
    standalone: "fs",
  });
  return b
    .transform("babelify", {
      presets: [["@babel/preset-env"]],
    })
    .bundle()
    .pipe(vinylSource("all.js"))
    .pipe(vinylBuffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(argv.minify, uglify()))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
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
