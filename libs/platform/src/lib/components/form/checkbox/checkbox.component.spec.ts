import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { CheckboxModule, FormModule } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-test-checkbox',
    template: `
        <form [formGroup]="customForm">
            <fieldset fd-fieldset>
                <fdp-checkbox
                    [id]="'checkbox-0'"
                    [name]="'checkbox-0'"
                    [label]="'checkbox0'"
                    [contentDensity]="'compact'"
                    [tristate]="true"
                    [value]="'Yes'"
                    formControlName="example1"
                ></fdp-checkbox>
            </fieldset>

            <fieldset fd-fieldset>
                <fdp-checkbox
                    [id]="'checkbox-1'"
                    [name]="'checkbox-1'"
                    [label]="'Checkbox1'"
                    [value]="'Checkbox1'"
                    [contentDensity]="'compact'"
                    [formControl]="customForm.controls.example2"
                ></fdp-checkbox>
            </fieldset>

            <fieldset fd-fieldset>
                <fdp-checkbox
                    [id]="'checkbox-2'"
                    [name]="'checkbox-2'"
                    [label]="'Checkbox2'"
                    [value]="'Checkbox2'"
                    [contentDensity]="'compact'"
                    [formControl]="customForm.controls.example2"
                ></fdp-checkbox>
            </fieldset>

            <fieldset fd-fieldset>
                <fdp-checkbox
                    [id]="'checkbox-3'"
                    [name]="'checkbox-3'"
                    [label]="'Checkbox3'"
                    [value]="'Checkbox3'"
                    [contentDensity]="'compact'"
                    [formControl]="customForm.controls.example2"
                ></fdp-checkbox>
            </fieldset>

            <fieldset fd-fieldset>
                <fdp-checkbox
                    [id]="'checkbox-4'"
                    [name]="'checkbox-4'"
                    [label]="'Checkbox4'"
                    [value]="'Checkbox4'"
                    formControlName="disabledcheckbox"
                ></fdp-checkbox>
            </fieldset>
        </form>
    `,
})
class TestCheckboxComponent {
    @ViewChildren(CheckboxComponent)
    fdpCheckboxes: QueryList<CheckboxComponent>;

    customForm = new FormGroup({
        example1: new FormControl(['Yes']),
        example2: new FormControl(['Checkbox1', 'Checkbox2']),
        disabledcheckbox: new FormControl({ value: [], disabled: true }),
    });
}

