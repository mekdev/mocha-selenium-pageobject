'use strict';

var Promise = require('selenium-webdriver').promise;
var Until = require('selenium-webdriver').until;
// Default wait for UI object is 10 seconds (for now)
var WAIT_TIMEOUT = 10000;
// Webdriver holder for the base page allowing to call this.driver in all page objects
var driver;
// Internal debug
var debug = false;
/**
 * Base constructor for a pageobject
 * Takes in a WebDriver object
 * Sets the Webdriver holder in the base page surfacing this to child page objects
 * @param webdriver
 * @constructor
 */
function BasePage(webdriver) {
    this.driver = webdriver;
}

/**
 * Opens the specified url
 * @param url
 * @returns {BasePage}
 */
BasePage.prototype.open = function(url) {
    this.driver.get(url);
    return this;
};

/**
 * Our own implementation of waitFor methods
 * General guidelines:
 * - Use explicit wait instead of built-in implicit waits to allow better debugging and development
 * - Always poll for Element stability first before getting the state of the elements (enabled / visible)
 * - Always allow exception propagation to the test runner, try your best to avoid running into the below
 *      mocha Error: the error {} was thrown, throw an Error :)
 *
 * Known issues on Mocha swallowing exceptions
 * https://github.com/mochajs/mocha/issues/1677
 * https://github.com/mochajs/mocha/issues/1801
 *
 * Additional resources
 * https://github.com/mochajs/mocha/issues/1338
 * http://stackoverflow.com/questions/14966821/testing-for-errors-thrown-in-mocha
 */

/**
 * Waits for the element + check if the element is displayed which takes a timeout
 * Returns promise of isDisplayed() which can be resolved to a boolean value
 * @param locator
 * @param timeout
 * @returns {!promise.Promise.<T>}
 */
BasePage.prototype.waitForDisplayed = function(locator, timeout) {
    timeout = timeout || WAIT_TIMEOUT;
    var defer = Promise.defer();
    var driver = this.driver;
    this.driver.wait(function() {
        if (debug){console.log('is present ' + locator);}
        return driver.isElementPresent(locator);
    }, timeout)
    .then(function() {
        return driver.wait(function() {
            if (debug){console.log('is displayed ' + locator);}
            // First attempt to fix random stale element in this util method
            // Implicit wait for located again after isPresent()
            driver.wait(Until.elementLocated(locator));
            return driver
                .findElement(locator)
                .isDisplayed();
        }, timeout);
    })
    .then(function(displayed){
        if (debug){console.log('isDisplayed : ' + locator + displayed);}
        defer.fulfill(displayed);
    });
    //.then(defer.fulfill);
    return defer.promise;
};


module.exports = BasePage;