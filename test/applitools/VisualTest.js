'use strict';

var test = require('selenium-webdriver/testing');
var Eyes = require('eyes.selenium').Eyes;

var DriverBuilder = require('./../../src/lib/DriverBuilder');
var AirwarePage = require('./../src/pageobjects/AirwarePage');
var SauceLabsBuilder = require('./../../src/lib/SauceLabsBuilder');
var applitoolsKey = '<Applitools key here>';

test.describe('Mocha + selenium-webdriver + Applitools Visual Validation', function() {
    this.timeout(35000);

    var driver;
    var sessionId;

    test.beforeEach(function() {
        driver = DriverBuilder.build();
        driver.getSession().then(function (sessionid){
            sessionId = sessionid.id_;
        });
    });

    test.it("test with login page and applitools", function() {
        var eyes = new Eyes();
        eyes.setApiKey(applitoolsKey);
        eyes.setMatchLevel('Content');

        eyes.open(driver, "Airware", "Simple Airware main page")
            .then(function(driver) {
                var airware = new AirwarePage(driver);
                airware.open('http://www.airware.com');
                airware.isLoaded();
                eyes.checkWindow("Main Page");
                eyes.close();
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