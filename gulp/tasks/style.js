module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => plugins.all(
    gulp
      .src(config.style.src.main)
      .pipe(plugins.plumber())
      .pipe(plugins.concat('main.css'))
      .pipe(plugins.sass())
      .pipe(plugins.webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' }))
      .pipe(plugins.csscomb())
      .on('error', plugins.notify.onError(error => `Error: ${error.message}`))
      .pipe(gulp.dest(config.style.dest.main)),
    gulp
      .src(config.style.src.plugins)
      .pipe(plugins.plumber())
      .pipe(plugins.sass())
      .pipe(plugins.csscomb())
      .pipe(gulp.dest(config.style.dest.plugins))
  )
};