    copy: {
        dist: {
            files: [{
                expand: true,
                dest: '<%= yeoman.dist %>',
                cwd: 'heroku',
                src: '*',
                rename: function (dest, src) {
                    if (src === 'distpackage.json') {
                        return dest + 'package.json';
                    }
                    return dest + src;
                }
            }]
        }
    }
