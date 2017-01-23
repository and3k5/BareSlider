module.exports = function (grunt) {
	grunt.initConfig({
		uglify : {
			prodfile : {
				files : {
					'dist/bareSlider.min.js' : ['src/bareSlider.js']
				},
				options : {
					mangle : false,
					compress : true
				}
			},
			devfile : {
				files : {
					'dist/bareSlider.js' : ['src/bareSlider.js']
				},
				options : {
					mangle : false,
					compress : false,
					beautify : true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify:prodfile', 'uglify:devfile']);
};
