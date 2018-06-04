import { Component } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ShowContactsDirective } from './show-contacts.directive';
import { getElement } from '../../testing';

@Component({
    template: `
        <div *appShowContacts="true">
            <p>This is shown</p>
        </div>
        <div *appShowContacts="false">
            <p>This is hidden</p>
        </div>
        `
})
class TestComponent { }

describe('Directive: ShowContacts', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ShowContactsDirective, TestComponent]
        }).createComponent(TestComponent);
        fixture.detectChanges();
    });

    // it('should be displayed when the input evaluates to true', () => {
    //     const element = getElement(fixture);
    //     expect(element.innerHTML).toContain('This is shown');
    // });

    // it('should be hidden when the input evaluetes to false', () => {
    //     const element = getElement(fixture);
    //     expect(element.innerHTML).not.toContain('This is hidden');
    // });

    afterEach(() => { fixture = null; });
});
