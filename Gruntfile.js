/*
 * @version : 1.0.1
 *@author :Yang Hong
 *@description manager less and uglify js with node
*/

module.exports = function(grunt){
	grunt.initConfig({
		less : {
			compileMain : {
				options : {},
				files : {
					
				}
			},
			minify : {
				options : {
                    cleancss : true,
                    report : 'min',
                    compress : true,
                    cleancssOptions : {
                        keepSpecialComments : 0,
                        keepBreaks : false
                    }
                },
				files : {
					'css/lib/bootstrap-theme.min.css':'css/lib/bootstrap-theme.css',
					'css/lib/bootstrap.min.css':'css/lib/bootstrap.css',
					'css/lib/font-awesome.min.css':'css/lib/font-awesome.css'
				}
			}
		},
		uglify : {
			options: {
                banner: '\n'
            },
            bulid: {
                src: 'js/lib/jquery-1.11.3.js',
                dest: 'js/lib/jquery-1.11.3.min.js'
            },
            bulid1: {
                src: 'js/lib/bootstrap.js',
                dest: 'js/lib/bootstap.min.js'
            },
            bulid2: {
                src: 'js/lib/jquery.autocomplete.js',
                dest: 'js/lib/jquery.autocomplete.min.js'
            },
            bulid3: {
                src: 'js/lib/jquery.createuuid.js',
                dest: 'js/lib/jquery.createuuid.min.js'
            }
		},
		watch : {
			scripts : {
				files : ['less/*.less'],
				tasks : ['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [ 'less', 'watch' ]);
    grunt.registerTask('build', [ 'less', 'uglify' ]);
}