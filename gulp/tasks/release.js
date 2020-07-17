module.exports = (gulp, plugins) => {
  const config = require('../config');

  return () => plugins.all(
    // html
    gulp
      .src(config.release.html.src)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(config.release.html.dest)),
    // js
    gulp
      .src(config.release.js.src)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(config.release.js.dest)),
    // style
    gulp
      .src(config.release.style.src)
      .pipe(plugins.plumber())
      .pipe(
        plugins.autoprefixer(),
      )
      .pipe(plugins.shorthand())
      .pipe(plugins.csscomb())
      .pipe(gulp.dest(config.release.style.dest)),
    // img
    gulp
      .src(config.release.img.src)
      .pipe(gulp.dest(config.release.img.dest)),
    // files
    gulp.src(config.release.files.src).pipe(gulp.dest(config.release.files.dest)),
  )
};