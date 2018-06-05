import { TestBed, async, fakeAsync, flushMicrotasks, inject } from '@angular/core/testing';

import { BrowserStorageAsync } from './browser-storage.service';
import { PreferencesAsyncService } from './preferences-async.service';
import { CDK_DESCRIBEDBY_ID_PREFIX } from '@angular/cdk/a11y';

class BrowserStorageAsyncMock {
    getItem = (property: string) => Promise.resolve({ key: 'testProp', value: 'testValue' });
    setItem = ({ key: key, value: value }) => Promise.resolve(true);
}
describe('Service: PreferencesAsync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PreferencesAsyncService, {
                provide: BrowserStorageAsync, useClass: BrowserStorageAsyncMock
            }]
        });
    });

    it('should get a value', fakeAsync(inject([PreferencesAsyncService, BrowserStorageAsync],
        (service: PreferencesAsyncService, browserStorage: BrowserStorageAsyncMock) => {
            spyOn(browserStorage, 'getItem').and.callThrough();

            let results, error;

            service.getPropertyAsync('testProp')
                .then(val => results = val)
                .catch(err => error = err);

                flushMicrotasks();

                expect(results.key).toEqual('testProp');
                expect(results.value).toEqual('testValue');
                expect(error).toBeUndefined();
                expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
        }))
    );

    it('should throw an error if the key is missing', fakeAsync(inject([PreferencesAsyncService],
        (service: PreferencesAsyncService) => {

            let result, error;

            service.getPropertyAsync('')
                .then(value => result = value)
                .catch((err) => error = err);

            flushMicrotasks();
            expect(result).toBeUndefined();
            expect(error).toEqual('getPropertyAsync requires a property name');
        }))
    );
});
