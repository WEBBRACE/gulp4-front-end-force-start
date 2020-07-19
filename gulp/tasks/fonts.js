module.exports = (gulp, plugins) => {
  const config = require('../config');

  return () => plugins.all(
    gulp
      .src(config.fonts.convert.src)
      .pipe(plugins.ttf2woff())
      .pipe(gulp.dest(config.fonts.convert.dest)),
    gulp
      .src(config.fonts.convert.src)
      .pipe(plugins.ttf2woff2())
      .pipe(gulp.dest(config.fonts.convert.dest))
  )
};