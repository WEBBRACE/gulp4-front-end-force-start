module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  const pugInheritance = require('yellfy-pug-inheritance');
  let pugInheritanceCache = {};

  function pugFilter(file, inheritance) {
    const filepath = `${config.pug.src}/${file.relative}`;
    if (inheritance.checkDependency(filepath, global.changedTempalteFile)) {
      return true;
    }
    return false;
  }
  return () => new Promise((resolve, reject) => {
    const changedFile = global.changedTempalteFile;
    const options = {
      changedFile,
      treeCache: pugInheritanceCache,
    };
    pugInheritance.updateTree(config.pug.src, options).then((inheritance) => {
      pugInheritanceCache = inheritance.tree;
      return gulp
        .src(config.pug.srcFile)
        .pipe(plugins.if(global.watch, plugins.filter(file => pugFilter(file, inheritance))))
        .pipe(plugins.plumber())
        .pipe(plugins.pug({
          self: true,
          cache: true
        }))
        .on('error', plugins.notify.onError(error => `Error: ${error.message}`))
        .pipe(gulp.dest(config.dir.dest))
        .on('end', resolve)
        .on('error', reject)
        .pipe(browser.stream())
    });
  });
};