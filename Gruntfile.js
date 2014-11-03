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
            /*options: {
                  sourceMap: true
            },*/
            /*main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.js': '<%= concat.main.dest %>'
                }
            },*/
            indexUg: {
                options: {
                    sourceMap: true
                },
                files: {
                    'build/index.min.js': 'js/index.js'
                }
            }

        },

        /*uglifyIndex: {
            options: {
                 sourceMap: true
            },
            main: {
                files: {
                    'build/index.min.js': 'js/index.js'
                }
            }
        },*/


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
            indexJs :{
                files: ['js/index.js']  ,
                tasks: ['uglify'],
                options: {nospawn: true}
            }
        }
       /* _watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: [
                    'js/dateTime.js',
                    'css/leaflet.less',
                    'module/dtp/dtp.less',
                    'lib/jquery/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css'

                ],
                tasks: ['concat', 'uglify', 'less'],
                options: {
                    nospawn: true
                }
            },
            stylesInstruction: {
                files: [
                    "css/instruction.less"
                ],
                tasks: ['less:instruction'],
                options: {
                    nospawn: true
                }
            }
        }*/
    });

    // Загрузка плагинов, установленных с помощью npm install
   // grunt.loadNpmTasks('grunt-contrib-concat');//
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//
    //grunt.loadNpmTasks('grunt-yui-compressor');

    // Задача по умолчанию
   // grunt.registerTask('default', ['concat', 'uglify', 'less', 'less:instruction', 'watch']);

    grunt.registerTask('default', ['uglify','less:login', 'watch']);
};