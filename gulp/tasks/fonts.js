module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => gulp
    .src(config.fonts.src)
    .pipe(plugins.ttf2woff())
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(gulp.src(config.fonts.src))
    .pipe(plugins.ttf2woff2())
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browser.stream())
};