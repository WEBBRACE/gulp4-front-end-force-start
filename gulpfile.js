const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browser = require('browser-sync');

const fs = require('fs');
const taskFolder = './gulp/tasks';

const getTask = task => require(`${taskFolder}/${task}`)(gulp, plugins, browser);

fs.readdirSync(taskFolder).forEach(file => {
  let taskName = file.replace('.js', '');
  gulp.task(taskName, getTask(taskName));
});

gulp.task('dest', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('sprite'),
  gulp.parallel('pug', 'files'),
  gulp.parallel('js', 'style'),
  gulp.parallel('img'),
));

gulp.task('default', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('sprite'),
  gulp.parallel('pug', 'files'),
  gulp.parallel('js', 'style'),
  gulp.parallel('img'),
  gulp.parallel('watch', 'server'),
));

gulp.task('release.ftp', gulp.series('clean', 'dest', 'release', 'ftp', 'clean'));