# Generator heroku
[![Build Status](https://secure.travis-ci.org/passy/generator-heroku.png?branch=master)](https://travis-ci.org/passy/generator-heroku) [![NPM version](https://badge.fury.io/js/generator-heroku.png)](http://badge.fury.io/js/generator-heroku) [![Dependency Status](https://gemnasium.com/passy/generator-heroku.png)](https://gemnasium.com/passy/generator-heroku)

A generator for Yeoman that sets up heroku hosting for you by creating a
`Procfile` and setting up a node-based static http server using
[static](https://github.com/hongymagic/statik).

## Roadmap

Once there are placeholders in Yeoman, this will automatically rewire your
Gruntfile to automatically copy the required files. For now, you have to
manually adjust your build step for this to work comfortably.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-heroku`
- Make sure you are in the root of your existing Yeoman application.
- Run: `yo heroku`

## Options

- `--dist` lets you choose a distribution directory other than the default `dist`.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
