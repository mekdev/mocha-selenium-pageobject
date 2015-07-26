/**
 * Remote Browser capabilities file for executing against the grid, saucelabs, browserstack and etc..
 * For more information for saucelabs see : https://saucelabs.com/platforms/
 */
module.exports = {
    // Default configurations
    firefox: {
        browserName: 'firefox',
        platform: 'Windows 7'
    },
    chrome: {
        browserName: 'chrome',
        platform: 'Windows 7'
    },
    ie: {
        browserName: 'internet explorer',
        platform: 'Windows 7',
    },
    safari: {
        browserName: 'safari',
        platform: 'OS X 10.10',
    }
    // Specific configurations to be followed
};