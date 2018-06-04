import { Injectable } from '@angular/core';
import { BrowserStorageAsync } from './browser-storage.service';
import { IContactPreference } from './preferences.service';

@Injectable()
export class PreferencesAsyncService {

    constructor(private browserStorage: BrowserStorageAsync) { }

    getPropertyAsync(key: string): Promise<IContactPreference> {
        if (!key.length) {
            return Promise.reject('getPropertyAsync requires a property name');
        } else {
            return this.browserStorage.getItem(key);
        }
    }
}
