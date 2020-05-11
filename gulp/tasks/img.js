module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  const imageminMozjpeg = require('imagemin-mozjpeg');
  const pngquant = require('imagemin-pngquant');

  return () => gulp
    .src(config.img.src)
    .pipe(plugins.newer(config.img.dest))
    .pipe(plugins.webp({
      quality: 90
    }))
    .pipe(gulp.dest(config.img.dest))
    .pipe(gulp.src(config.img.src))
    .pipe(plugins.newer(config.img.dest))
    .pipe(plugins.cache(
      plugins.imagemin(
        [
          plugins.imagemin.gifsicle({
            interlaced: true,
          }),
          plugins.imagemin.jpegtran({
            progressive: true,
          }),
          imageminMozjpeg({
            quality: 90,
          }),
          plugins.imagemin.svgo(),
          plugins.imagemin.optipng({
            optimizationLevel: 3,
          }),
          pngquant({
            quality: '90-95',
            speed: 3,
          }),
        ], {
        verbose: true,
      },
      ),
    ))
    .pipe(gulp.dest(config.img.dest))
    .pipe(browser.stream())
};