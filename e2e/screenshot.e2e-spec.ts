import * as fs from 'fs';
import * as looksSame from 'looks-same';
import * as os from 'os';
import * as path from 'path';
import {browser, by, element, ExpectedConditions as EC} from 'protractor';

import {WebElement} from '../node_modules/@types/selenium-webdriver/index';

import {compareScreenshot} from './screenshot_helper';

describe('the contact list', () => {
    beforeAll(() => {
        browser.get('/');
        browser.driver.manage().window().setSize(1024, 900);
        console.log(this.fullName);
    });

    const spec = xit('should be able to login', (done) => {
        const list = element(by.css('app-contact-list2'));
        list.click();
        browser.waitForAngular();

        browser.takeScreenshot().then((data) => {
            const currentDate = new Date().toLocaleString().replace(/[-:]/g, '.').replace(/ /, '-');
            const specName = spec.description.replace(/ /g, '_');

            fs.writeFileSync(`./screenshots/${specName}_(${currentDate}).png`, data, 'base64');
            done();
        });
    });


    it('should be able to login - 2', (done) => {
        const GOLDEN_IMG = path.join(__dirname, 'contact_list_golden.png');
        const list = element(by.css('app-contact-list tbody'));
        browser.waitForAngular();
        // Verify that the list is loaded.
        expect(list.getText()).toContain('Jeff Pipe');
        browser.takeScreenshot()
            .then((data) => {
                return compareScreenshot(data, GOLDEN_IMG);
            })
            .then((result) => {
                expect(result).toBeTruthy();
                done();
            });
    });

    // it('should look right', (done) => {
    //     const list = element(by.css('app-contact-list'));
    //     // Need to manually wait for Angular, since takeScreenshot() won't.
    //     browser.waitForAngular();

    //     // Verify that the list is loaded.
    //     expect(list.getText()).toContain('Jeff Pipe');
    //     browser.takeScreenshot()
    //         .then((data) => {
    //           return compareScreenshot(data, GOLDEN_IMG);
    //         })
    //         .then((result) => {
    //           expect(result).toBeTruthy();
    //           done();
    //         });
    // });
});
