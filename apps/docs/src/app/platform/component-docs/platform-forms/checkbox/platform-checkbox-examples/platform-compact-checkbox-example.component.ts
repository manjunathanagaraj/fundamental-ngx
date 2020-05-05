import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-compact-checkbox-example',
    templateUrl: 'platform-compact-checkbox-example.component.html',
})
export class PlatformCompactChekboxExampleComponent {
    customForm = new FormGroup({
        example9: new FormControl(false),
        example10: new FormControl(true),
        example11: new FormControl(''),
        example12: new FormControl([]),
        example13: new FormControl(['Checkbox15']),
        example14: new FormControl([]),
        example15: new FormControl(['Checkbox18', 'Checkbox19']),
        example16: new FormControl({ value: '', disabled: true }),
    });

    triStateForm = new FormGroup({
        example17: new FormControl([]),
        example18: new FormControl([null]),
    });
}
