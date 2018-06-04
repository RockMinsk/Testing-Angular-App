import { browser, by, element } from 'protractor';

describe('listing example', () => {
    it('load /', () => {
        console.log('------------  get / ------------');
        browser.get('/');
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
    });

    it('click "+" button -> /add', () => {
        console.log('\n------------  click "+" button -> /add  ------------');
        element(by.id('add-contact')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
    });

    afterEach(() => {
        browser.manage().logs().get('performance').then((browserLogs) => {
            expect(browserLogs).not.toBeNull();
            browserLogs.forEach((browserLog) => {
                const message = JSON.parse(browserLog.message).message;
                if (message.method === 'Network.responseReceived') {
                    const status = message.params.response.status;
                    const url = message.params.response.url;
                    console.log(`status = ${status} - ${url}`);
                }
            });
        });
    });
});
