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
exports.after = 'You should now install project dependencies with \n\n\t_npm ' +
  'install_. \n\nAfter that, you can serve the component using \n\n\t_grunt serve_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
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
    init.prompt('repository'),
    init.prompt('licenses', 'MPL-2.0')
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      "grunt": "~0.4.2",
      "grunt-contrib-jshint": "~0.6.3",
      "grunt-contrib-csslint": "~0.1.2",
      "grunt-lint-inline": "~0.3.2",
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
