module.exports = (gulp, plugins, browser) => {
  const config = require('../config');

  return () => gulp
    .src(config.style.src)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.sass())
    .pipe(plugins.webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' }))
    .pipe(plugins.csscomb())
    .on('error', plugins.notify.onError(error => `Error: ${error.message}`))
    .pipe(gulp.dest(config.style.dest))
    .pipe(browser.stream())
};