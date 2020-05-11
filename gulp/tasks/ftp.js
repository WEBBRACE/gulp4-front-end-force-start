module.exports = gulp => {
  const config = require('../config');
  const ftp = require('vinyl-ftp');

  let access;
  try {
    access = require('../access.js');
  } catch (error) { }

  return () => gulp
    .src(config.ftp.src, {
      buffer: false,
    })
    .pipe(ftp.create({
      host: access.ftp.host,
      user: access.ftp.user,
      password: access.ftp.password,
    })
      .dest(access.ftp.directory),
    );
};