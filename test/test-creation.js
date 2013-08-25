/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;


describe('heroku generator', function () {
  beforeEach(function (done) {
    this.tmpDir = path.join(__dirname, 'temp');
    helpers.testDirectory(this.tmpDir, function (err) {
      if (err) {
        return done(err);
      }

      fs.writeFileSync(path.join(this.tmpDir, 'package.json'), JSON.stringify({
        name: 'testproj',
        version: '1.3.7'
      }));

      this.app = helpers.createGenerator('heroku:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'heroku/Procfile',
      'heroku/server.js',
      ['heroku/distpackage.json', /"name": "testproj"/]
    ];

    helpers.mockPrompt(this.app, {
      'distGit': 'Y'
    });

    // Override the system check.
    this.app.checkInstallation = function () {};

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('works w/o package.json', function (done) {
    helpers.mockPrompt(this.app, {
      'distGit': 'N'
    });

    var pkgPath = path.join(this.tmpDir, 'package.json');
    fs.unlinkSync(pkgPath);
    // Override the system check.
    this.app.checkInstallation = function () {};

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      done();
    });
  });
});
