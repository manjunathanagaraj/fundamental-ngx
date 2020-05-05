import { Component } from '@angular/core';
import * as cozyCheckboxExamplehtml from '!raw-loader!./platform-checkbox-examples/platform-cozy-checkbox-example.component.html';
import * as cozyCheckboxExampleSrc from '!raw-loader!./platform-checkbox-examples/platform-cozy-checkbox-example.component.ts';
import * as compactCheckboxExamplehtml from '!raw-loader!./platform-checkbox-examples/platform-compact-checkbox-example.component.html';
import * as compactCheckboxExampleSrc from '!raw-loader!./platform-checkbox-examples/platform-compact-checkbox-example.component.ts';
import * as checkboxStylehtml from '!raw-loader!./platform-checkbox-examples/platform-checkbox-styling.component.html';
import * as checkboxStyleSrc from '!raw-loader!./platform-checkbox-examples/platform-checkbox-styling.component.ts';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'platform-checkbox-docs.component.html',
})
export class PlatformCheckboxDocsComponent {
    cozyCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: cozyCheckboxExamplehtml,
            fileName: 'platform-cozy-checkbox-example',
        },
        {
            language: 'typescript',
            code: cozyCheckboxExampleSrc,
            fileName: 'platform-cozy-checkbox-example',
            component: 'PlatformCozyChekboxExampleComponent',
        },
    ];
    
    compactCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: compactCheckboxExamplehtml,
            fileName: 'platform-compact-checkbox-example',
        },
        {
            language: 'typescript',
            code: compactCheckboxExampleSrc,
            fileName: 'platform-compact-checkbox-example',
            component: 'PlatformCompactChekboxExampleComponent',
        },
    ];

    errorCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxStylehtml,
            fileName: 'platform-checkbox-styling',
        },
        {
            language: 'typescript',
            code: checkboxStyleSrc,
            fileName: 'platform-checkbox-styling',
            component: 'PlatformChekboxStyleComponent',
        },
    ];
}
