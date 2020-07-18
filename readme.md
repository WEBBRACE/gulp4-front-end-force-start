# Стартовая front-end сборка GULP - WEBBRACE.RU
`Версия 5.0.2`

Инкрементальная сборка Gulp4 с использованием препроцессора PUG и SCSS.
Используется MIXIN: БЭМ/SVG Sprite/PNG Sprite/Media inquiries/Fonts SCSS

**Для запуска команд `gulp tinypng` и `gulp ftp` необходимо создать файл `access.js` в папке `/gulp`:**

```js
module.exports = {
  // Уникальный ID с сайта https://tinypng.com/ (для "gulp tinypng")
  tinypng: '************************************',
  // FTP Доступ к сайту (для "gulp ftp")
  ftp: {
    host: '***********',
    user: '***********',
    password: '***********',
    directory: '***********',
  }
};
```

## Брейкпоинты

```scss
$phonesmall: 350;     //320-349px
$phone: 576;          //350-575px
$tabletsmall: 768;    //576-767px
$tablet: 992;         //768-991px
$notebook: 1200;      //992-1200px
```

## Примеры использования MIXIN

**Медиа-запросы:**

```scss
.example {
  .tabs {
    margin-top: 60px;
    @include mq('notebook') {
      margin-top: 20px;
    }
  }
}
```

**Адаптивный шрифт:**

```scss
@include fz(40, 24);      //($notebook, $phonesmall)
```

**Подключение шрифтов:**

```scss
@include font('Arial', 'Arial', 'fallback', 'normal', 'normal');
```

**БЭМ:**

```scss
.block {                          // .block
  @include e('element') {         // .block__element
    @include m('modifier') {}     // .block__element--modifier
  }
  @include m('modifier') {        // .block--modifier
    @include e('element') {}      // .block--modifier__element
  }
}
```

**Cпрайты png:**

```scss
.sprite-png {
  display: inline-block;
  @include sprite($address);
}
```

**Cпрайты svg:**

```scss
.sprite-svg {
  font-size: 16px;
  display: inline-block;
  @include spriteSvg(address);
  &:hover {
    @include spriteSvg(addressHover, bg);
  }
}
```