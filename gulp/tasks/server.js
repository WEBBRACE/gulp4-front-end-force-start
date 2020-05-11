module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  const connect = require('gulp-connect-php');

  return () => connect.server({
      base: config.dir.dest,
      hostname: '127.0.0.1',
      port: 8080,
      open: false,
      stdio: 'ignore',
    },
    () => browser.init({
      proxy: '127.0.0.1:8080',
      port: 8000,
      open: true,
      notify: false,
      // tunnel: 'webbrace'
    }),
  );
};