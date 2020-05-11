module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => gulp
    .src(config.files)
    .pipe(gulp.dest(config.dir.dest))
    .pipe(browser.stream())
};