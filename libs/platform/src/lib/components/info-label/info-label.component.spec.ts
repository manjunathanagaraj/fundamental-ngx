import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLabelComponent } from './info-label.component';
import { Component, ViewChild } from '@angular/core';


@Component({
    selector: 'fdp-test-info-label',
    template: `<fdp-info-label [type]="type" [color]="color" [glyph]="gylph" ></fdp-info-label>`
})
class TestInfoLabelComponent {
    @ViewChild(InfoLabelComponent, { static: true })
    infoLabelComponent: InfoLabelComponent;

    public type: string;
    public color: string;
    public gylph: string;
}

describe('InfoLabelComponent', () => {
    let component: InfoLabelComponent;
    let fixture: ComponentFixture<TestInfoLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoLabelComponent, TestInfoLabelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInfoLabelComponent);
        component = fixture.componentInstance.infoLabelComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add label Type', () => {
        component.type = 'numeric';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--numeric')).toBe(true);
    });

    it('Should Add  label Type only icon', () => {
        component.type = 'only-icon';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--only-icon')).toBe(true);
    });

    it('Should Add  label Type icon', () => {
        component.type = 'icon';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--icon')).toBe(true);
    });

    it('Should Add Accent Color', () => {
        component.color = '2';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--accent-color-2')).toBe(true);
    });

    it('Should Add icon', () => {
        component.glyph = 'future';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('sap-icon--future')).toBe(true);
    });

    it('Should Add icon', () => {
        component.glyph = 'add-activity-2';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('sap-icon--add-activity-2')).toBe(true);
    });
});

