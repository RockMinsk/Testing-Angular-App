import { browser, by, element } from 'protractor';

describe ('adding a new contact with only a name', () => {
    beforeAll(() => {
        browser.get('/');
    });

    xit('should find the add contact button', () => {
        element(by.id('add-contact')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
    });

    xit('should write a name', () => {
        const contactName = element(by.id('contact-name'));
        contactName.sendKeys('Ada');
        expect(contactName.getAttribute('value')).toEqual('Ada');
    });

    xit('should click the create button', () => {
        element(by.css('.create-button')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
    });

    it('should be able to add a contact', () => {
        element(by.id('add-contact')).click();

        element(by.id('contact-name')).sendKeys('Ada Contact');
        element(by.css('.create-button')).click();

        expect(element(by.css('app-contact-list')).getText()).toContain('Ada Contact');
    });
});
