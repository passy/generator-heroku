    copy: {
        dist: {
            files: [{
                dest: '<%= yeoman.dist %>',
                src: [
                    'Procfile',
                    'server.js',
                    'distpackage.json'
                ],
                rename: function (dest, src) {
                    if (src === 'distpackage.json') {
                        return dest + 'package.json';
                    }
                    return dest + src;
                }
            }
        }
    }