describe('Checkbox test Component', () => {
    let host: TestCheckboxComponent;
    let fixture: ComponentFixture<TestCheckboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormModule, CheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestCheckboxComponent, CheckboxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCheckboxComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should have classes applied', () => {
        const fdpElem = fixture.debugElement.query(By.css('fdp-checkbox'));
        const fdElem = fixture.debugElement.query(By.css('fd-checkbox'));
        const checkboxInput = fixture.debugElement.query(By.css('input'));
        const checkboxLable = fixture.debugElement.query(By.css('label'));

        // fdp-checkbox
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-content-density')).toEqual('compact');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-id')).toEqual('checkbox-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-tristate')).toBeTruthy();

        // fd-checkbox.
        expect(fdElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-input-id')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-compact')).toBeTruthy();
        expect(fdElem.nativeElement.getAttribute('ng-reflect-tristate')).toBeTruthy();

        // Input Element
        expect(checkboxInput.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(checkboxInput.nativeElement.getAttribute('type')).toEqual('checkbox');
        expect(checkboxInput.nativeElement.getAttribute('id')).toEqual('checkbox-0');
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label--compact')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox--compact')).toBeTruthy();
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox')).toBeTruthy();
    });

    it('should change checkbox state on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();

        // default value
        expect(checkboxes[0].checkboxValue).toEqual('Yes');
        expect(host.customForm.get('example1').value).toEqual(['Yes']);

        const checkboxLable = fixture.debugElement.query(By.css('label'));

        checkboxLable.nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(checkboxes[0].checkboxValue).toBeFalsy();
        expect(host.customForm.get('example1').value).toEqual([]);

        checkboxLable.nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(checkboxes[0].checkboxValue).toEqual(null);
        expect(host.customForm.get('example1').value).toEqual([null]);

        checkboxLable.nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(checkboxes[0].checkboxValue).toEqual('Yes');
        expect(host.customForm.get('example1').value).toEqual(['Yes']);
    });

    it('should apply is-error style on form Error', async () => {
        await wait(fixture);
        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(inputElem.nativeElement.classList.contains('is-error')).toBeFalsy();
        expect(inputElem.nativeElement.classList.contains('is-warning')).toBeFalsy();

        host.customForm.get('example1').setErrors({ 'has error': true });
        host.customForm.get('example1').markAsTouched();

        fixture.detectChanges();
        await wait(fixture);

        const inputElem1 = fixture.debugElement.query(By.css('input'));
        expect(inputElem1.nativeElement.classList.contains('is-error')).toBeTruthy();
    });

    it('should select multiple checkboxes in one formcontrol', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('label'));

        await wait(fixture);
        fixture.detectChanges();

        host.customForm.get('example2').value.forEach((checkbox: string) => {
            ['Checkbox1', 'Checkbox2'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxValue).toEqual('Checkbox1');
        expect(checkboxes[2].checkboxValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxValue).toBeFalsy();

        // click on checkbox20
        checkboxLables[3].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        host.customForm.get('example2').value.forEach((checkbox: string) => {
            ['Checkbox1', 'Checkbox2', 'Checkbox3'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxValue).toEqual('Checkbox1');
        expect(checkboxes[2].checkboxValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxValue).toEqual('Checkbox3');

        // click on checkbox18
        checkboxLables[1].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        host.customForm.get('example2').value.forEach((checkbox: string) => {
            ['Checkbox2', 'Checkbox3'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxValue).toBeFalsy();
        expect(checkboxes[2].checkboxValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxValue).toEqual('Checkbox3');
    });

    it('should not be able to change disabled checkbox value on click, ', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('label'));

        await wait(fixture);
        fixture.detectChanges();

        expect(checkboxes[4].checkboxValue).toBeFalsy();

        // click on disabled checkbox
        checkboxLables[4].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(checkboxes[4].checkboxValue).toBeFalsy();
    });
});

@Component({
    selector: 'fdp-test-checkbox-template',
    template: `
        <form>
            <fieldset fd-fieldset>
                <fdp-checkbox
                    [id]="'checkbox-0'"
                    [name]="'checkbox-0'"
                    [label]="'checkbox0'"
                    [contentDensity]="'compact'"
                    [value]="'checkbox0'"
                    [(ngModel)]="example1"
                ></fdp-checkbox>
            </fieldset>
        </form>
    `,
})
class TestCheckboxComponentTemplateDriven {
    example1 = ['checkbox0'];
}

describe('Checkbox test Component with Template driven form', () => {
    let host: TestCheckboxComponentTemplateDriven;
    let fixture: ComponentFixture<TestCheckboxComponentTemplateDriven>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormModule, CheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestCheckboxComponentTemplateDriven, CheckboxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCheckboxComponentTemplateDriven);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should have classes applied', () => {
        const fdpElem = fixture.debugElement.query(By.css('fdp-checkbox'));
        const fdElem = fixture.debugElement.query(By.css('fd-checkbox'));
        const checkboxInput = fixture.debugElement.query(By.css('input'));
        const checkboxLable = fixture.debugElement.query(By.css('label'));

        // fdp-checkbox
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-content-density')).toEqual('compact');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-id')).toEqual('checkbox-0');

        // fd-checkbox.
        expect(fdElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-input-id')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-compact')).toBeTruthy();

        // Input Element
        expect(checkboxInput.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(checkboxInput.nativeElement.getAttribute('type')).toEqual('checkbox');
        expect(checkboxInput.nativeElement.getAttribute('id')).toEqual('checkbox-0');
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label--compact')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox--compact')).toBeTruthy();
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox')).toBeTruthy();
    });

    it('should change checkbox state on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxLable = fixture.debugElement.query(By.css('label'));

        await wait(fixture);
        fixture.detectChanges();

        // default value
        expect(host.example1).toEqual(['checkbox0']);

        checkboxLable.nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.example1).toEqual([]);

        checkboxLable.nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.example1).toEqual(['checkbox0']);
    });
});
