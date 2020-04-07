import {
  Component,
  ViewChild,
  TemplateRef
} from '@angular/core';

import {
  SkyGridColumnModel
} from '../grid-column.model';

import {
  SkyGridComponent
} from '../grid.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./grid-empty.component.fixture.html')
})
export class GridEmptyTestComponent {

  @ViewChild(SkyGridComponent, {
    read: SkyGridComponent,
    static: true
  })
  public grid: SkyGridComponent;

  @ViewChild(TemplateRef, {
    read: TemplateRef,
    static: false
  })
  public template: TemplateRef<any>;

  public columns: Array<SkyGridColumnModel>;
  public selectedColumnIds: string[];
  public settingsKey: string;

  public data: any[] = [
    {
      id: '1',
      column1: '1',
      column2: 'Apple'
    },
    {
      id: '2',
      column1: '01',
      column2: 'Banana'
    }
  ];
}
