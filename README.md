# Mocha-Selenium-PageObjects

Since there is no good examples of using a full receipe of

- [Mocha][mocha]
- [WebdriverJS][webdriverjs] : This is the official selenium-webdriver Javascript port in [Npm][npm]
- [selenium-standalone][selenium-standalone]
- [chrome-driver][chrome-driver] : This is auto managed by the Selenium Standalone server instance

# Setting up

## Pre-requisites
Make sure you already have [Homebrew][homebrew] and [Caskroom][caskroom] setup.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install caskroom/cask/brew-cask
```

We require Node so [Node][node] and [Npm][npm] will also be needed.

```
brew install node
brew install npm
```
We also require Java, so please make sure that the java runtime library is in your path.

## Installing

Run install in the root directory, this will install dependencies in `package.json`

```
npm install
```

# Running tests
The directions below assumes that `$FRAMEWORK_HOME` is the root directory of the framework :

```
~/git/mekdev/mocha-selenium-pageobjects
```

## Start the Selenium Standalone Server

Starting up the local selenium server for driving your local tests

```
$FRAMEWORK_HOME [master]$ npm run install_selenium
```
And then start the server

```
$FRAMEWORK_HOME [master]$ npm run start_selenium
```

To stop the server just do `CMD + C` in the current terminal or use this REST call in the browser to the local selenium server

```
http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer
```

## Supported Enviroment Variables

The following environment variables are supported by the framework


- **BROWSER** : Specifies the browser. 
  
  Supported values are `chrome | firefox | safari | ie` omiting this will default to `chrome`
  
  Usage : `BROWSER=chrome` or `BROWSER=firefox` or `BROWSER=safari` or `BROWSER=ie`
  
  The configuration capabilites file with all avalable configurations are in `$FRAMEWORK_HOME/capabilities.js` 

- **ENV** : Specifies the execution environment. 
  
  Supported values are `localhost | saucelabs | browserstack (coming soon)` omiting this will default to `localhost`
  
  Usage : `ENV=localhost` or `ENV=saucelabs`


## Run tests

For example running from `$FRAMEWORK_HOME` using running the test file `AirwareTest.js` under `./test`

```
$FRAMEWORK_HOME [master]$ npm test test/AirwareTest.js
```

Running `SauceLabsTest.js` the same directory on Saucelabs cloud (default localhost)

```
$FRAMEWORK_HOME [master]$ ENV=saucelabs npm test test/SauceLabsTest.js
```

Running `SauceLabsTest.js`  using browser Firefox (default chrome)

```
$FRAMEWORK_HOME [develop]$ BROWSER=safari npm test test/SauceLabsTest.js
```



[homebrew]: http://brew.sh
[caskroom]: http://caskroom.io/
[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[mocha]: http://mochajs.org/
[webdriverjs]: https://code.google.com/p/selenium/wiki/WebDriverJs
[selenium-standalone]: http://www.seleniumhq.org/download/
[chrome-driver]:https://sites.google.com/a/chromium.org/chromedriver/