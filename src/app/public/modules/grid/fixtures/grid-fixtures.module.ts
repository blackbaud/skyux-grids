import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyUIConfigService
} from '@skyux/core';

import {
  SkyPopoverModule
} from '@skyux/popovers';

import {
  of as observableOf
} from 'rxjs';

import {
  SkyGridModule
} from '../grid.module';

import {
  GridTestComponent
} from './grid.component.fixture';

import {
  GridEmptyTestComponent
} from './grid-empty.component.fixture';

import {
  GridDynamicTestComponent
} from './grid-dynamic.component.fixture';

import {
  GridAsyncTestComponent
} from './grid-async.component.fixture';

import {
  GridInteractiveTestComponent
} from './grid-interactive.component.fixture';

import {
  GridUndefinedTestComponent
} from './grid-undefined.component.fixture';

@NgModule({
  declarations: [
    GridTestComponent,
    GridEmptyTestComponent,
    GridDynamicTestComponent,
    GridAsyncTestComponent,
    GridInteractiveTestComponent,
    GridUndefinedTestComponent
  ],
  imports: [
    CommonModule,
    SkyGridModule,
    SkyPopoverModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: SkyUIConfigService,
      useValue: {
        getConfig: () => observableOf({
          selectedColumnIds: []
        }),
        setConfig: () => observableOf({})
      }
    }
  ],
  exports: [
    GridTestComponent,
    GridEmptyTestComponent,
    GridDynamicTestComponent,
    GridAsyncTestComponent,
    GridInteractiveTestComponent,
    GridUndefinedTestComponent
  ]
})
export class GridFixturesModule { }
