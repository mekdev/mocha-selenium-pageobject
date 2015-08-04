'use strict';

var webdriver = require('selenium-webdriver');
var environment_config = require('./../../environment-config');
var capabilities_config = require('./../../capabilities-config');
var env_key = process.env.ENV || 'localhost';
var browser_key = process.env.BROWSER || 'chrome';
var saucelabs =  (env_key === 'saucelabs') ? true : false;
var saucebuild =  process.env.SAUCE_TC_BUILDNUMBER;

/**
 * Constructs a webdriver instance using the options provided
 * @returns {!webdriver.WebDriver}
 */
var build = function() {
    var env = environment_config[env_key.toLowerCase()];
    var builder = new webdriver.Builder().usingServer('http://'+ env.hostname + ':' + env.port + '/wd/hub');
    if ('localhost' === env_key.toLowerCase()) {
        builder.withCapabilities(getLocalBrowserCapabilities(browser_key));
    } else {
        var remote_config = capabilities_config[browser_key.toLowerCase()];
        builder.withCapabilities(buildRemoteBrowserCapabilities(remote_config, env));
    }
    return builder.build();
};

/**
 * Builds the remote browser capabilities for Saucelabs
 * @param capability
 * @param env
 * @returns {{browserName: *, platform: *, username: (*|null|string|string|string|string), accessKey: (*|string|string|string)}}
 */
function buildRemoteBrowserCapabilities (capability, env) {
    return {
        browserName: capability.browserName,
        platform: capability.platform,
        username: env.username,
        accessKey: env.accessKey,
        name : 'Mekdev mocha-selenium-pageobject test',
        build: saucebuild,
        seleniumVersion : '2.45.0'
    };
}

/**
 * Gets the local browser capabilities
 * @param browser
 * @returns {*}
 */
function getLocalBrowserCapabilities (browser) {
    switch(browser.toLowerCase()) {
        case 'chrome':
            return webdriver.Capabilities.chrome();
        case 'safari':
            return webdriver.Capabilities.safari();
        case 'firefox':
            return webdriver.Capabilities.firefox();
        case 'ie':
            return webdriver.Capabilities.ie();
        default:
            return webdriver.Capabilities.chrome();
    }
}

module.exports.build = build;
module.exports.saucelabs = saucelabs;
