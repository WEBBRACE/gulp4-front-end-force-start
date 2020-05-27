module.exports = (gulp, plugins) => {
  const config = require('../config');
  const formatHtml = require('gulp-format-html');
  const webpHTML = require('gulp-webp-html');
  const htmlValidator = require('gulp-w3c-html-validator');

  return () => plugins.all(
    // html
    gulp
      .src(config.release.html.src)
      .pipe(plugins.plumber())
      .pipe(webpHTML())
      .pipe(formatHtml())
      .pipe(htmlValidator())
      .pipe(gulp.dest(config.release.html.dest)),
    // js
    gulp
      .src(config.release.js.src)
      .pipe(
        plugins.sourcemaps.init({
          loadMaps: true,
        }),
      )
      .pipe(plugins.plumber())
      .pipe(
        plugins.sourcemaps.write({
          addComment: false,
        }),
      )
      .pipe(gulp.dest(config.release.js.dest)),
    // style
    gulp
      .src(config.release.style.src)
      .pipe(
        plugins.sourcemaps.init({
          loadMaps: true,
        }),
      )
      .pipe(plugins.plumber())
      .pipe(
        plugins.sourcemaps.write({
          addComment: false,
        }),
      )
      .pipe(plugins.webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' }))
      .pipe(
        plugins.autoprefixer(),
      )
      .pipe(plugins.shorthand())
      .pipe(plugins.csscomb())
      .pipe(gulp.dest(config.release.style.dest)),
    // img
    gulp
      .src(config.release.img.src)
      .pipe(plugins.webp({
        quality: 90
      }))
      .pipe(gulp.dest(config.release.img.dest))
      .pipe(gulp.src(config.release.img.src))
      .pipe(gulp.dest(config.release.img.dest)),
    // files
    gulp.src(config.release.files.src).pipe(gulp.dest(config.release.files.dest)),
  )
};