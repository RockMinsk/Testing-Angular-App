import * as fs from 'fs';
import * as looksSame from 'looks-same';
import * as os from 'os';
import * as path from 'path';

/**
 * Compare a screenshot to a reference, or "golden" image.
 * Returns a Promise that resolves to whether or not the
 * screenshot is a match. If the UPDATE_SCREENSHOTS environment
 * variable is set, the promise resolves to true and the
 * golden image is updated.
 *
 * @param data The screenshot image data.
 * @param golden The path to the golden image to compare to.
 */

 /**
 *  Write a screenshot to disk in a new temporary path.
 */

function writeScreenshot(data) {
    return new Promise<string>((resolve, reject) => {
        const folder = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
        const screenshotFile = path.join(folder, 'new.png');
        fs.writeFile(screenshotFile, data, 'base64', (err) => {
            if (err) {
                reject(err);
            }
            resolve(screenshotFile);
        });
    });
}

export function compareScreenshot(data, golden) {
    return new Promise((resolve, reject) => {
        return writeScreenshot(data).then((screenshotPath) => {
            if (process.env.UPDATE_SCREENSHOTS) {
                console.log('------------------Writing new screenshot-------------------');
                fs.writeFileSync(golden, fs.readFileSync(screenshotPath));
                resolve(true);
            } else {
                console.log('------------------Test-------------------');
                looksSame(
                    screenshotPath, golden, {strict: false, tolerance: 2.5}, (error, equal) => {
                        if (!equal) {
                            console.log('------------------Test2-------------------');
                            looksSame.createDiff(
                                {
                                    reference: golden,
                                    current: screenshotPath,
                                    diff: 'DIFFERENCE.png',
                                    highlightColor: '#ff00ff',  // color to highlight the differences
                                },
                                (error) => {
                                    resolve(equal);
                                });
                        } else {
                        resolve(equal);
                    }
                });
            }
        });
    });
}
