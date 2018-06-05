import ContactClass from './contact';

describe('Class: Contact', () => {

    let contact: ContactClass = null;

    beforeEach(() => contact = new ContactClass());

    it('should have a valid constructor', () => expect(contact).not.toBeNull());

    it('should set name properly through constructor', () => {
        contact =  new ContactClass('Liz');
        expect(contact.name).toEqual('Liz');
    });

    it('should get and set id properly', () => {
        contact.id = 1;
        expect(contact.id).toEqual(1);
    });

    it('should get and set name properly', () => {
        contact.name = 'Liz';
        expect(contact.name).toEqual('Liz');
    });

    it('should get and set email properly', () => {
        contact.email = 'shytsikau.kiryl@gmail.com';
        expect(contact.email).toEqual('shytsikau.kiryl@gmail.com');
    });

    it('should get and set number properly', () => {
        contact.number = '1234567890';
        expect(contact.number).toEqual('1234567890');
    });

    it('should get and set country properly', () => {
        contact.country = 'Belarus';
        expect(contact.country).toEqual('Belarus');
    });

    it('should get and set favorite properly', () => {
        contact.favorite = true;
        expect(contact.favorite).toEqual(true);
    });

    afterEach(() => contact = null);
});
