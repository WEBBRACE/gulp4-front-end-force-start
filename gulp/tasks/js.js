module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => gulp
    .src(config.js.src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(
      plugins.babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.sourcemaps.write(config.js.maps))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browser.stream())
};