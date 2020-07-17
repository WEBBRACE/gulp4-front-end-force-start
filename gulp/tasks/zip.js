module.exports = (gulp, plugins) => {
  const config = require('../config');
  const packageJSON = require('../../package.json');
  const fileName = packageJSON.name;
  const Data = new Date();

  return () => gulp
    .src(config.zip.src)
    .pipe(plugins.zip(fileName + '[' + Data.getDate() + '.' + Data.getMonth() + '.' + Data.getFullYear() + ']' + '.zip'))
    .pipe(gulp.dest(config.dir.desktop))
};