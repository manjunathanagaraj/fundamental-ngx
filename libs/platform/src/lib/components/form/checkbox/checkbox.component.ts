import {
    Component,
    ChangeDetectorRef,
    Self,
    Optional,
    EventEmitter,
    Output,
    Input,
    ViewChild,
    AfterViewInit,
} from '@angular/core';
import { NgControl, NgForm, FormControl } from '@angular/forms';
import { CheckboxComponent as CoreCheckboxComponent } from '@fundamental-ngx/core';
import { BaseInput } from '../base.input';
import { Status } from './../form-control';

@Component({
    selector: 'fdp-checkbox',
    templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends BaseInput implements AfterViewInit {
    /** reference of child checkbox implementation */
    @ViewChild(CoreCheckboxComponent)
    private corecheckbox: CoreCheckboxComponent;

    /** set to true if binary checkbox */
    @Input()
    isBinary: boolean = false;

    /** Sets label for checkbox. */
    @Input()
    label: string;

    /**
     * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
     * take precedence so this may be omitted.
     */
    @Input('aria-label')
    ariaLabel: string = '';

    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    @Input('aria-labelledby')
    ariaLabelledby: string | null = null;

    /** indeterminate state */
    @Input()
    tristate: boolean = false;

    /** indeterminate state can be selected  */
    @Input()
    tristateSelectable: boolean = true;

    /** value for checkbox, when it is not binary */
    @Input()
    get value(): any {
        return super.getValue();
    }
    set value(selectValue: any) {
        this._value = selectValue;
        // calling super.setValue() causing lots of issues. so setting value here.
        // rest functionality imported from baseinput
    }

    /** set status value , will be coming from checkbox group*/
    set stateStatus(newStatus: Status) {
        this._status = newStatus;
    }

    /** returns form status */
    get stateStatus(): Status {
        return this.status;
    }

    /** due to an issue in Angular bind the formControl instance instead of using formControlName.
     *  https://github.com/angular/angular/issues/17685
     */
    @Input()
    formControl: FormControl;

    /** Emitting checkbox change event */
    @Output()
    change = new EventEmitter();

    /** tracking checkbox current value */
    checkboxValue: any;

    /** stores  formControl values*/
    private model: any;

    constructor(
        protected _changeDetector: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_changeDetector, ngControl, ngForm);
    }

    /** ControlvalueAccessor */
    writeValue(value: any): void {
        if (value !== null) {
            // value of checkbox will have type string, formcontrol is expected as array
            if (typeof value !== 'string') {
                this.checkboxValue = value;
                // Expecting Formcontrol values as Array [] or ['value']
                if (Array.isArray(value)) {
                    if (this.value && value.includes(this.value)) {
                        this.checkboxValue = this.value;
                    } else {
                        if (this.tristate && value.includes(null)) {
                            this.checkboxValue = null;
                        } else {
                            this.checkboxValue = undefined;
                        }
                    }

                    this.model = value;
                    this.onChange(this.model);
                } else {
                    if (this.isBinary && !this.checkboxValue) {
                        this.checkboxValue = false;
                        this.onChange(this.checkboxValue);
                    }
                }
            }
            // baseInput writevalue functionality
            // Emitting message
            this.stateChanges.next('writeValue');
        }
    }

    /** child checkbox is initialized here */
    ngAfterViewInit(): void {
        if (!this.isBinary) {
            // updating checkbox values property for this custom checkbox
            this.corecheckbox.values.trueValue = this.value;
            this.corecheckbox.values.falseValue = undefined;

            if (this.value && this.model && this.model.includes(this.value)) {
                this.checkboxValue = this.value;
            } else {
                if (this.tristate && this.model.includes(null)) {
                    this.checkboxValue = null;
                } else {
                    this.checkboxValue = undefined;
                }
            }
        } else {
            if (!this.checkboxValue) {
                this.checkboxValue = false;
            }
        }
        super.ngAfterViewInit();
    }

    /** update controller on checkbox state change */
    public onClick(): void {
        this.checkboxValue = this.corecheckbox.checkboxValue;
        this.updateModel();
    }

    /** Adds checkbox or removes checkbox from model */
    private updateModel(): void {
        if (this.isBinary) {
            this.onChange(this.checkboxValue);
        } else {
            // checkbox has been selected
            if (this.corecheckbox.inputLabel.nativeElement.checked) {
                this.addValue();
            } else {
                this.removeValue();
            }
            this.onChange(this.model);

            if (this.formControl) {
                this.formControl.setValue(this.model);
            }
        }
        this.change.emit();
    }

    /** triggered when checkbox is unchecked, value removed from model */
    private removeValue(): void {
        if (this.model) {
            this.model = this.model.filter((val: string) => val !== this.value);
        }
    }

    /** triggered when checkbox is checked, value added to model */
    private addValue(): void {
        if (this.corecheckbox.checkboxState === 'indeterminate') {
            this.model = [...this.model, this.checkboxValue];
        } else if (this.model) {
            this.model = [...this.model, this.checkboxValue];
        } else {
            this.model = [this.checkboxValue];
        }

        // tristate checkbox move from intermediate to checked
        if (this.tristate && this.corecheckbox.checkboxState !== 'indeterminate') {
            this.model = this.model.filter((val: string) => val !== null);
        }
    }
}
