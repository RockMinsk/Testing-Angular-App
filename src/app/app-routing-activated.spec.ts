import { Component, OnInit, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: `contact-edit`,
    template: `<div class="contact-id">{{ contactId }}</div>`,
})
class ContactEditComponent implements OnInit {
    private contactId: number;
    constructor(private activateRoute: ActivatedRoute) { }
    ngOnInit () {
        this.contactId = this.activateRoute.snapshot.params['id'];
    }
}

describe('Routes: testing activated routes with snapshot', () => {
    let fixture;
    const mockActivatedRoute = {
        snapshot: {
            params: {
                id: 'aMockId'
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute}
            ],
            declarations: [ContactEditComponent],
        });
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ContactEditComponent);
        fixture.detectChanges();
    }));

    it('Tries to route to a page', async(() => {
        const testEl = fixture.debugElement.query(By.css('div'));
        expect(testEl.nativeElement.textContent).toEqual('aMockId');
    }));
});
