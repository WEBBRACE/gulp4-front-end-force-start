module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  return () => gulp
    .src(config.style.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber())
    .pipe(plugins.concat('main.css'))
    .pipe(
      plugins.sass({
        sourceMap: true,
        outputStyle: 'expanded',
      }),
    )
    .on('error', plugins.notify.onError(error => `Error: ${error.message}`))
    .pipe(
      plugins.autoprefixer(),
    )
    .pipe(plugins.webpcss({}))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.style.dest))
    .pipe(browser.stream())
};