'use strict';

var SauceLabs = require('saucelabs');
var environment_config = require('./../../environment-config');

/**
  * Builds the saucelabs configuration
  * @returns {*|exports|module.exports}
 */
var build = function() {
    return new SauceLabs({
        username: environment_config.saucelabs.username,
        password: environment_config.saucelabs.accessKey
    });
};

module.exports.build = build;
