import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('adding a new contact', () => {
    describe(' with an invalid email', () => {
        beforeEach(() => {
            browser.get('/add');
            element(by.id('contact-name')).sendKeys('Bad Email');
        });

        it('should not create a new contact with baduser.com', () => {
            const email = element(by.id('contact-email'));
            email.sendKeys('baduser.com');
            element(by.buttonText('Create')).click();

            const invalidEmailModal = element(by.tagName('app-invalid-email-modal'));
            expect(invalidEmailModal.isPresent()).toBe(true);

            const modalButton = invalidEmailModal.element(by.tagName('button'));
            modalButton.click();

            browser.wait(EC.not(EC.presenceOf(invalidEmailModal)), 5000);
            expect(invalidEmailModal.isPresent()).toBe(false);
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
        });

        // it('should not create a new contact with @baduser.com', () => {
        //     const email = element(by.id('contact-email'));
        //     email.sendKeys('@baduser.com');
        //     element(by.buttonText('Create')).click();

        //     const invalidEmailModal = element(by.tagName('app-invalid-email-modal'));
        //     expect(invalidEmailModal.isPresent()).toBe(true);

        //     const modalButton = invalidEmailModal.element(by.tagName('button'));
        //     modalButton.click();

        //     browser.wait(EC.not(EC.presenceOf(invalidEmailModal)), 5000);
        //     expect(invalidEmailModal.isPresent()).toBe(false);
        //     expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
        // });
    });

    describe('with an invalid phone number', () => {
        beforeEach(() => {
            browser.get('/add');
            element(by.id('contact-name')).sendKeys('Bad Tel');
        });

        it('should not create a new contact with a formatted telephone number', () => {
            const tel = element(by.css('input[type="tel"]'));
            tel.sendKeys('123-456-7890');
            element(by.buttonText('Create')).click();

            const invalidTelModal = element(by.tagName('app-invalid-phone-number-modal'));
            expect(invalidTelModal.isDisplayed()).toBe(true);

            const modalButton = invalidTelModal.element(by.tagName('button'));
            modalButton.click();

            browser.wait(EC.not(EC.presenceOf(invalidTelModal)), 5000);
            expect(invalidTelModal.isPresent()).toBe(false);
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
        });

        it('should not create a new contact with too many numbers in the telephone number', () => {
            const tel = element(by.css('input[type="tel"]'));
            tel.sendKeys('12345678901');
            element(by.buttonText('Create')).click();

            const invalidTelModal = element(by.tagName('app-invalid-phone-number-modal'));
            browser.wait(EC.visibilityOf(invalidTelModal), 5000);
            expect(invalidTelModal.isDisplayed()).toBe(true);

            const modalButton = invalidTelModal.element(by.tagName('button'));
            modalButton.click();

            browser.wait(EC.not(EC.presenceOf(invalidTelModal)), 5000);
            expect(invalidTelModal.isPresent()).toBe(false);
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
        });
    });
});
