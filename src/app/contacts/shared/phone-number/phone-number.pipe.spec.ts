import { PhoneNumberPipe } from './phone-number.pipe';

describe('Pipe: PhoneNumber', () => {
    let phoneNumber: PhoneNumberPipe = null;

    beforeEach(() => {
        phoneNumber = new PhoneNumberPipe();
    });

    describe('default behavior', () => {
        it('should transform the string or number into the default phone format', () => {
            const testInputPhoneNumber = '7035550123';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
            const expectedResult = '(703) 555-0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });

        it('should not display anything if the length is not ten digits', () => {
            const testInputPhoneNumber = '703555012';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
            const expectResult = '';

            expect(transformedPhoneNumber).toBe(expectResult);
        });
    });

    describe('phone number format tests', () => {
        it('should format the phone number using the default format', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'default';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '(703) 555-0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });

        it('should format the phone number using the dots format', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'dots';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '703.555.0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });

        it('should format the phone number using the hyphens format', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'hyphens';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '703-555-0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });

        it('should format the phone number using the default format if unrecongized format is entered', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'gibberish';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '(703) 555-0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });
    });

    describe('country code parameter tests', () => {
        it('should add respective country code', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'default';
            const countryCode = 'us';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format,
                countryCode);
            const expectedResult = '+1 (703) 555-0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });

        it('should not add anything if the country code is unrecognized', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'default';
            const countryCode = 'by';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format,
                countryCode);
            const expectedResult = '(703) 555-0123';

            expect(transformedPhoneNumber).toBe(expectedResult);
        });
    });

    afterEach(() => { phoneNumber = null; });
});
