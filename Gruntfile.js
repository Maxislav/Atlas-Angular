module.exports = function (grunt) {




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
                    'build/md5.min.js':
                        [
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
                    'build/index.min.js':
                        [
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
                    'build/regist.min.js':
                        [
                            'build/md5.min.js',
                            'js/controller_regist.js'
                        ]
                }
            },
            forum: {
                options: {
                    sourceMap: true,
                    mangle: false
                },
                files: {
                    'forum/build/forum.min.js':
                        [
                            'build/md5.min.js',
                            'forum/js/app.js',
                            'forum/subjects/general/general.js'
                        ]
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
        replace: {
            example: {
                src: ['forum/build/forum.css'],             // source files array (supports minimatch)
                dest: 'forum/build/forum.css',             // destination directory or file
                replacements: [{
                    from: 'forum/build/',                   // string replacement
                    to: ''
                }]
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
            indexCss:{
                files: ['css/index.less'],
                tasks: ['less:indexCss'],
                options: {nospawn: true}
            },
           /* indexCssMy:{
                files: ['css/index.less'],
                tasks: [
                    'replace',
                    'less:indexCssMy'
                ],
                options: {nospawn: true}
            },*/
            registJs:{
                files: 'js/controller_regist.js',
                tasks: ['uglify:registUg'],
                options: {nospawn: true}
            },
            indexJs:{
                files: 'js/controllers_index.js',
                tasks: ['uglify:indexUg'],
                options: {nospawn: true}
            },
            forum:{
                files: 'forum/css/forum.less',
                tasks: ['less:forum','replace'],
                options: {nospawn: true}
            },
            forumJs: {
                files : [
                    'forum/js/app.js',
                    'forum/subjects/general/general.js'
                ],
                tasks: ['uglify:forum'],
                options: {nospawn: true}
            }


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
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('default',
        [
            'uglify:md5',
            'uglify:indexUg' ,
            'uglify:registUg',
            'less:login',
            'less:forum',
            'replace',
            'uglify:forum',

            'less:indexCss',
            'watch'


        ]
    );
    grunt.registerTask('forum',
        [
            'less:forum',
            'watch'
        ]
    );

    grunt.registerTask('my', ['replace', 'uglify:md5', 'uglify:indexUg' ,'less:login', 'less:indexCssMy', 'watch']);

    grunt.registerTask('pro', ['protractor']);

};