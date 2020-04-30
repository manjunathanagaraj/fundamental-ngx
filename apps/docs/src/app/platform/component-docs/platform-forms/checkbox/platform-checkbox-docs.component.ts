import { Component } from '@angular/core';
import * as checkboxExamplehtml from '!raw-loader!./platform-checkbox-examples/platform-checkbox-example.component.html';
import * as checkboxExampleSrc from '!raw-loader!./platform-checkbox-examples/platform-checkbox-example.component.ts';
import * as checkboxStylehtml from '!raw-loader!./platform-checkbox-examples/platform-checkbox-styling.component.html';
import * as checkboxStyleSrc from '!raw-loader!./platform-checkbox-examples/platform-checkbox-styling.component.ts';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'platform-checkbox-docs.component.html',
})
export class PlatformCheckboxDocsComponent {
    standardCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxExamplehtml,
            fileName: 'platform-checkbox-example',
        },
        {
            language: 'typescript',
            code: checkboxExampleSrc,
            fileName: 'platform-checkbox-example',
            component: 'PlatformChekboxExampleComponent',
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
