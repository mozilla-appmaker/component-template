// use as:  grunt karma:dev for continuous testing or
//          grunt karma:unit to just run the test once
//          grunt test-server to display the test runner page

module.exports = function(grunt) {
  var path = require('path');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'conf/karma.conf.js',
        singleRun: true,
        browsers: ['FirefoxNightly']
      },
      ci: {
        configFile: 'conf/karma.conf.js',
        singleRun: true,
        browsers: ['Firefox']
      },
      dev: {
        configFile: 'conf/karma.conf.js',
        singleRun: false,
        browsers: ['FirefoxNightly']
      },
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: __dirname+'/../',
          keepalive: true,
          open: 9001+'/'+path.basename(__dirname)+'/index.html'
        }
      }
    },
  });

  grunt.registerTask('test-server', 'start web server for tests in browser', function() {
    grunt.event.once('connect.server.listening', function(host, port) {
      var specRunnerUrl = 'http://' + host + ':' + 9001+'/'+path.basename(__dirname)+'/index.html';
      grunt.log.writeln('test runner available at: ' + specRunnerUrl);
      require('open')(specRunnerUrl);
    });

    grunt.task.run('connect:server');
  });
  grunt.registerTask('default', 'help message', function() {
    grunt.log.writeln('\n\nRun:\n\'grunt karma:dev\' for continuous testing');
    grunt.log.writeln('\'grunt karma:unit\' to just run the test once');
    grunt.log.writeln('\'grunt test-server\' to display the test runner page');
  });
  // grunt.registerTask('default', ['connect']);
};
