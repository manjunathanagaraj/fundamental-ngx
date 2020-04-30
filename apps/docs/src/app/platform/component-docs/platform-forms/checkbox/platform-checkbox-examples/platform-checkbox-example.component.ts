import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-checkbox-example',
    templateUrl: 'platform-checkbox-example.component.html',
})
export class PlatformChekboxExampleComponent {
    example1: boolean = false;
    example2: boolean = true;
    example3: boolean;
    example4: string[] = [];
    example5: string[] = ['Checkbox5'];
    example6: string[] = [];
    example7: string[] = ['Checkbox8', 'Checkbox9'];

    customForm = new FormGroup({
        example8: new FormControl(false),
        example9: new FormControl(true),
        example10: new FormControl(''),
        example11: new FormControl([]),
        example12: new FormControl(['Checkbox15']),
        example13: new FormControl([]),
        example14: new FormControl(['Checkbox18', 'Checkbox19']),
        example15: new FormControl([]),
        example16: new FormControl([null]),
        disabledcheckbox: new FormControl({ value: '', disabled: true }),
    });
}
