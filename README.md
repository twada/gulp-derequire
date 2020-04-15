# gulp-derequire

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Code Style][style-image]][style-url]
[![License][license-image]][license-url]


> A [gulp](https://github.com/gulpjs/gulp) plugin for [derequire](https://github.com/calvinmetcalf/derequire).


## Description
`gulp-derequire` is a gulp plugin to apply [derequire](https://github.com/calvinmetcalf/derequire) to target Buffer/Stream. It's useful when you are building standalone module using [browserify](http://browserify.org/) with gulp.


## Usage

First, install `gulp-derequire` as a development dependency:

```shell
npm install --save-dev gulp-derequire
```

Then, add it to your `gulpfile.js`:

```javascript
const derequire = require('gulp-derequire');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build', () => {
    const bundleStream = browserify({entries: './index.js', standalone: 'yourModule'}).bundle();
    return bundleStream
        .pipe(source('yourModule.js'))
        .pipe(derequire())
        .pipe(gulp.dest('./build'));
});
```

## API

### derequire(parameters)

__Note:__ parameters are passed verbatim to derequire so see [its readme](https://github.com/calvinmetcalf/derequire) for options

#### customization example

to change both require and define

```javascript
const derequire = require('gulp-derequire');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build', () => {
    const bundleStream = browserify({entries: './index.js', standalone: 'yourModule'}).bundle();
    return bundleStream
        .pipe(source('yourModule.js'))
        .pipe(derequire([
            {
                from: 'require',
                to: '_dereq_'
            },
            {
                from: 'define',
                to: '_defi_'
            }
        ]))
        .pipe(gulp.dest('./build'));
});
```


## Author

* [Takuto Wada](https://github.com/twada)


## Support Policy

Supports Node under maintenance. In other words, we stop supporting old Node versions when [their maintenance ends](https://github.com/nodejs/Release). Any other environments are not supported officially (means that we do not test against them on CI service).


## License

Licensed under the [MIT](https://github.com/twada/gulp-derequire/blob/master/MIT-LICENSE) license.


[npm-url]: https://npmjs.org/package/gulp-derequire
[npm-image]: https://badge.fury.io/js/gulp-derequire.svg

[travis-url]: https://travis-ci.org/twada/gulp-derequire
[travis-image]: https://secure.travis-ci.org/twada/gulp-derequire.svg?branch=master

[license-url]: https://github.com/twada/gulp-derequire/blob/master/MIT-LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg

[style-url]: https://github.com/Flet/semistandard
[style-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg
