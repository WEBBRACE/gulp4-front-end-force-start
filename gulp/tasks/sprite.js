module.exports = (gulp, plugins, browser) => {
  const config = require('../config');
  const svgSprite = require('gulp-svg-sprite');
  const merge = require('merge-stream');
  const fs = require('fs');

  return done => {
    fs.readdir(config.sprite.src, (err, files) => {
      if (err === null) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].match(/.png$/)) {
            gulp.src(config.sprite.mixin.png).pipe(gulp.dest(config.sprite.mixin.dest))
            console.log('Собираются PNG спрайты...');
            const spriteData = gulp.src(config.sprite.png).pipe(
              plugins.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite-png.scss',
                cssVarMap(sprite) {
                  sprite.name;
                },
                engineOpts: {
                  imagemagick: true,
                },
                padding: 5,
                algorithm: 'binary-tree',
                imgPath: '../img/sprite.png',
                cssFormat: 'scss',
              }),
            );
            const imgStream = spriteData.img.pipe(gulp.dest(config.sprite.img));
            const cssStream = spriteData.css.pipe(gulp.dest(config.sprite.style))
              .pipe(browser.stream())
            merge(imgStream, cssStream);
            break;
          }
        };
        for (let i = 0; i < files.length; i++) {
          if (files[i].match(/.svg$/)) {
            gulp.src(config.sprite.mixin.svg).pipe(gulp.dest(config.sprite.mixin.dest))
            console.log('Собираются SVG спрайты...');
            gulp.src(config.sprite.svg)
              .pipe(
                svgSprite({
                  shape: {
                    spacing: {
                      padding: 5,
                    },
                  },
                  mode: {
                    css: {
                      dest: './',
                      layout: 'diagonal',
                      sprite: '../sprite/img/sprite.svg',
                      bust: false,
                      render: {
                        scss: {
                          dest: '../sprite/style/sprite-svg.scss',
                          template: './project/src/style/sprite/sprite-template.scss',
                        },
                      },
                    },
                  },
                  variables: {
                    mapname: 'icons',
                  },
                }),
              )
              .pipe(gulp.dest(config.sprite.dest))
              .pipe(browser.stream())
            break;
          }
        };
      } else {
        console.log('Нет спрайтов.');
      }
    });
    done();
  }
};