import {
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { CheckboxComponent as CoreCheckboxComponent } from '@fundamental-ngx/core';
import { BaseInput } from '../base.input';

/**
 * Checkbox implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-Checkbox-Component-Technical-Design
 * documents.
 *
 *
 */
@Component({
    selector: 'fdp-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent extends BaseInput implements AfterViewInit, OnInit {
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
        this.setValue(selectValue);
    }

    /** Emitting checkbox change event */
    @Output()
    change = new EventEmitter();

    /** @hidden
     * tracking checkbox current value
     */
    public checkboxValue: any;

    /* @hidden
     * reference of child checkbox implementation
     */
    @ViewChild(CoreCheckboxComponent)
    private corecheckbox: CoreCheckboxComponent;

    /* @hidden
     * stores  formControl values
     */
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
            if (typeof value === 'string') {
                super.writeValue(value);
            } else if (typeof value !== 'string') {
                this._setCoreCheckboxControl(value);
            }
        }
    }

    ngOnInit(): void {
        if (this.isBinary) {
            // if binary checkbox does not have control value, set default to false
            this.checkboxValue = this.checkboxValue ? this.checkboxValue : false;
            this.onChange(this.checkboxValue);
        } else {
            this.onChange(this.model);
        }
        super.ngOnInit();
    }

    /** child checkbox is initialized here */
    ngAfterViewInit(): void {
        if (!this.isBinary) {
            // updating checkbox values property for this custom checkbox
            this.corecheckbox.values.trueValue = this.value;
            this.corecheckbox.values.falseValue = undefined;

            // set core checkbox control value based on platform checkbox control value
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
        this._updateModel();
    }

    /** @hidden
     * Adds checkbox or removes checkbox from model
     */
    private _updateModel(): void {
        if (this.isBinary) {
            this.onChange(this.checkboxValue);
            this.change.emit(this.checkboxValue);
        } else {
            // checkbox has been selected
            if (this.corecheckbox.inputLabel.nativeElement.checked) {
                this._addValue();
            } else {
                this._removeValue();
            }
            this.onChange(this.model);

            if (this.ngControl) {
                this.ngControl.control.setValue(this.model);
            }
            this.change.emit(this.model);
        }
    }

    /** @hidden
     * triggered when checkbox is unchecked, value removed from model
     */
    private _removeValue(): void {
        if (this.model) {
            this.model = this.model.filter((val: string) => val !== this.value);
        }
    }

    /** @hidden
     * triggered when checkbox is checked, value added to model
     */
    private _addValue(): void {
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

    /**
     * @hidden
     * @param value setting core checkbox control value
     */
    private _setCoreCheckboxControl(value: any): void {
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
            if (this.isBinary && !this.checkboxValue && !value) {
                this.checkboxValue = false;
            } else {
                this.checkboxValue = value;
            }
            this.onChange(this.checkboxValue);
        }
    }
}
