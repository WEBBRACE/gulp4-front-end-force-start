module.exports = gulp => {
  const config = require('../config');
  const tinypng = require('gulp-tinypng-compress');

  let access;
  try {
    access = require('../access.js');
  } catch (error) { }

  return () => gulp
    .src(config.img.tinyPng.src)
    .pipe(tinypng({
      key: access.tinypng,
      log: true,
    }))
    .pipe(gulp.dest(config.img.tinyPng.dest));
};