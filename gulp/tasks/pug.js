module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  const pugInheritance = require('yellfy-pug-inheritance');
  const webpHTML = require('gulp-webp-html');
  const formatHtml = require('gulp-format-html');
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
          cache: true,
          pretty: true
        }))
        .pipe(plugins.inject(gulp.src(config.inject.src.pluginsHead, { read: false }), { ignorePath: config.inject.remove, relative: true, starttag: '<!-- inject:pluginsHead:{{ext}} -->' }))
        .pipe(plugins.inject(gulp.src(config.inject.src.plugins, { read: false }), { ignorePath: config.inject.remove, relative: true, starttag: '<!-- inject:plugins:{{ext}} -->' }))
        .pipe(plugins.inject(gulp.src(config.inject.src.main, { read: false }), { ignorePath: config.inject.remove, relative: true }))
        .pipe(webpHTML())
        .pipe(formatHtml())
        .on('error', plugins.notify.onError(error => `Error: ${error.message}`))
        .pipe(gulp.dest(config.dir.dest))
        .on('end', resolve)
        .on('error', reject)
        .pipe(browser.stream())
    });
  });
};