/*global jasmine */
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:4200',
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  specs: [
    './e2e/add-contact.e2e-spec.ts'
  ],

  useBlockingProxy: false,
  // Delaying for 3 sec before interacting with element and hightlighting it
  highlightDelay: 3000,
  // Log file location
  webDriverLogDir: 'logs',

  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
