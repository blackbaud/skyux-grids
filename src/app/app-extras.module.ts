import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyGridModule
} from './public';
import {
  SkyPopoverModule
} from '@skyux/popovers';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyGridModule,
    SkyPopoverModule
  ]
})
export class AppExtrasModule { }
