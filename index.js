/**
 * gulp-derequire
 * 
 * https://github.com/twada/gulp-derequire
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
var through = require('through2'),
    gutil = require('gulp-util'),
    xtend = require('xtend'),
    derequire = require('derequire'),
    BufferStreams = require('bufferstreams');

module.exports = function (params) {
    'use strict';

    var opts = xtend({
        tokenTo: '_dereq_',
        tokenFrom: 'require'
    }, params);

    var transform = function (code) {
        return new Buffer(derequire(code, opts.tokenTo, opts.tokenFrom));
    };

    return through.obj(function (file, encoding, callback) {
        encoding = encoding || 'utf8';
        if (file.isNull()) {
            this.push(file);
        } else if (file.isBuffer()) {
            file.contents = transform(file.contents.toString(encoding));
            this.push(file);
        } else if (file.isStream()) {
            file.contents = file.contents.pipe(new BufferStreams(function(err, buf, cb) {
                if(err) {
                    cb(new gutil.PluginError('gulp-derequire', err, {showStack: true}));
                } else {
                    cb(null, transform(buf.toString(encoding)));
                }
            }));
            this.push(file);
        }
        callback();
    });
};
