exports.config = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--no-sandbox']
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200',
    framework: 'jasmine',
    specs: [
        './e2e/page-object.e2e-spec.ts'
    ],
    onPrepare: () => {
        require('ts-node').register({
            project: 'e2e'
        });
    },
    useAllAngular2AppRoots: true
};