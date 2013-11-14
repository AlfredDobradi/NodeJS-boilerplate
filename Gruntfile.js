module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js','config.js','app.js','lib/**/*.js','routes/**/*.js','public/js/*.js']
		},
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> !*/'
            },
            dist: {
                files: {
                    'public/build/js/vendor.min.js': [ 'bower_components/jquery/jquery.min.js', 'bower_components/bootstrap/dist/js/*.min.js' ],
                    'public/build/js/client.min.js': [ 'public/js/*.js' ]
                }
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    
    //grunt.registerTask('uglify',['uglify:client','uglify:globals']);
    grunt.registerTask('cleanup','Clean up task',function(when) {
        if ( null === when || when == 'before' ) {
            console.log('Cleanup:Before');
            if ( grunt.file.exists('public/js/vendor.min.js') ) {
                grunt.file.delete('public/js/vendor.min.js');
            }
            if ( grunt.file.exists('public/js/client.min.js') ) {
                grunt.file.delete('public/js/client.min.js');
            }
            if ( ! grunt.file.exists('public/build') ) {
                grunt.file.mkdir('public/build');
            }
        } else {
            console.log('Cleanup:After');
            if ( grunt.file.exists('public/build/js/client.min.js') ) {
                grunt.file.recurse('public/js',function(abspath,rootdir,subdir,filename) {
                    console.log('Deleted '+abspath);
                    //grunt.file.delete(abspath);
                });
                grunt.file.recurse('public/build/js',function(abspath,rootdir,subdir,filename) {
                    console.log('Copying '+filename);
                    grunt.file.copy(abspath,'public/js/'+filename);
                });
                console.log('Deleting /public/build');
                //grunt.file.delete('public/build');
            }
        }
    });
    grunt.registerTask('default',['jshint','cleanup:before','uglify','cleanup:after']);
    grunt.registerTask('build',['uglify']);
};