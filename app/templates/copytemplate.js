    copy: {
        dist: {
            files: [{
                expand: true,
                dest: '<%= yeoman.dist %>',
                cwd: 'heroku',
                src: '*',
                rename: function (dest, src) {
                    var path = require('path');
                    if (src === 'distpackage.json') {
                        return path.join(dest, 'package.json');
                    }
                    return path.join(dest, src);
                }
            }]
        }
    }
