import { browser, by, element } from 'protractor';

describe('adding a new contact with name. email and phone number', () => {
    beforeAll(() => {
        browser.get('/');
        element(by.id('add-contact')).click();
        element(by.id('contact-name')).sendKeys('Kiryl');
    });

    it('should type in an email address', () => {
        const email = element(by.id('contact-email'));
        email.sendKeys('Kiryl@example.com');
        expect(email.getAttribute('value')).toEqual('Kiryl@example.com');
    });

    it('should type in a phone number', () => {
        const tel = element(by.css('input[type="tel"]'));
        tel.sendKeys('1234567890');
        expect(tel.getAttribute('value')).toEqual('1234567890');
    });

    it('should click the create button', () => {
        element(by.css('.create-button')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
    });
});
