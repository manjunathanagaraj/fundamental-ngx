import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, DoCheck } from '@angular/core';

@Component({
    selector: 'fdp-checkbox-style',
    templateUrl: 'platform-checkbox-styling.component.html',
})
export class PlatformChekboxStyleComponent implements DoCheck {
    customForm = new FormGroup({
        example1: new FormControl(''),
        example2: new FormControl('', Validators.required),
    });

    formcontrolRef1 = this.customForm.get('example1');
    formcontrolRef2 = this.customForm.get('example2');

    ngDoCheck() {
        if (this.formcontrolRef1.value !== true) {
            this.formcontrolRef1.setErrors({ invalid: true });
            this.formcontrolRef1.markAsTouched();
        }
    }

    onSubmit(values: any) {
        if (this.formcontrolRef2.value !== true) {
            this.formcontrolRef2.setErrors({ invalid: true });
            this.formcontrolRef2.markAsTouched();
        }
    }
}
