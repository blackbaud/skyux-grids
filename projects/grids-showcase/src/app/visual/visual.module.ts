import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkyDropdownModule, SkyPopoverModule } from '@skyux/popovers';
import { VisualComponent } from './visual.component';
import { GridVisualComponent } from './grid/grid-visual.component';
import { SkyGridModule } from 'projects/grids/src/public-api';

@NgModule({
  declarations: [GridVisualComponent, VisualComponent],
  imports: [
    CommonModule,
    RouterModule,
    SkyGridModule,
    SkyDropdownModule,
    SkyPopoverModule,
  ],
})
export class VisualModule {}
