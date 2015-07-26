'use strict';

var test = require('selenium-webdriver/testing');
var assert = require('chai').assert;

var DriverBuilder = require('./../src/lib/DriverBuilder');
var SaucelabsPage = require('./../src/pageobjects/SaucelabsPage');
var SauceLabsBuilder = require('./../src/lib/SauceLabsBuilder');

/**
 * Login Test Suite
 */
test.describe('Saucelabs tests', function() {
    this.timeout(35000);

    var driver;
    var sessionId;

    test.beforeEach(function() {
        driver = DriverBuilder.build();
        driver.getSession().then(function (sessionid){
            sessionId = sessionid.id_;
        });
    });

    test.it('should have all landing page elements', function() {
        var saucelabs = new SaucelabsPage(driver);
        saucelabs.open('http://www.saucelabs.com');
        saucelabs.isLoaded();
        saucelabs.getTitle().then(function(result){
            assert.equal(result, 'Sauce Labs: Selenium Testing, Mobile Testing, JS Unit Testing and More',
                'Title is correct');
        });
        saucelabs.getLandingText().then(function(result){
            // Clean new line for different browsers
            result = result.replace(/\r?\n|\r/g, ' ');
            assert.equal(result, 'Unlock the value of Continuous Integration with cloud-based testing for mobile and web apps.',
                'Heading is correct');
        });
        saucelabs.isHomeLinkDisplayed().then(function(isDisplayed){
            assert.equal(isDisplayed, true, 'Home link is displayed');
        });
    });

    /**
     * Clean up function after each test ends
     */
    test.afterEach(function(done) {
        var currentTest = this.currentTest;
        driver.quit().then (function (){
            if (DriverBuilder.saucelabs) {
                console.log('LOG : Updating Sauce');
                var passed = (currentTest.state === 'passed') ? true : false;
                var saucelabs = SauceLabsBuilder.build();
                saucelabs.updateJob(sessionId, { name: currentTest.title, passed: passed }, done);
                console.log('LOG : Finished with Sauce');
            } else {
                done();
            }
        });
    });
});