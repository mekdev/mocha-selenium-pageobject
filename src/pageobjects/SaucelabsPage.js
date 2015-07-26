'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;

/**
 * Constructor for the Saucelabs Page
 * Hooks up the Webdriver holder in the base page allowing to call this.driver in page objects
 * @param webdriver
 * @constructor
 */
function SaucelabsPage (webdriver) {
    BasePage.call(this, webdriver);
}

// Hooking up prototype inheritance to BasePage
SaucelabsPage.prototype = Object.create(BasePage.prototype);
// Declaring constructor
SaucelabsPage.prototype.constructor = SaucelabsPage;

/**
 * Locators for the elements in this page
 * @type {string}
 */
var LANDING_TEXT = 'div.content h3';
var HOME_LINK = 'header.wrap h1 > a';


/**
 * Page loaded definition
 * Checks if the Jobs List page is loaded
 * @returns {SaucelabsPage}
 */
SaucelabsPage.prototype.isLoaded = function() {
    this.driver.wait(Until.elementIsVisible(By.css(LANDING_TEXT)));
    this.driver.wait(Until.elementIsVisible(By.css(HOME_LINK)));
    // Does not work on all cases
    //this.waitForDisplayed(By.css(LANDING_TEXT));
    //this.waitForDisplayed(By.css(HOME_LINK));
    return this;
};

/**
 * Gets the title of the page
 * @returns {!webdriver.promise.Promise.<string>}
 */
SaucelabsPage.prototype.getTitle = function() {
    return this.driver.getTitle();
};

/**
 * Gets the SauceLabs landing text
 * @returns {!webdriver.promise.Promise.<string>}
 */
SaucelabsPage.prototype.getLandingText = function() {
    var header = this.driver.findElement(By.css(LANDING_TEXT));
    return header.getText();
};

/**
 * Gets the displayed status of the Home link
 * @returns {!promise.Promise.<T>}
 */
SaucelabsPage.prototype.isHomeLinkDisplayed = function() {
    return this.waitForDisplayed(HOME_LINK);
};

module.exports = SaucelabsPage;