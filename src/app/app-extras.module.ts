import {
  NgModule
} from '@angular/core';

import {
  SkyGridModule
} from './public';

require('./public/polyfills');

@NgModule({
  imports: [
    SkyGridModule
  ],
  exports: [
    SkyGridModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
