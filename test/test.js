'use strict';

delete require.cache[require.resolve('../')];

const fs = require('fs');
const es = require('event-stream');
const assert = require('assert');
const Vinyl = require('vinyl');
const derequire = require('../');

describe('gulp-derequire', () => {
  it('should produce expected file via buffer', (done) => {
    const stream = derequire();
    const srcFile = new Vinyl({
      path: 'test/fixtures/example.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/example.js')
    });
    const expectedFile = new Vinyl({
      path: 'test/expected/example.js',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/example.js')
    });
    stream.on('error', (err) => {
      assert(err);
      done(err);
    });
    stream.on('data', (newFile) => {
      assert(newFile);
      assert(newFile.contents);
      assert.strictEqual(String(newFile.contents), String(expectedFile.contents));
      done();
    });
    stream.write(srcFile);
    stream.end();
  });

  it('should produce expected file via stream', (done) => {
    const stream = derequire();
    const srcStream = new Vinyl({
      path: 'test/fixtures/example.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.createReadStream('test/fixtures/example.js')
    });
    const expectedFile = new Vinyl({
      path: 'test/expected/example.js',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/example.js')
    });
    stream.on('error', (err) => {
      assert(err);
      done();
    });
    stream.on('data', (newFile) => {
      assert(newFile);
      assert(newFile.contents);
      newFile.contents.pipe(es.wait((err, data) => {
        assert(!err);
        assert.strictEqual(String(data), String(expectedFile.contents));
        done();
      }));
    });
    stream.write(srcStream);
    stream.end();
  });

  it('it should work with options', (done) => {
    const stream = derequire([
      {
        from: 'require',
        to: '_derec_'
      },
      {
        from: 'define',
        to: '_defi_'
      }
    ]);
    const srcFile = new Vinyl({
      path: 'test/fixtures/define.require.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/define.require.js')
    });
    const expectedFile = new Vinyl({
      path: 'test/expected/define.require.js',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/define.require.js')
    });
    stream.on('error', (err) => {
      assert(err);
      done(err);
    });
    stream.on('data', (newFile) => {
      assert(newFile);
      assert(newFile.contents);
      assert.strictEqual(String(newFile.contents), String(expectedFile.contents));
      done();
    });
    stream.write(srcFile);
    stream.end();
  });
});
