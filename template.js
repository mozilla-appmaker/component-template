/*
 * grunt-init-appmaker-component
 *
 */

'use strict';
var path = require('path');

// Basic template description.
exports.description = 'Create a Mozilla Appmaker component';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  var checkName = function(name) {
    console.log("VALIDATING", name);
  };

  var name = init.prompt('name');
  var defaultName = path.basename(process.cwd());
  if (defaultName.indexOf('component-') == 0) {
    defaultName = defaultName.slice('component-'.length, defaultName.length);
  }
  name.default = defaultName;
  name.validator = function(foo) {
    if (foo.indexOf('component-') != -1) {
      return 0;
    }
    return 1;
  }
  name.warning = "Component name should be without leading 'component-'";

  init.process({}, [
    // Prompt for these values.
    name,
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('licenses', 'MPL-2.0')
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      // "ceci-support": "0.1.0",
      // "appmaker": "",
      // "should": "~2.1.1",
      // "mocha": "~1.17.0",
      // "karma-script-launcher": "~0.1.0",
      // "karma-chrome-launcher": "~0.1.2",
      // "karma-firefox-launcher": "~0.1.3",
      // "karma-html2js-preprocessor": "~0.1.0",
      // "karma-jasmine": "~0.1.5",
      // "karma-coffee-preprocessor": "~0.1.2",
      // "requirejs": "~2.1.10",
      // "karma-requirejs": "~0.2.1",
      // "karma-phantomjs-launcher": "~0.1.1",
      // "karma": "~0.10.9",
      "grunt": "~0.4.2",
      // "grunt-karma": "~0.6.2",
      // "karma-mocha": "~0.1.0",
      // "chai": "~1.8.1",
      // "karma-ie-launcher": "*",
      // "karma-safari-launcher": "*",
      // "karma-crbot-reporter": "*",
      // "karma-browserstack-launcher": "0.0.4",
      // "karma-ios-launcher": "0.0.3",
      "open": "0.0.4",
      "grunt-contrib-connect": "~0.5.0",
      "grunt-open": "~0.2.2",
      "grunt-contrib-watch": "~0.5.3"
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
