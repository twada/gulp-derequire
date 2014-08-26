# gulp-derequire
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> A [gulp](https://github.com/wearefractal/gulp) plugin for [derequire](https://github.com/calvinmetcalf/derequire).


## Description
`gulp-derequire` is a gulp plugin to apply [derequire](https://github.com/calvinmetcalf/derequire) to target Buffer/Stream. It's useful when you are building standalone module using [browserify](http://browserify.org/) with gulp.


## Usage

First, install `gulp-derequire` as a development dependency:

```shell
npm install --save-dev gulp-derequire
```

Then, add it to your `gulpfile.js`:

```javascript
var derequire = require('gulp-derequire');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
    var bundleStream = browserify({entries: './index.js', standalone: 'yourModule'}).bundle();
    return bundleStream
        .pipe(source('yourModule.js'))
        .pipe(derequire())
        .pipe(gulp.dest('./build'));
});
```

## API

### derequire(options)

__Note:__ According to the [derequire](https://github.com/calvinmetcalf/derequire) README, the token you're changing from and the token you're changing to need to be the same length.

#### options.tokenFrom
Type: `String`
Default value: `'require'`

Target identifier to replace from.

#### options.tokenTo
Type: `String`
Default value: `'_dereq_'`

Identifier to replace to.

#### customization example

```javascript
var derequire = require('gulp-derequire');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
    var bundleStream = browserify({entries: './index.js', standalone: 'yourModule'}).bundle();
    return bundleStream
        .pipe(source('yourModule.js'))
        .pipe(derequire({
            tokenTo:   '_dereq_',
            tokenFrom: 'require'
        }))
        .pipe(gulp.dest('./build'));
});
```


## Author

* [Takuto Wada](http://github.com/twada)


## License

Licensed under the [MIT](http://twada.mit-license.org/) license.


[npm-url]: https://npmjs.org/package/gulp-derequire
[npm-image]: https://badge.fury.io/js/gulp-derequire.svg

[travis-url]: http://travis-ci.org/twada/gulp-derequire
[travis-image]: https://secure.travis-ci.org/twada/gulp-derequire.svg?branch=master

[depstat-url]: https://gemnasium.com/twada/gulp-derequire
[depstat-image]: https://gemnasium.com/twada/gulp-derequire.svg
