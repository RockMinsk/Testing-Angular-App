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
        './e2e/add-*contact.e2e-spec.ts',
        './e2e/contact-list.e2e-spec.ts'
    ],
    onPrepare: () => {
        require('ts-node').register({
            project:'e2e'
        });
    },
    useAllAngular2AppRoots: true
};
