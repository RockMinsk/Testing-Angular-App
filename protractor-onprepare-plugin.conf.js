exports.config = {
    directConnect: true,
    capabilities: {
        browserName: 'chrome' 
    },
    baseUrl: 'http://localhost:4200',
    specs: ['e2e/contact-list2.e2e-spec.ts'],
    plugins: [{
        inline: {
            onPrepare: () => {
                let jasmineReporters = require('jasmine-reporters');
                let junitReporter = new jasmineReporters.JUnitXmlReporter({
                    savePath: 'output/',
                    consolidateAll: false
                });
                jasmine.getEnv().addReporter(junitReporter);
                require('ts-node').register({
                    project: 'e2e'
                });
            },
        }
    }],
    useAllAngular2AppRoots: true
};