import { browser, by, element } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export interface Contact {
    name?: string;
    email?: string;
    tel?: string;
}

describe('the contact list', () => {
    beforeAll(() => {
        browser.get('/');
    });

    it('with filter: should find existing contact "Craig Service"', () => {
        const tbody = element(by.tagName('tbody'));
        const trs = tbody.all(by.tagName('tr'));
        const craigService = trs.filter(elem => {
            return elem.all(by.tagName('td')).get(1).getText()
                .then(text => {
                    return text === 'Craig Service';
            });
        });
        expect(craigService.count()).toBeGreaterThan(0);
        expect(craigService.all(by.tagName('td')).get(2).getText())
            .toEqual('craig.services@example.com');
    });

    const expectedContactList: Contact[] = [
        {
            name: 'Adrian Directive',
            email: 'adrian.directive@example.com',
            tel: '+1 (703) 555-0123'
        },
        {
            name: 'Rusty Component',
            email: 'rusty.component@example.com',
            tel: '+1 (441) 555-0122'
        },
        {
            name: 'Jeff Pipe',
            email: 'jeff.pipe@example.com',
            tel: '+1 (714) 555-0111'
        },
        {
            name: 'Craig Service',
            email: 'craig.services@example.com',
            tel: '+1 (514) 555-0132'
        }
    ];

    it('with map: should create a map object', () => {
        const tbody = element(by.tagName('tbody'));
        const trs = tbody.all(by.tagName('tr'));
        const contactList = trs.map(elem => {
            const contact: Contact = {};
            const promises: any[] = [];
            const tds = elem.all(by.tagName('td'));
            promises.push(tds.get(1).getText().then(text => {
                contact.name = text;
            }));
            promises.push(tds.get(2).getText().then(text => {
                contact.email = text;
            }));
            promises.push(tds.get(3).getText().then(text => {
                contact.tel = text;
            }));

            return Promise.all(promises).then(() => {
                return contact;
            });
        });
        expect(contactList).toBeDefined();
        contactList.then((contacts: Contact[]) => {
            // Spot check the results
            expect(contacts.length).toEqual(4);
            expect(contacts[0]).toBeDefined();
            expect(contacts[1].email).toEqual('rusty.component@example.com');
            expect(contacts[2].tel).toEqual('+1 (714) 555-0111');
            expect(contacts[3].name).toEqual('Craig Service');
            // Check all the contacts match
            expect(contacts).toEqual(expectedContactList);
        });
    });

    it('with reduce: get a list of contact names', () => {
        const tbody = element(by.tagName('tbody'));
        const trs = tbody.all(by.tagName('tr'));
        const contacts = trs.reduce((acc, curr) => {
            const name = curr.all(by.tagName('td')).get(1);
            return name.getText().then(text => {
                return acc === '' ? text : `${acc}, ${text}`;
            });
        }, '');
        expect(contacts).toBe('Adrian Directive, Rusty Component, Jeff Pipe, Craig Service');
    });
});
