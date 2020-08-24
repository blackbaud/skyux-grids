import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyGridModule
} from '@skyux/grids';

import {
  SkyGridDemoComponent
} from './grid-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkyGridModule
  ],
  declarations: [
    SkyGridDemoComponent
  ],
  exports: [
    SkyGridDemoComponent
  ]
})

export class SkyGridDemoModule { }
