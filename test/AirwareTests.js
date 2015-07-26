'use strict';

var test = require('selenium-webdriver/testing');
var assert = require('chai').assert;

var DriverBuilder = require('./../src/lib/DriverBuilder');
var AirwarePage = require('./../src/pageobjects/AirwarePage');
var SauceLabsBuilder = require('./../src/lib/SauceLabsBuilder');

/**
 * Login Test Suite
 */
test.describe('Airware tests', function() {
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
        var airware = new AirwarePage(driver);
        airware.open('http://www.airware.com');
        airware.isLoaded();
        airware.getTitle().then(function(result){
            assert.equal(result, 'Airware | Commercial Drone Software, Hardware and Cloud Services',
                'Title is correct');
        });
        airware.getLandingText().then(function(result){
            // Clean new line for different browsers
            result = result.replace(/\r?\n|\r/g, ' ');
            assert.include(result, 'Powering Drones for the Enterprise',
                'Heading is correct');
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