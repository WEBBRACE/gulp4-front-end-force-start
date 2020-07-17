module.exports = (gulp, plugins) => {
  const config = require('../config');
  const files = require('gulp-add-files');

  return () => gulp
    .src(config.temporal.pug.src)
    .pipe(files([
      {
        name: 'temporal.pug',
        content: ''
      }
    ]))
    .pipe(gulp.dest(config.temporal.pug.dest))
    .pipe(gulp.src(config.temporal.pug.src))
    .pipe(plugins.concat('temporal.pug'))
    .pipe(gulp.dest(config.temporal.pug.dest))
};