module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => gulp
    .src(config.js.src)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('main.js'))
    .pipe(
      plugins.babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(gulp.dest(config.js.dest))
    .pipe(browser.stream())
};