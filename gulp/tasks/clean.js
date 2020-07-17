module.exports = (gulp, plugins) => {
  const config = require('../config');
  const del = require('del');

  return () => plugins.all(
    plugins.cache.clearAll(),
    del([config.dir.dest, config.dir.release, config.dir.sprite, config.temporal.pug.dest]),
  );
};