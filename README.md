# gulp-derequire
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> A [gulp](https://github.com/wearefractal/gulp) plugin for [derequire](https://github.com/calvinmetcalf/derequire).

## Usage

First, install `gulp-derequire` as a development dependency:

```shell
npm install --save-dev gulp-derequire
```

Then, add it to your `gulpfile.js`:

```javascript
var derequire = require("gulp-derequire");
var browserify = require('browserify'),

gulp.task('build, function() {
    var bundleStream = browserify({entries: './index.js', standalone: 'yourModule'}).bundle();
    return bundleStream
        .pipe(source('yourModule.js'))
        .pipe(derequire({
            tokenTo: '_dereq_',
            tokenFrom: 'require'
        }))
        .pipe(gulp.dest('./build'));
});
```

## API

### derequire(options)

#### options.tokenFrom
Type: `String`
Default value: `'require'`

Target identifier to replace from.

#### options.tokenTo
Type: `String`
Default value: `'_dereq_'`

Identifier to replace to.


## AUTHOR

* [Takuto Wada](http://github.com/twada)


## LICENSE

Licensed under the [MIT](http://twada.mit-license.org/) license.


[npm-url]: https://npmjs.org/package/gulp-derequire
[npm-image]: https://badge.fury.io/js/gulp-derequire.svg

[travis-url]: http://travis-ci.org/twada/gulp-derequire
[travis-image]: https://secure.travis-ci.org/twada/gulp-derequire.svg?branch=master

[depstat-url]: https://gemnasium.com/twada/gulp-derequire
[depstat-image]: https://gemnasium.com/twada/gulp-derequire.svg
