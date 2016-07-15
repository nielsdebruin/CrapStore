"use strict";
module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        CrapStore: {
            "root": __dirname,
            "server": __dirname+"/server",
            "client": __dirname+"/client",
            "dist": __dirname+"/dist"
        },

        // Inject bower assets
        wiredep: {
            targetEJS: {
                src: [
                    '<%= CrapStore.server %>/views/**/*.ejs',
                ],
                options: {
                    //directory: "<%= CrapStore.client %>/bower_components",
                    ignorePath: /(\.\.\/)+client/g
                }
            }
        },

        copy: {
            dist: {
                dot: true,
                cwd: 'client',
                dest: 'dist/public',
                src: '**/*',
                expand: true,
                filter: "isFile"
            }
        },

        express: {
            options: {},
            dev: {
                options: {
                    script: '<%= CrapStore.server %>/app.js'
                }
            }
        },

        watch: {
            express: {
                files: ['<%= CrapStore.server %>/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },

            client: {
                files: [
                    '<%= CrapStore.client %>/{js,styles}/**/*.*',
                    '<%= CrapStore.server %>/**/*.ejs'
                ],
                tasks: [],
                options: {
                  livereload: true
                }
            }
        },

        injector: {
            css: {
                options: {
                    relative: true,
                    transform: function(filePath, i) {
                        filePath = filePath.replace(/(\.\.\/)+client/g, '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                },
                files: {
                    '<%= CrapStore.server %>/views/header.ejs': ['<%= CrapStore.client %>/styles/**/*.css'],
                }
            },
            js: {
                options: {
                    relative: true,
                    transform: function(filePath, i) {
                        filePath = filePath.replace(/(\.\.\/)+client/g, '');
                        return '<script src="' + filePath + '"></script>';
                    },
                },
                files: {
                    '<%= CrapStore.server %>/views/header.ejs': ['<%= CrapStore.client %>/js/**/*.js'],
                }
            }
        },

        protractor: {
            options: {
                configFile: "protractor.config.js",
                keepAlive: true,
                noColor: false,
                args: {},
                webdriverManagerUpdate: true
            },
            all: {
                options: {
                    args: {}
                }
            },
        },
    });

    grunt.registerTask("build", function(target) {
        if (target === "dist") {
            grunt.task.run([
                "wiredep",
                "injector"
            ]);
        } else {
            grunt.task.run([
                "wiredep",
                "injector"
            ]);
        }
    });

    grunt.registerTask("test", function() {
        grunt.task.run([
            "build",
            "express:dev",
            "protractor"
        ]);
    });

    grunt.registerTask("serve", function(target) {
        grunt.task.run([
            "build",
            "express:dev",
            "watch"
        ])
    })
};