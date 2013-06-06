'use strict';
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
var path = require('path');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

var HerokuGenerator = module.exports = function HerokuGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.options = options;
  this.distDir = options.dist || 'dist';
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
    type: 'confirm',
    name: 'distRepo',
    message: 'Do you want a separate git repository in dist/?'
  }];

  this.prompt(prompts, function (props) {
    this.distRepo = props.distRepo;

    cb();
  }.bind(this));
};

HerokuGenerator.prototype.nodestatic = function nodestatic() {
  this.mkdir('heroku');
  this.copy('Procfile', 'heroku/Procfile');
  this.copy('server.js', 'heroku/server.js');
};

HerokuGenerator.prototype.distpackage = function distpackage() {
  var pkg = JSON.parse(this.readFileAsString('package.json'));
  var distPkg = {
    name: pkg.name || 'unnamed',
    version: '0.0.0',
    dependencies: {
      'statik': '~1.2.5'
    }
  };

  this.write('heroku/distpackage.json', JSON.stringify(distPkg, null, 2));
};

HerokuGenerator.prototype.rewiregrunt = function rewiregrunt() {
  var template = this.readFileAsString(path.join(__dirname, 'templates', 'copytemplate.js'));

  console.log(
    'Please add this copy task rule to your Gruntfile: \n'.yellow +
    template
  );
};

HerokuGenerator.prototype.gitsetup = function gitsetup() {
  if (this.distRepo) {
    exec('git init', { cwd: this.distDir });
    console.log('You\'re all set! Now go to ' + this.distDir + ' and run\n\t'.green +
                'heroku apps:create'.bold);
  } else {
    fs.readFile('.gitignore', { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        return;
      }

      // Remove dist/ ignore
      data = data.replace(new RegExp(escapeRegExp(this.distDir) + '\/?\n', 'g'), '');

      // Fire and forget
      fs.writeFile('.gitignore', data);
    }.bind(this));
    console.log('You\'re all set! Now run\n\t'.green + 'heroku apps:create'.bold +
                '\nand push your ' + this.distDir + ' directory with\n\t'.green +
                'git subtree push --prefix dist heroku master'.bold);
  }
};
