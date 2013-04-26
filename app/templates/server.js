'use strict';

var statik = require('statik');
var server = statik.createServer('dist/');
server.listen();
