var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);
var isLinux32 = /^linux/.test(process.platform);
var isLinux64 = /^linux64/.test(process.platform);

var os = "unknown";

if (isWin)
    os = "win";
if (isMac)
    os = "mac";
if (isLinux32)
    os = "linux32";
if (isLinux64)
    os = "linux64";

var nwVer = '0.12.2';

var nwExec = "";

if (!isMac)
    nwExec = "cd cache/" + os + "/" + nwVer + " && nw ../../../src";
else
    nwExec = "cd cache/" + os + "/" + nwVer + " && open -n -a node-webkit ../../../src";

console.log("OS: " + os);

module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        hackstrapJS: ['app/assets/hackstrap/less/**/*.js'],
        clientViews: ['app/**/*.html', '!app/node_modules'],
        clientJS: ['app/**/*.js', '!app/assets/**/*.js'],
        clientJSMAP: ['app/**/*.js.map', '!app/node_modules'],
        clientLESS: ['app/assets/**/*.less'],
        clientLESSBuild: ['app/assets/less/global.less'],
        clientClean: ['app/**/*.css', 'app/application.*', '!app/node_modules', 'app/hackstrap.*'],      
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
                    'app/application.js': '<%= applicationJavaScriptFiles %>',
                    'app/hackstrap.js': '<%= hackstrapJavaScriptFiles %>'
                }
            }
        },
        uglify: {
            production: {
                files: {
                    'app/application.min.js': 'app/application.js',
                    'app/hackstrap.min.js': 'app/hackstrap.js'
                }
            }
        },
        less: {
            all: {
                files: {
                    "app/application.css": '<%= applicationLESSFiles %>'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'app/application.min.css': 'app/application.css'                    
                }
            }
        },
        shell: {
            runnw: {
                command: function() {
                    return "cd app && nw ."
                }
            },
            install: {
                command: function() {
                    return 'cd app && npm install --verbose';
                },
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true
                }
            },
        },
        concurrent: {
            runwatch: ['watch', 'shell:runnw'] 
        },
        nodewebkit: {
            options: {
                version: nwVer,
                build_dir: './build',
                mac: isMac,
                win: isWin,
                linux32: isLinux32,
                linux64: isLinux64,
                keep_nw: false,
                zip: false,
                mac_icns:'./app/assets/images/logos/hp.icns'
            },
            src: ['./app/**/*']
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js',
            singleRun: true
          }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            },
            secure: {
                NODE_ENV: 'secure'
            },
            development: {
                NODE_ENV: 'development'
            },
            production: {
                NODE_ENV: 'production'
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
    grunt.registerTask('rundev', ['env:development', 'default', 'concurrent:runwatch'])

    // Lint task(s).
    grunt.registerTask('lint', ['jslint', 'lesslint']);

    // Build task(s).
    grunt.registerTask('build', ['less', 'cssmin', 'concat', 'uglify']);

    // Run unit tests
    grunt.registerTask('test',  ['default', 'karma']);

    // Install all
    grunt.registerTask('package', ['env:production', 'default', 'shell:install', 'nodewebkit']);

    // Run configuration
    grunt.task.run('loadConfig');
};
