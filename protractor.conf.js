// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,

  directConnect: process.env.DIRECT_CONNECT,
  seleniumAddress: process.env.SELENIUM_ADDRESS || 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: (process.env.BROWSER_NAME || 'chrome'),
    // chromeOptions: {
    //   //args: (process.env.IS_CIRCLE ? ['--headless'] : [])
    //   args: ['--headleas', '--disable-gpu']
    // },
    // loggingPrefs: {
    //   performance: 'ALL',
    //   browser: 'ALL'
    // }
  },
  baseUrl: process.env.URL || 'http://localhost:4200/',
  specs: [
    // 'e2e/**/*.e2e-spec.ts',
    'e2e/add-contact.e2e-spec.ts'
  ],
  // Jasmine
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare: ()=> {
    if (process.env.BROWSER_NAME === 'chrome') {
      let jasmineReporters = require('jasmine-reporters');
      let junitReporter = new jasmineReporters.JUnitXmlReporter({
        savePath: './output/',
        consolidateAll: false
      });
      jasmine.getEnv().addReporter(junitReporter);
    } else {
      let specReporter = new SpecReporter({
        spec: { displayStacktrace: true }
      });
      jasmine.getEnv().addReporter(specReporter);
    }
  },
  useAllAngular2AppRoots: true
};
