import {ContactListPageObject} from './po/contact-list.po';
import {browser, by, element, ExpectedConditions as EC} from 'protractor';
import {WebElement} from 'selenium-webdriver';

xdescribe('the contact list', () => {
    // Before all tests, lets create a new page object.
    beforeAll(() => {
        // browser.get('/');s
    });

    it('should be able to log in', () => {
        browser.waitForAngularEnabled(false);
        browser.get('/assets/login.html');
        element(by.css('input.user')).sendKeys('username');
        element(by.css('input.password')).sendKeys('password');
        element(by.id('login')).click();

        browser.waitForAngularEnabled(true);
        const list = element(by.css('app-contact-list tbody'));
        expect(list.getText()).toContain('Jeff Pipe');
    });

    it('it should be able to login - waits for list to load using Expected Conditions', () => {
        browser.waitForAngularEnabled(false);
        browser.get('/assets/login.html');
        element(by.css('input.user')).sendKeys('username');
        element(by.css('input.password')).sendKeys('password');
        element(by.id('login')).click();

        const list = element(by.css('app-contact-list'));
        const listReady = EC.not(EC.textToBePresentInElement(list, 'Loading contacts'));
        browser.wait(listReady, 5000, 'Wait for Contacts list to load');
        expect(list.getText()).toContain('Jeff Pipe');
    });
});

describe('feed dialoge', () => {
    // tslint:disable-next-line:no-shadowed-variable
    let EC;

    beforeEach(() => {
        browser.get('/contact/4');
        EC = browser.ExpectedConditions;
    });

    afterEach(() => {
        browser.waitForAngularEnabled(true);
    });

    xit('should open the dialog with waitForAngular', () => {
        browser.waitForAngularEnabled(true);
        const feedButton = element(by.css('button.feed-button'));
        feedButton.click();

        const dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));
        expect(dialogTitle.getText()).toContain('Latest posts from Craig Service');

        const closeButton = element(by.css('button[mat-dialog-close]'));
        closeButton.click();
        browser.wait(EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to close');

        expect(dialogTitle.isPresent()).toBeFalsy();
    });

    xit('should open the dialog with expected conditions', () => {
        browser.waitForAngularEnabled(false);

        const feedButton = element(by.css('button.feed-button'));
        browser.wait(EC.elementToBeClickable(feedButton), 3000, 'waiting for feed button to be clickable');
        feedButton.click();

        const dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));
        browser.wait(EC.visibilityOf(dialogTitle), 1000, 'waiting for the dialog title to appear');
        expect(dialogTitle.getText()).toContain('Latest posts from Craig Service');

        const closeButton = element(by.css('button[mat-dialog-close]'));
        closeButton.click();
        browser.wait(EC.stalenessOf(dialogTitle), 3000, 'eait for dialog to close');
        expect(dialogTitle.isPresent()).toBeFalsy();
    });

    xit('should enable the follow button with more than two posts', () => {
        const feedButton = element(by.css('button.feed-button'));
        feedButton.click();

        const followButton = element(by.css('button.follow'));
        expect(followButton.isEnabled()).toBeFalsy();
        const moreThanOnePost = () => {
            return element.all(by.css('app-contact-feed mat-list-item')).count()
                .then((count) => {
                    return count >= 2;
                });

            };
        browser.wait(moreThanOnePost, 20000, 'Waiting for two posts');

        expect(followButton.isEnabled()).toBeTruthy();
    });

    it('should enable the follow button with more than two posts using executeScript', () => {
        const feedButton = element(by.css('button.feed-button'));
        feedButton.click();

        const followButton = element(by.css('button.follow'));
        expect(followButton.isEnabled()).toBeFalsy();

        function findAllPosts() {
            return document.querySelectorAll('app-contact-feed mat-list-item');
        }
        browser.wait(() => {
            return browser.driver.executeScript(findAllPosts)
                .then((posts: WebElement[]) => {
                    return posts.length >= 2;
                });
        }, 20000, 'Waiting for two posts');

        expect(followButton.isEnabled()).toBeTruthy();
    });
});
