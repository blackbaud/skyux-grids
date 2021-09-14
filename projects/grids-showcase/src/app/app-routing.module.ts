import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridVisualComponent } from './visual/grid/grid-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [{
  path: '',
  component: VisualComponent
},
{
  path: 'visual/grid',
  component: GridVisualComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
