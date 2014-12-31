module.exports = function (grunt) {

    var sassMapFiles = [
        'css/map.scss',
        'css/leaflet.scss',
        'css/extendleaflet.scss',
        'css/header.scss',
        'css/block-items.scss',
        'css/animate.scss',
        'css/modal.scss',
        'css/animate-mask.scss',
        'css/setting-options.scss',
        'css/block-one-object.scss',
        'css/info-object.scss'
    ]

    var sassIndexFiles = [
        'css/index.scss'
    ]

    var jsMapFiles = [
        "lib/leaflet/leaflet.js",
        "lib/angular/angular.min.js",
        "js/extendHttp.js",
        "lib/angular/angular-animate.js",
        "lib/angular/angular-timer.js",

        "js/map.js",
        "item/template.js",
        "js/controller/modal-contrl.js",
        "js/controller/mask-contrl.js",
        "js/controller/setting-options-contrl.js",
        "js/controller/objects-contrl.js",
        "js/controller/footer-contrl.js",
        "js/controller/map-contrl.js",
        "js/controller/head-contrl.js",

        "js/service/service-modal.js",
        "js/directive/main-map.js",
        "js/directive/block-items.js",
        "js/directive/directive-modal.js",
        "js/directive/directive-mask.js",
        "js/directive/directive-setting-options.js",
        "js/directive/directive-valid.js",
        "js/directive/directive-state-obj.js",
        "js/directive/directive-infoobject.js",

        "js/factory/factory-setting-options.js",
        "js/factory/factory-get-options.js",
        "js/factory/factory-get-devices.js",
        "js/factory/factory-valid.js",
        "js/factory/factory-format-date.js",
        "js/factory/factory-marker.js"

    ]


    // Задачи
    grunt.initConfig({
        // Склеиваем


        concat: {
            main: {
                src: [
                    'lib/leaflet/leaflet.js'
                ],
                dest: 'build/scripts.js'
            }
        },
        // Сжимаем
        uglify: {
            md5: {
                options: {
                    sourceMap: true
                },
                files: {
                    'build/md5.min.js': [
                        'js/md5.js',
                        'js/extendHttp.js'
                    ]
                }
            },
            indexUg: {
                options: {
                    sourceMap: true,
                    mangle: false
                },
                files: {
                    'build/index.min.js': [
                        'build/md5.min.js',
                        'js/controllers_index.js'
                    ]
                }
            },
            registUg: {
                options: {
                    sourceMap: true,
                    mangle: false
                },
                files: {
                    'build/regist.min.js': [
                        'build/md5.min.js',
                        'js/controller_regist.js'
                    ]
                }
            },
            map: {
                options: {
                    sourceMap: false,
                    mangle: false
                },
                files: {
                    'build/map.min.js': jsMapFiles
                }
            }
        },
        sass: {
            dev: {
                options: {
                    sourcemap: 'auto'
                },
                files: {
                    'build/index.css': sassIndexFiles,
                    'build/map.css': sassMapFiles
                }
            },
            prod: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    'build/index.css': sassIndexFiles,
                    'build/map.css': sassMapFiles
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    sourceMap: true,
                    sourceMapFilename: "assets/style/bootstrap.css.map",
                    sourceMapBasepath: "assets/style/"

                },
                files: {
                    "module/dtp/dtp.css": "module/dtp/dtp.less",
                    "build/css.css": [
                        "css/leaflet.less",
                        "lib/jquery/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css",
                        "dist/leaflet.css"
                    ]

                }
            },
            login: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2

                },
                files: {
                    "build/login.css": [
                        "css/login.less",
                        'item/header.less',
                        'item/footer.less',
                        'module/listobjects/listobjects.less'
                    ]
                }
            },
            indexCss: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2

                },
                files: {
                    "build/index.css": [
                        "css/index.less"
                    ]
                }
            },
            indexCssMy: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2

                },
                files: {
                    "build/index.css": [
                        "css/index_my.less"
                    ]
                }
            },
            forum: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    sourceMap: true,
                    sourceMapFilename: "forum/build/forum.css.map",
                    sourceMapBasepath: "../forum"


                },
                files: {
                    "forum/build/forum.css": [
                        "forum/css/forum.less"
                    ]
                }
            }
        },
        ngtemplates: {
            app: {
                options: {
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
                },
                src: 'item/**.html',
                dest: 'item/template.js'

            }
        },
        'string-replace': {
            dev: {
                files: {
                    'map.html': 'map.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\<\!\-\-\$dev\s/,
                            replacement: function () {
                                return '<!--$dev-->'
                            }
                        },
                        {
                            pattern: /\s\&dev\-\-\>/,
                            replacement: function () {
                                return '<!--&dev-->'
                            }
                        },
                        {
                            pattern: /\<\!\-\-\$prod\-\-\>/,
                            replacement: function () {
                                return '<!--$prod '
                            }
                        },
                        {
                            pattern: /\<\!\-\-\&prod\-\-\>/,
                            replacement: function () {
                                return ' &prod-->'
                            }
                        }
                    ]
                }
            },
            prod: {
                files: {
                    'map.html': 'map.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\<\!\-\-\$prod\s/,
                            replacement: function () {
                                return '<!--$prod-->'
                            }
                        },
                        {
                            pattern: /\s\&prod\-\-\>/,
                            replacement: function () {
                                return '<!--&prod-->'
                            }
                        },
                        {
                            pattern: /\<\!\-\-\$dev\-\-\>/,
                            replacement: function () {
                                return '<!--$dev '
                            }
                        },
                        {
                            pattern: /\<\!\-\-\&dev\-\-\>/,
                            replacement: function () {
                                return ' &dev-->'
                            }
                        }
                    ]
                }
            }
        },

        watch: {
            login: {
                // Which files to watch (all .less files recursively in the less directory)
                files: [
                    'css/login.less',
                    'item/header.less',
                    'item/footer.less',
                    'module/listobjects/listobjects.less'
                ],
                tasks: ['less:login'],
                options: {
                    nospawn: true
                }
            },
            indexCss: {
                files: sassIndexFiles,
                tasks: ['sass:dev'],
                options: {nospawn: true}
            },
            sassFiles: {
                files: sassMapFiles,
                tasks: ['sass:dev'],
                options: {nospawn: true}
            },
            registJs: {
                files: 'js/controller_regist.js',
                tasks: ['uglify:registUg'],
                options: {nospawn: true}
            },
            indexJs: {
                files: 'js/controllers_index.js',
                tasks: ['uglify:indexUg'],
                options: {nospawn: true}
            }
            /* forum:{
             files: 'forum/css/forum.less',
             tasks: ['less:forum','replace'],
             options: {nospawn: true}
             },*/
            /*forumJs: {
             files : [
             'forum/js/app.js',
             'forum/subjects/general/general.js'
             ],
             tasks: ['uglify:forum'],
             options: {nospawn: true}
             }*/


        },
        protractor: {
            protractor: {
                options: {
                    configFile: "test/conf.js", // Default config file
                    keepAlive: true, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                    }
                },
                your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.

                    /* options: {
                     configFile: "e2e.conf.js", // Target-specific config file
                     args: {} // Target-specific arguments
                     }*/
                }
            }
        }
    });

    //grunt.initConfig.protractor = require( '/home/mars/www/AtlasRevolution/test/conf.js' ) ;

    // Загрузка плагинов, установленных с помощью npm install
    // grunt.loadNpmTasks('grunt-contrib-concat');//
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default',
        [
            'uglify:md5',
            'uglify:indexUg' ,
            'uglify:registUg',
            'sass:dev',
            'string-replace:dev',
            'watch'
        ]
    );

    grunt.registerTask('prod', [
        'uglify:md5',
        'uglify:indexUg' ,
        'uglify:registUg',
        'ngtemplates',
        'uglify:map',
        'sass:prod',
        'string-replace:prod'
    ]);

};