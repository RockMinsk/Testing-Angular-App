import { browser, by, element ,ExpectedConditions as EC } from 'protractor';

describe('contact test', () => {
    beforeEach(() => {
        return browser.waitForAngularEnabled(true)
            .then(() => browser.get('/contact/4'));
    });

    xit('should open the dialog with waitForAngular', () => {
        const feedButton = element(by.css('button.feed-button'));
        const closeButton = element(by.css('button[mat-dialog-close]'));
        const dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));

        feedButton.click();
        expect(dialogTitle.getText()).toContain('Latest posts from Craig Service');
        // tslint:disable-next-line:no-debugger
        debugger;

        closeButton.click();
        browser.wait(EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to close');
        expect(dialogTitle.isPresent()).toBeFalsy();
    });

    xit('should open the dialog with waitForAngular', (done) => {
        const feedButton = element(by.css('button.feed-button'));
        const closeButton = element(by.css('button[mat-dialog-close]'));
        const dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));

        return feedButton.click()
        .then(() => dialogTitle.getText())
        .then((dialogText) => {
            expect(dialogText).toContain('Latest posts form Craig Service');
            return closeButton.click();
        })
        .then(() => browser.wait(EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to close'))
        .then(() => dialogTitle.isPresent())
        .then((dialogTitleIsPresent) => expect(dialogTitleIsPresent).toBeFalsy());
        done();
    });

    it('should open the dialog with waitForAngular', async() => {
        const feedButton = element(by.css('button.feed-button'));
        const closeButton = element(by.css('button[mat-dialog-close]'));
        const dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));

        await feedButton.click();
        const dialogText = await dialogTitle.getText();
        expect(dialogText).toContain('Latest posts from Craig Service');
        // tslint:disable-next-line:no-debugger
        debugger;

        await closeButton.click();
        // tslint:disable-next-line:no-debugger
        debugger;
        await browser.wait(EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to close');
        const dialogTitleIsPresent = await dialogTitle.isPresent();
        expect(dialogTitleIsPresent).toBeFalsy();
    });
});
