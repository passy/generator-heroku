# Yeoman Generator Heroku

[![Greenkeeper badge](https://badges.greenkeeper.io/passy/generator-heroku.svg)](https://greenkeeper.io/)
[![Build status](http://img.shields.io/travis/passy/generator-heroku/master.svg?style=flat
)](https://travis-ci.org/passy/generator-heroku)
[![NPM version](http://img.shields.io/npm/v/generator-heroku.svg?style=flat)](http://badge.fury.io/js/generator-heroku)
[![Dependecy Status](http://img.shields.io/gemnasium/passy/generator-heroku.svg?style=flat)](https://gemnasium.com/passy/generator-heroku)

![Heroku + Yeoman](http://i.imgur.com/tnAKm1f.png)

## Introduction

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
