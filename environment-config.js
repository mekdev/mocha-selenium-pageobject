var sauce_user = process.env.SAUCE_USER || 'Saucelabs user NOT set';
var sauce_key = process.env.SAUCE_KEY || 'Saucelabs key NOT set';

/**
 * Builds the execution environment configuration used in Driver Builder
 */
module.exports = {
    localhost : {
        hostname: 'localhost',
        port: '4444'
    },
    saucelabs : {
        username : sauce_user,
        accessKey : sauce_key,
        hostname: 'ondemand.saucelabs.com',
        port: '80'
    },
    // TODO still needs a bit more customization for this to fully work with browserstack
    browserstack : {

    }
};