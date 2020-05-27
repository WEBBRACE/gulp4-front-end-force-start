module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  const webpHTML = require('gulp-webp-html');
  const formatHtml = require('gulp-format-html');
  const htmlValidator = require('gulp-w3c-html-validator');

  return () => gulp
    .src(config.pug.srcFile)
    .pipe(plugins.pug())
    .pipe(webpHTML())
    .pipe(formatHtml())
    .pipe(htmlValidator())
};