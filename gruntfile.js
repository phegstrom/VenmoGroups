module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		watch: {
			react: {
                files: ['./react-new/**/*.jsx'],
                tasks: ['browserify:jsx']
            },
            sass: {
				files: ['./public/sass/**/*.scss'],
				tasks: ['sass', 'concat:css', 'cssmin']
            }
		},
        browserify: {
            options: {
                debug: true,
                transform: [['babelify']]	
            },
            jsx: {
                src: ['./react-new/**/*.jsx'],
                dest: './public/scripts/react/bundle.js'
            }
        },		
		sass: {
			options: {
				sourcemap: 'none'
			},
			dist:{
				files: [{
					expand: true,
					cwd: 'public/sass',
					src: ['**/*.scss'],
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},
		concat: {
			options: {
				separator: "\n",
				stripBanners: true,
				banner: '/*! <% pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			css: {
				src: ['public/css/*.css'],
				dest: 'public/css/build/combined-build.css'
			},
		},		
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: './public/css/build',
					src: ['*.css', '!*.min.css'],
					dest: './public/css/build',
					ext: '.min.css'
				}]
			}
		}				
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');


	// individual commands that can be executed from command line
	// type 'grunt <task alias name>'
	grunt.registerTask('default', ['watch']);

	grunt.registerTask('react', ['browserify:jsx']);
	grunt.registerTask('dev', ['watch:react']);
	grunt.registerTask('sassBuild',['sass']);
	grunt.registerTask('minify',['cssmin']);
	grunt.registerTask('css', ['sass', 'concat:css', 'cssmin']);
	grunt.registerTask('build', ['browserify', 'sass', 'cssmin']);

};