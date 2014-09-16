## 2.0.0 (2014-09-16)


* **gulp-derequire:** use same paramaters as derequire ([a20ac9bc](https://github.com/twada/gulp-derequire/commit/a20ac9bc9e3e6a02cb366f19b06a543d0a0c5d30)) by @calvinmetcalf


#### Breaking Changes

Now parameters are passed verbetim to derequrie so see [its readme](https://github.com/calvinmetcalf/derequire) for options.

If parameters are already customized, you have to migrate. To migrate, change your code from the following:

```javascript
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

To:

```javascript
gulp.task('build', function() {
    var bundleStream = browserify({entries: './index.js', standalone: 'yourModule'}).bundle();
    return bundleStream
        .pipe(source('yourModule.js'))
        .pipe(derequire([
            {
                from: 'require',
                to: '_dereq_'
            }
        ]))
        .pipe(gulp.dest('./build'));
});
```


## 1.1.0 (2014-09-12)


* **gulp-derequire:** update derequire to 1.2.0 ([2ef6e8c1b1](https://github.com/twada/gulp-derequire/commit/2ef6e8c1b1))


## 1.0.0 (2014-08-26)


* **gulp-derequire:** update derequire to 1.1.0 ([a9558779](https://github.com/twada/gulp-derequire/commit/a95587790c2015e4147031ba0517301efb2a0b4e))
