exports.config = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', /*'--remote-debugging-port=9222'*/]
        },
        loggingPrefs: {
            performance: 'ALL',
            browser: 'ALL'
        }
    },
    directConnect: true,
    
    baseUrl: 'http://localhost:4200',
    framework: 'jasmine',
    specs: [
        './e2e/test-headless-mode.e2e-spec.ts'
    ],
    onPrepare: () => {
        require('ts-node').register({
            project: 'e2e'
        });
    },
    useAllAngular2AppRoots: true
};