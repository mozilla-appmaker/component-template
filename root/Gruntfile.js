// use as:  grunt karma:dev for continuous testing or
//          grunt karma:unit to just run the test once
//          grunt test-server to display the test runner page

module.exports = function(grunt) {
  var path = require('path');
  // grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // karma: {
    //   unit: {
    //     configFile: 'node_modules/ceci-support/karma.conf.js',
    //     singleRun: true,
    //     browsers: ['FirefoxNightly']
    //   },
    //   ci: {
    //     configFile: 'node_modules/ceci-support/karma.conf.js',
    //     singleRun: true,
    //     browsers: ['Firefox']
    //   },
    //   dev: {
    //     configFile: 'node_modules/ceci-support/karma.conf.js',
    //     singleRun: false,
    //     browsers: ['FirefoxNightly']
    //   },
    // },
    connect: {
      server: {
        options: {
          port: 9001,
          base: __dirname,
          keepalive: true,
          open: 9001,
          middleware: function(connect, options) {
            var middlewares = [];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(function(req, res, next) {
              // we need to setup CORS headers so that the designer can load the component
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
              next();
            });
            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });
            return middlewares;
          },
        }
      }
    },
  });

  // grunt.registerTask('test-server', 'start web server for tests in browser', function() {
  //   grunt.event.once('connect.server.listening', function(host, port) {
  //     var specRunnerUrl = 'http://' + host + ':' + 9001+'/example.html';
  //     grunt.log.writeln('test runner available at: ' + specRunnerUrl);
  //     require('open')(specRunnerUrl);
  //   });

  //   grunt.task.run('connect:server');
  // });
  grunt.registerTask('serve', 'start web server to use in designer', function() {
    grunt.event.once('connect.server.listening', function(host, port) {
      var specRunnerUrl = 'http://' + host + ':' + 9001;
      grunt.log.writeln('Tell the designer to load: ' + specRunnerUrl + "/component.html");
    });

    grunt.task.run('connect:server');
  });
  grunt.registerTask('default', 'help message', function() {
    // grunt.log.writeln('\n\nRun:\n\'grunt karma:dev\' for continuous testing');
    // grunt.log.writeln('\'grunt karma:unit\' to just run the test once');
    // grunt.log.writeln('\'grunt test-server\' to display the test runner page');
    grunt.log.writeln('\'grunt serve\' to display the test runner page');
  });
  // grunt.registerTask('default', ['connect']);
};
