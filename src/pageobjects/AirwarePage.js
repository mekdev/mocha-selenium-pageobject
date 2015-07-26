'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;

/**
 * Constructor for Airware Page
 * Hooks up the Webdriver holder in the base page allowing to call this.driver in page objects
 * @param webdriver
 * @constructor
 */
function AirwarePage (webdriver) {
    BasePage.call(this, webdriver);
}

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */
AirwarePage.prototype = Object.create(BasePage.prototype);
AirwarePage.prototype.constructor = AirwarePage;

/**
 * Locators for the elements in this page
 * @type {string}
 */
var LANDING_TEXT = 'div.c-center h1';
var HOME_LINK = 'header.m-menu a[href="/home-a"]';
var FIRST_MENU_LINK = 'header.m-menu ul > li:nth-of-type(1)';


/**
 * Page loaded definition
 * Checks if the Jobs List page is loaded
 * @returns {AirwarePage}
 */
AirwarePage.prototype.isLoaded = function() {
    this.waitForDisplayed(By.css(LANDING_TEXT));
    this.waitForDisplayed(By.css(HOME_LINK));
    return this;
};

/**
 * Gets the title of the page
 * @returns {!webdriver.promise.Promise.<string>}
 */
AirwarePage.prototype.getTitle = function() {
    return this.driver.getTitle();
};

/**
 * Gets the Airware landing text
 * @returns {!webdriver.promise.Promise.<string>}
 */
AirwarePage.prototype.getLandingText = function() {
    var header = this.driver.findElement(By.css(LANDING_TEXT));
    return header.getText();
};

module.exports = AirwarePage;