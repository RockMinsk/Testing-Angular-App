import { Component, DebugElement, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

@Injectable()
class NavConfigService {
    menu = [{ label: 'Home', path: '/target/12' }];
}

@Component({
    selector: `navigation-menu`,
    template: `<div><a *ngFor="let item of menu" [id]="item.label" [routerLink]="item.path">{{ item.label }}</a></div>`,
})
class NavigationMenu implements OnInit {
    menu: any;
    constructor(private navConfig: NavConfigService) { }
    ngOnInit() {
        this.menu = this.navConfig.menu;
    }
}

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
class AppComponent { }

@Component({
    selector: `simple-component`,
    template: `simple`
})
class SimpleComponent { }

describe('Routes: testing routes location', () => {
    let fixture;
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
                { path: '', component: NavigationMenu },
                { path: 'target/:id', component: SimpleComponent }
            ])],
            providers: [{
                provide: NavConfigService,
                useValue: { menu: [{ label: 'Home', path: '/target/fakeId' }]}
            }],
            declarations: [NavigationMenu, SimpleComponent, AppComponent],
        });
    });

    beforeEach(fakeAsync(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(AppComponent);
        router.navigateByUrl('/');
        advance();
    }));

    function advance(): void {
        flush();
        fixture.detectChanges();
    }

    it('Tries to route to a page', fakeAsync(() => {
        const menu = fixture.debugElement.query(By.css('a'));
        menu.triggerEventHandler('click', {button: 0});
        advance();
        expect(location.path()).toEqual('/target/fakeId');
    }));
});
