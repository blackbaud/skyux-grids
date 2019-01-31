import {
  NgModule
} from '@angular/core';

import {
  SkyGridModule
} from './public';
import { SkyLabelModule } from '@skyux/indicators';

@NgModule({
  imports: [
    SkyGridModule,
    SkyLabelModule
  ],
  exports: [
    SkyGridModule,
    SkyLabelModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
