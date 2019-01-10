import {
  NgModule
} from '@angular/core';

import { SkyUIConfigService } from '@skyux/core';
import { SkyAppUIConfigService } from '@blackbaud-internal/skyux-lib-ui-config-service';

import {
  SkyGridModule
} from './public';

@NgModule({
  exports: [
    SkyGridModule
  ],
  providers: [
    {
      provide: SkyUIConfigService,
      useClass: SkyAppUIConfigService
    }
  ]
})
export class AppExtrasModule { }
