module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => plugins.all(
    gulp
      .src(config.js.src.main)
      .pipe(plugins.plumber())
      .pipe(plugins.concat('main.js'))
      .pipe(
        plugins.babel({
          presets: ['@babel/env'],
        }),
      )
      .pipe(gulp.dest(config.js.dest.main)),
    gulp
      .src(config.js.src.plugins)
      .pipe(plugins.plumber())
      .pipe(
        plugins.babel({
          presets: ['@babel/env'],
        }),
      )
      .pipe(gulp.dest(config.js.dest.plugins))
  )
};