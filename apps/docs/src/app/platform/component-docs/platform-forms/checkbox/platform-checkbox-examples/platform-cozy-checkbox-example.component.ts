import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-cozy-checkbox-example',
    templateUrl: 'platform-cozy-checkbox-example.component.html',
})
export class PlatformCozyChekboxExampleComponent {
    example1: boolean = false;
    example2: boolean = true;
    example3: boolean;
    example4: string[] = [];
    example5: string[] = ['Checkbox5'];
    example6: string[] = [];
    example7: string[] = ['Checkbox8', 'Checkbox9'];
    example8: string[] = [];
}
