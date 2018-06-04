exports.config = {
    multiCapabilities: [ 
        { browserName: 'chrome' },
        { browserName: 'firefox' }, 
        // { browserName: 'interner explorer' }
    ],
    directConnect: false,
    seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.12.0.jar',
    chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.38.exe',
    geckoDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.20.1.exe',
    // MicrosoftWebDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/MicrosoftWebDriver.exe',
    // IEDriverServer: './node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer.exe',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:4200',
    framework: 'jasmine',
    specs: [
        './e2e/contact-list2.e2e-spec.ts'
    ],
    onPrepare: () => {
        require('ts-node').register({
            project: 'e2e'
        });
    },
    useAllAngular2AppRoots: true
};