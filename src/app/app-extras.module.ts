import {
  NgModule
} from '@angular/core';

import {
  SkyCodeModule
} from '@blackbaud/skyux-lib-code-block';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyDropdownModule,
  SkyPopoverModule
} from '@skyux/popovers';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyActionBarsForRootCompatModule
} from './public/modules/shared/grids-for-root-compat.module';

import {
  SkyGridModule
} from './public/public_api';

@NgModule({
  imports: [
    SkyActionBarsForRootCompatModule
  ],
  exports: [
    SkyAppLinkModule,
    SkyCodeModule,
    SkyDocsToolsModule,
    SkyDropdownModule,
    SkyFluidGridModule,
    SkyGridModule,
    SkyPopoverModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-grids',
        packageName: '@skyux/grids'
      }
    }
  ]
})
export class AppExtrasModule { }
