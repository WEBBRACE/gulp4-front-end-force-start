module.exports = (gulp) => {
  const config = require('../config');
  const htmlmin = require('gulp-html-minifier');
  const formatHtml = require('gulp-format-html');

  return () => gulp
    .src(config.release.html.src)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(formatHtml())
    .pipe(gulp.dest(config.dir.dest))
};