module.exports = (gulp, plugins) => {
  return () => plugins.all(
    // html
    gulp
      .src('project/dest/*.html')
      .pipe(plugins.plumber())
      .pipe(gulp.dest('project/release/')),
    // js
    gulp
      .src('project/dest/js/*.js')
      .pipe(
        plugins.sourcemaps.init({
          loadMaps: true,
        }),
      )
      .pipe(plugins.plumber())
      .pipe(
        plugins.sourcemaps.write({
          addComment: false,
        }),
      )
      .pipe(gulp.dest('project/release/js/')),
    // style full
    gulp
      .src(['project/dest/css/*.css', '!project/dest/css/*.min.css'])
      .pipe(
        plugins.sourcemaps.init({
          loadMaps: true,
        }),
      )
      .pipe(plugins.plumber())
      .pipe(
        plugins.sourcemaps.write({
          addComment: false,
        }),
      )
      .pipe(plugins.shorthand())
      .pipe(plugins.csscomb())
      .pipe(gulp.dest('project/release/css/')),
    // style min
    gulp
      .src('project/dest/css/*.min.css')
      .pipe(
        plugins.sourcemaps.init({
          loadMaps: true,
        }),
      )
      .pipe(plugins.plumber())
      .pipe(
        plugins.sourcemaps.write({
          addComment: false,
        }),
      )
      .pipe(plugins.shorthand())
      .pipe(plugins.csscomb())
      .pipe(plugins.csso())
      .pipe(gulp.dest('project/release/css/')),
    // img
    gulp.src('project/dest/img/**/**/*.*').pipe(gulp.dest('project/release/img/')),
    // files
    gulp.src('project/src/files/**/**/*.*').pipe(gulp.dest('project/release/')),
  )
};