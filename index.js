/**
 * gulp-derequire
 *
 * https://github.com/twada/gulp-derequire
 *
 * Copyright (c) 2014-2020 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/gulp-derequire/blob/master/MIT-LICENSE
 */
const derequire = require('derequire');
const through = require('through2');
const PluginError = require('plugin-error');
const BufferStreams = require('bufferstreams');

module.exports = (tokenTo, tokenFrom) => {
  const transform = (code) => Buffer.from(derequire(code, tokenTo, tokenFrom));

  return through.obj(function (file, encoding, callback) {
    encoding = encoding || 'utf8';
    if (file.isNull()) {
      this.push(file);
    } else if (file.isBuffer()) {
      file.contents = transform(file.contents.toString(encoding));
      this.push(file);
    } else if (file.isStream()) {
      file.contents = file.contents.pipe(new BufferStreams((err, buf, cb) => {
        if (err) {
          cb(new PluginError('gulp-derequire', err, { showStack: true }));
        } else {
          cb(null, transform(buf.toString(encoding)));
        }
      }));
      this.push(file);
    }
    callback();
  });
};
