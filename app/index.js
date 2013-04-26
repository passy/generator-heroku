'use strict';
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;


var HerokuGenerator = module.exports = function HerokuGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    if (!options['skip-install']) {
      if (!this.options['skip-install']) {
        this.npmInstall('statik', { save: true });
      }
    }
  });
};

util.inherits(HerokuGenerator, yeoman.generators.Base);

HerokuGenerator.prototype.checkInstallation = function checkInstallation() {
  var done = this.async();

  this.herokuInstalled = false;
  exec('heroku --version', function (err) {
    if (err) {
      this.log.error('You don\'t have the Heroku Toolbelt installed. ' +
                     'Grab it from https://toolbelt.heroku.com/');
    } else {
      this.herokuInstalled = true;
    }
    done();
  }.bind(this));
};

HerokuGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'distRepo',
    message: 'Do you want a separate git repository in dist/?',
    default: 'Y/n'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.distRepo = (/y/i).test(props.distRepo);

    cb();
  }.bind(this));
};

HerokuGenerator.prototype.nodestatic = function nodestatic() {
  this.copy('Procfile', 'Procfile');
  this.copy('server.js', 'server.js');
};

HerokuGenerator.prototype.gitsetup = function gitsetup() {
  if (this.distRepo) {
    exec('git init', { cwd: 'dist/' });
    console.log('You\'re all set! Now go to dist/ and run\n\t'.green +
                'heroku apps:create'.bold);
  } else {
    fs.readFile('.gitignore', { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        return;
      }

      // Remove dist/ ignore
      data = data.replace(/dist\/?\n/g, '');

      // Fire and forget
      fs.writeFile('.gitignore', data);
    });
    console.log('You\'re all set! Now run\n\t'.green + 'heroku apps:create'.bold +
                '\nand push your dist/ directory with\n\t'.green +
                'git subtree push --prefix dist heroku master'.bold);
  }
};
