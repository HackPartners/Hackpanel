/// <vs BeforeBuild='build' />
'use strict';


module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        hackstrapJS: ['app/assets/hackstrap/less/**/*.js'],
        clientViews: ['app/**/*.html'],
        clientJS: ['app/**/*.js', '!app/assets/**/*.js'],
        clientJSMAP: ['app/**/*.js.map'],
        clientLESS: ['app/assets/**/*.less'],
        clientLESSBuild: ['app/assets/less/global.less'],
        clientClean: ['app/**/*.css', 'application.css', 'application.min.css', 'application.js', 'application.min.js'],      
    };


    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true,
                    tasks: ['build']
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jslint', 'build'],
                options: {
                    livereload: true
                }
            },
            clientLESS: {
                files: watchFiles.clientLESS,
                tasks: ['lesslint', 'less', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            hackstrapJS: {
                files: watchFiles.hackstrapJS,
                tasks: ['build'], //add jslint
                options: {
                    livereload: true
                }
            }
        },
        clean: {
            all: {
                src: watchFiles.clientClean
            }
        },
        jslint: {
            all: {
                options: {
                    jshintrc: ".jshintrc"
                },
                files: {
                    src: '<%= applicationJavaScriptFiles %>'
                }
            },
        },
        lesslint: {
            src: watchFiles.clientLESSBuild,
            options: {
                csslint: {
                    csslintrc: '.csslintrc'
                }
            }
        },
        concat: {
            production: {
                files: {
                    'application.js': '<%= applicationJavaScriptFiles %>',
                    'hackstrap.js': '<%= hackstrapJavaScriptFiles %>'
                }
            }
        },
        uglify: {
            production: {
                files: {
                    'application.min.js': 'application.js',
                    'hackstrap.min.js': 'hackstrap.js'
                }
            }
        },
        less: {
            all: {
                files: {
                    "application.css": '<%= applicationLESSFiles %>'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'application.min.css': 'application.css'                    
                }
            }
        },
        shell: {
            runnw: {
                command: "nwjs ."
            }
        },
        concurrent: {
            runwatch: ['watch', 'shell:runnw'] 
        },
        env: {
            test: {
                NODE_ENV: 'test'
            },
            secure: {
                NODE_ENV: 'secure'
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
        var init = require('./config/init')();
        var config = require('./config/load');

        grunt.config.set('hackstrapJavaScriptFiles', config.assets.hackstrapJS);
        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.css);
        grunt.config.set('applicationLESSFiles', config.assets.less);
    });

    // Default task(s).
    grunt.registerTask('default', ['clean:all', 'lint', 'build']);

    // Default task(s).
    grunt.registerTask('dev', ['default', 'watch']);

    // Run Task
    grunt.registerTask('rundev', ['default', 'concurrent:runwatch'])

    // Lint task(s).
    grunt.registerTask('lint', ['jslint', 'lesslint']);

    // Build task(s).
    grunt.registerTask('build', ['less', 'cssmin', 'concat', 'uglify']);

    // Run configuration
    grunt.task.run('loadConfig');
};
