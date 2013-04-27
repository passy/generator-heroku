/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;


describe('heroku generator', function () {
  beforeEach(function (done) {
    var tmpDir = path.join(__dirname, 'temp');
    helpers.testDirectory(tmpDir, function (err) {
      if (err) {
        return done(err);
      }

      fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({
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

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
