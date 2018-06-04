import { browser, by, element, ExpectedConditions as EC } from 'protractor';
import * as fs from 'fs';

/**
 * Example plugin that takes a screenshot on test failure.
 */
export function postTest(passed: boolean, testInfo: any) {
    if (!passed) {
        const currentDate = new Date().toLocaleString().replace(/[-:]/g, '.').replace(/ /, '-');
        const fileName = `FAIL_${testInfo.name.replace(/ /g, '_')}_(${currentDate}).png`;
        return browser.takeScreenshot().then((data) => {
        fs.writeFileSync(`./screenshots/${fileName}`, data, 'base64');
        });
    }
}
