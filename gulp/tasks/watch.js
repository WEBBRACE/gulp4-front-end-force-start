module.exports = (gulp) => {
  return () => {
    global.watch = true;
    gulp.watch(['project/src/pug/**/*.pug'], { usePolling: true }, gulp.series('pug'))
      .on('all', (event, filepath) => {
        global.changedTempalteFile = filepath.replace(/\\/g, '/');
      });
    gulp.watch(['project/src/js/**/**/*.js'], { usePolling: true }, gulp.series('js'));
    gulp.watch(['project/src/style/**/**/*.scss'], { usePolling: true }, gulp.series('style'));
    gulp.watch(['project/src/img/**/**/*.*', '!project/src/img/_sprite/*.*'], { usePolling: true }, gulp.series('img'));
    gulp.watch(['project/src/files/**/**/*.*'], { usePolling: true }, gulp.series('files'));
    gulp.watch(['project/_sprite/**/*.*'], { usePolling: true }, gulp.series('img', 'style'));
    gulp.watch(['project/src/img/_sprite/*.*'], { usePolling: true }, gulp.series('sprite'));
  }
};