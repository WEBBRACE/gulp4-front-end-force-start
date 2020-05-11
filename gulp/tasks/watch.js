module.exports = gulp => {
  return () => {
    global.watch = true;
    gulp.watch(['project/src/pug/**/*.pug'], gulp.series('pug'))
      .on('all', (event, filepath) => {
        global.changedTempalteFile = filepath.replace(/\\/g, '/');
      });
    gulp.watch(['project/src/js/main/**/**/*.js'], gulp.series('js'));
    gulp.watch(['project/src/style/main/**/**/*.scss'], gulp.series('style'));
    gulp.watch(['project/src/img/**/**/*.*', '!project/src/img/sprite/*.*'], gulp.series('img'));
    gulp.watch(['project/src/files/**/**/*.*'], gulp.series('files'));
    gulp.watch(['project/sprite/**/*.*'], gulp.series('img', 'style'));
    gulp.watch(['project/src/img/sprite/*.*'], gulp.series('sprite'));
  }
};