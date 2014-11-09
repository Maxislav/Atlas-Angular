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
                            'js/md5.js'
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
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2

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
                    optimization: 2

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
                src: ['css/index.less'],             // source files array (supports minimatch)
                dest: 'css/index_my.less',             // destination directory or file
                replacements: [{
                    from: '/img/logo.png',                   // string replacement
                    to: '/img/logo_my.jpg'
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
                tasks: ['less:forum'],
                options: {nospawn: true}
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
   // grunt.loadNpmTasks('grunt-contrib-concat');//
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//
    grunt.loadNpmTasks('grunt-text-replace');
    //grunt.loadNpmTasks('grunt-yui-compressor');

    // Задача по умолчанию
   // grunt.registerTask('default', ['concat', 'uglify', 'less', 'less:instruction', 'watch']);

    grunt.registerTask('default',
        [
            'uglify:md5',
            'uglify:indexUg' ,
            'uglify:registUg',
            'less:login',

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


};