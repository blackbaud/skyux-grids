import {
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ContentChildren,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';

import {
  SkyUIConfigService
} from '@skyux/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Subject
} from 'rxjs/Subject';

import {
  Subscription
} from 'rxjs/Subscription';

import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/map';

import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/take';

import 'rxjs/add/operator/takeWhile';

import 'rxjs/add/observable/fromEvent';

import {
  DragulaService
} from 'ng2-dragula/ng2-dragula';

import {
  SkyAppWindowRef
} from '@skyux/core';

import {
  ListItemModel
} from '@skyux/list-builder-common/state/items/item.model';

import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common';

import {
  SkyGridColumnComponent
} from './grid-column.component';

import {
  SkyGridColumnModel
} from './grid-column.model';

import {
  SkyGridAdapterService
} from './grid-adapter.service';

import {
  SkyGridColumnDescriptionModelChange,
  SkyGridColumnHeadingModelChange,
  SkyGridColumnInlineHelpPopoverModelChange,
  SkyGridColumnWidthModelChange,
  SkyGridMessage,
  SkyGridSelectedRowsModelChange,
  SkyGridMessageType,
  SkyGridSelectedRowsSource
} from './types';

import {
  SkyGridUIConfig
} from './types/grid-ui-config';

import '../../polyfills';

let nextId = 0;

@Component({
  selector: 'sky-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  viewProviders: [DragulaService],
  providers: [
    SkyGridAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyGridComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  @Input()
  public columns: Array<SkyGridColumnModel>;

  @Input()
  public data: Array<any>;

  @Input()
  public enableMultiselect: boolean = false;

  @Input()
  public fit: string = 'width';

  @Input()
  public hasToolbar: boolean = false;

  @Input()
  public height: number;

  @Input()
  public highlightText: string;

  @Input()
  public messageStream = new Subject<SkyGridMessage>();

  @Input()
  public multiselectRowId: string;

  @Input()
  public rowHighlightedId: string;

  @Input()
  public settingsKey: string;

  @Input()
  public sortField: ListSortFieldSelectorModel;

  @Input()
  public width: number;

  @Input()
  public set selectedColumnIds(newIds: Array<string>) {
    const oldIds = this._selectedColumnIds;
    this._selectedColumnIds = newIds;

    if (this.columns) {
      this.setDisplayedColumns();
    }

    // Ensure that the ids have changed. The two null checks ensure that we short circuit and don't
    // run the array equality check if it isn't needed due to one of the two values being undefined
    if (!oldIds || !this._selectedColumnIds ||
      !(this.arraysEqual(this._selectedColumnIds, oldIds))) {

      // This variable ensures that we do not set user config options or fire the change event
      // on the first time that the columns are set up
      if (this.selectedColumnIdsSet) {
        this.setUserConfig({
          selectedColumnIds: newIds
        });
        this.selectedColumnIdsChange.emit(this._selectedColumnIds);

        if (this.isResized) {
          this.resetTableWidth();
        }
      }

    }

    this.selectedColumnIdsSet = true;
  }

  public get selectedColumnIds(): Array<string> {
    return this._selectedColumnIds;
  }

  @Input()
  public set selectedRowIds(value: Array<string>) {
    if (value) {
      this._selectedRowIds = value;
      this.applySelectedRows();
      this.emitSelectedRows(SkyGridSelectedRowsSource.SelectedRowIdsChange);
    }
  }

  public get selectedRowIds(): Array<string> {
    return this._selectedRowIds;
  }

  @Output()
  public columnWidthChange = new EventEmitter<Array<SkyGridColumnWidthModelChange>>();

  @Output()
  public multiselectSelectionChange = new EventEmitter<SkyGridSelectedRowsModelChange>();

  @Output()
  public selectedColumnIdsChange = new EventEmitter<Array<string>>();

  @Output()
  public sortFieldChange = new EventEmitter<ListSortFieldSelectorModel>();

  public columnResizeStep = 10;
  public currentSortField: BehaviorSubject<ListSortFieldSelectorModel>;
  public displayedColumns: Array<SkyGridColumnModel>;
  public gridId: number = ++nextId;
  public items: Array<any>;
  public maxColWidth = 9999; // This is an arbitrary number, as the input range picker won't work without a value.
  public minColWidth = 50;
  public showResizeBar: boolean = false;
  public showTopScroll: boolean = false;

  @ContentChildren(SkyGridColumnComponent, { descendants: true })
  private columnComponents: QueryList<SkyGridColumnComponent>;

  @ViewChildren('gridCol')
  private columnElementRefs: QueryList<ElementRef>;
  @ViewChildren('colSizeRange')
  private columnRangeInputElementRefs: QueryList<ElementRef>;
  @ViewChild('gridContainer')
  private tableContainerElementRef: ElementRef;
  @ViewChild('gridTable')
  private tableElementRef: ElementRef;
  @ViewChild('topScrollContainer')
  private topScrollContainerElementRef: ElementRef;
  @ViewChild('resizeBar')
  private resizeBar: ElementRef;

  private activeResizeColumnIndex: string;
  private isDraggingResizeHandle: boolean = false;
  private isResized: boolean = false;
  private ngUnsubscribe = new Subject();
  private startColumnWidth: number;
  private subscriptions: Subscription[] = [];
  private tableWidth: number;
  private scrollTriggered: boolean = false;
  private selectedColumnIdsSet: boolean = false;
  private xPosStart: number;

  private _selectedColumnIds: Array<string>;
  private _selectedRowIds: Array<string>;

  constructor(
    private dragulaService: DragulaService,
    private ref: ChangeDetectorRef,
    private gridAdapter: SkyGridAdapterService,
    private skyWindow: SkyAppWindowRef,
    private uiConfigService: SkyUIConfigService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.displayedColumns = new Array<SkyGridColumnModel>();
    this.items = new Array<any>();
    this.currentSortField = new BehaviorSubject<ListSortFieldSelectorModel>({
      fieldSelector: '',
      descending: false
    });
  }

  public ngOnInit() {
    this.messageStream
      .takeUntil(this.ngUnsubscribe)
      .subscribe((message: SkyGridMessage) => {
        this.handleIncomingMessages(message);
      });
  }

  public ngAfterContentInit() {
    if (this.settingsKey) {
      this.applyUserConfig().then(() => {
        this.initColumns();
      });
    } else {
      this.initColumns();
    }

    // Setup column drag-and-drop.
    this.gridAdapter.initializeDragAndDrop(
      this.dragulaService,
      (selectedColumnIds: Array<string>) => {
        this.onHeaderDrop(selectedColumnIds);
      }
    );

    this.applySelectedRows();

    this.checkUserColumnWidthsForScroll();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.columns && this.columns) {
      this.setDisplayedColumns(true);
    }

    if (changes.data && this.data) {
      this.transformData();
    }

    if (changes.sortField) {
      this.setSortHeaders();
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.multiselectSelectionChange.complete();

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('window:resize')
  public onWindowResize() {
    if (!this.showTopScroll) {
      this.checkUserColumnWidthsForScroll();
    }
  }

  public getTopScrollWidth(): string {
    return this.tableElementRef.nativeElement.scrollWidth;
  }

  public getTableClassNames() {
    let classNames: string[] = [];

    if (this.fit !== 'scroll') {
      classNames.push('sky-grid-fit');
    }

    if (this.hasToolbar) {
      classNames.push('sky-grid-has-toolbar');
    }

    return this.addDelimeter(classNames, ' ');
  }

  public getTableHeaderClassNames(column: SkyGridColumnModel) {
    let classNames: string[] = [];

    if (column.locked) {
      classNames.push('sky-grid-header-locked');
    }

    return this.addDelimeter(classNames, ' ');
  }

  public getCaretIconNames(column: SkyGridColumnModel) {
    let iconNames: string[] = [];

    this.getSortDirection(column.field).subscribe((sortDir) => {
      if (sortDir === 'asc') {
        iconNames.push('caret-up');
      }
      if (sortDir === 'desc') {
        iconNames.push('caret-down');
      }
    });

    return this.addDelimeter(iconNames, ' ');
  }

  public onKeydown(event: KeyboardEvent, column: SkyGridColumnModel) {
    const key = event.key.toLowerCase();
    if (key === 'enter' || key === ' ') {
      this.sortByColumn(column);
    }
  }

  public sortByColumn(column: SkyGridColumnModel) {
    if (!this.isDraggingResizeHandle && column.isSortable) {
      this.currentSortField
        .take(1)
        .map(field => {
          let selector = {
            fieldSelector: column.field,
            descending: true
          };

          if (field && field.fieldSelector === column.field && field.descending) {
            selector = {
              fieldSelector: column.field,
              descending: false
            };
          }
          this.sortFieldChange.emit(selector);
          this.currentSortField.next(selector);
        })
        .subscribe();
    }
  }

  public getSortDirection(columnField: string): Observable<string> {
    return this.currentSortField
      .distinctUntilChanged()
      .map(field => {
        return field.fieldSelector === columnField ?
          (field.descending ? 'desc' : 'asc') : undefined;
      });
  }

  public getAriaSortDirection(column: SkyGridColumnModel): Observable<string> {
    return this.currentSortField
      .distinctUntilChanged()
      .map(field => {
        return field.fieldSelector === column.field ?
          (field.descending ? 'descending' : 'ascending') : (column.isSortable ? 'none' : undefined);
      });
  }

  public getCaretVisibility(columnField: string): Observable<string> {
    return this.currentSortField
      .distinctUntilChanged()
      .map(field => {
        return field.fieldSelector === columnField ? 'visible' : 'hidden';
      });
  }

  public getHelpInlineClass(columnField: string): Observable<boolean> {
    return this.getCaretVisibility(columnField).map((visibility: string) => {
      return visibility === 'hidden';
    });
  }

  public onMultiselectCheckboxChange() {
    this.emitSelectedRows(SkyGridSelectedRowsSource.CheckboxChange);
  }

  public updateColumnHeading(change: SkyGridColumnHeadingModelChange) {
    const foundColumnModel = this.columns.find((column: SkyGridColumnModel) => {
      return (
        change.id !== undefined && change.id === column.id ||
        change.field !== undefined && change.field === column.field
      );
    });

    /* istanbul ignore else */
    if (foundColumnModel) {
      foundColumnModel.heading = change.value;
      this.ref.markForCheck();
    }
  }

  public updateInlineHelpPopover(change: SkyGridColumnInlineHelpPopoverModelChange) {
    const foundColumnModel = this.columns.find((column: SkyGridColumnModel) => {
      return (
        change.id !== undefined && change.id === column.id ||
        change.field !== undefined && change.field === column.field
      );
    });

    /* istanbul ignore else */
    if (foundColumnModel) {
      foundColumnModel.inlineHelpPopover = change.value;
      this.ref.markForCheck();
    }
  }

  public updateColumnDescription(change: SkyGridColumnDescriptionModelChange) {
    const foundColumnModel = this.columns.find((column: SkyGridColumnModel) => {
      return (
        change.id !== undefined && change.id === column.id ||
        change.field !== undefined && change.field === column.field
      );
    });

    /* istanbul ignore else */
    if (foundColumnModel) {
      foundColumnModel.description = change.value;
      this.ref.markForCheck();
    }
  }

  public onResizeColumnStart(event: MouseEvent): void {
    // If this table hasn't been resized, initialize all the resize widths.
    if (!this.isResized) {
      this.initColumnWidths();
      this.isResized = true;
    }

    this.initializeResizeColumn(event);

    this.isDraggingResizeHandle = true;
    this.xPosStart = event.pageX;
    this.showResizeBar = true;

    // Show visual indicator of where mouse is dragging (resizeBar).
    this.ref.detectChanges();
    let parentScroll = this.tableContainerElementRef.nativeElement.scrollLeft;
    let resizeBarX = event.pageX - this.tableElementRef.nativeElement.getBoundingClientRect().left - parentScroll;
    this.gridAdapter.setStyle(this.resizeBar, 'left', resizeBarX + 'px');

    event.preventDefault();
    event.stopPropagation();

    const mouseMoveEvent = Observable.fromEvent(document, 'mousemove');
    const touchMoveEvent = Observable.fromEvent(document, 'touchmove');

    Observable.merge(mouseMoveEvent, touchMoveEvent)
      .takeWhile(() => {
        return this.isDraggingResizeHandle;
      })
      .subscribe((moveEvent: any) => {
        this.onResizeHandleMove(moveEvent);
      });

    const mouseUpEvent = Observable.fromEvent(document, 'mouseup');
    const touchEndEvent = Observable.fromEvent(document, 'touchend');

    Observable.merge(mouseUpEvent, touchEndEvent)
      .takeWhile(() => {
        return this.isDraggingResizeHandle;
      })
      .subscribe((endEvent: any) => {
        this.onResizeHandleRelease(endEvent);
      });
  }

  public onKeydownResizeCol(event: KeyboardEvent) {
    // If this table hasn't been resized, initialize all the resize widths.
    if (!this.isResized) {
      this.initColumnWidths();
      this.isResized = true;
    }

    this.initializeResizeColumn(event);
  }

  public onInputChangeResizeCol(event: Event) {
    const input = event.target as HTMLInputElement;
    let newValue = Number(input.value);
    let deltaX = newValue - this.startColumnWidth;
    this.resizeColumnByIndex(this.activeResizeColumnIndex, newValue, deltaX);
  }

  public onResizeHandleMove(event: MouseEvent) {
    let deltaX = event.pageX - this.xPosStart;
    let newColWidth = this.startColumnWidth + deltaX;

    if (newColWidth <= this.minColWidth) {
      event.stopPropagation();
      return;
    }

    let max = this.getMaxRangeByIndex(this.activeResizeColumnIndex);
    if (this.fit === 'width' && newColWidth > max) {
      event.stopPropagation();
      return;
    }

    let parentScroll = this.tableContainerElementRef.nativeElement.scrollLeft;
    let resizeBarX = event.pageX - this.tableElementRef.nativeElement.getBoundingClientRect().left - parentScroll;
    this.gridAdapter.setStyle(this.resizeBar, 'left', resizeBarX + 'px');
  }

  public onResizeHandleRelease(event: MouseEvent) {
    this.showResizeBar = false;
    let deltaX = event.pageX - this.xPosStart;
    let newColWidth = this.startColumnWidth + deltaX;
    this.resizeColumnByIndex(this.activeResizeColumnIndex, newColWidth, deltaX);
    this.isDraggingResizeHandle = false;
    this.activeResizeColumnIndex = undefined;

    event.stopPropagation();
    this.changeDetector.markForCheck();
  }

  public onRowClick(event: any, selectedItem: ListItemModel) {
    /* istanbul ignore else */
    if (this.enableMultiselect) {
      if (event.target === event.currentTarget || !this.isInteractiveElement(event)) {
        selectedItem.isSelected = !selectedItem.isSelected;
        this.ref.markForCheck();
        this.emitSelectedRows(SkyGridSelectedRowsSource.RowClick);
      }
    }
  }

  public isRowHighlighted(id: string): boolean {
    if (this.rowHighlightedId) {
      return id === this.rowHighlightedId;
    }
    return false;
  }

  // Prevent touch devices from inadvertently scrolling grid while dragging columns.
  public onTouchMove(event: any): void {
    event.preventDefault();
  }

  public onTopScroll(event: any): void {
    if (this.scrollTriggered) {
      this.scrollTriggered = false;
      this.tableContainerElementRef.nativeElement.scrollLeft =
        this.topScrollContainerElementRef.nativeElement.scrollLeft;
    } else {
      this.scrollTriggered = true;
    }
  }

  public onGridScroll(event: any): void {
    if (this.scrollTriggered) {
      this.scrollTriggered = false;
      this.topScrollContainerElementRef.nativeElement.scrollLeft =
        this.tableContainerElementRef.nativeElement.scrollLeft;
    } else {
      this.scrollTriggered = true;
    }
  }

  private checkUserColumnWidthsForScroll(): void {
    let columnsWidthTotal = 0;
    const windowSize = this.skyWindow.nativeWindow.innerWidth;
    this.columnComponents.forEach(item => {
      if (!this.showTopScroll && item.width) {
        columnsWidthTotal = columnsWidthTotal + item.width;
        if (columnsWidthTotal > windowSize) {
          this.showTopScroll = true;
          setTimeout(() => {
            this.changeDetector.markForCheck();
          });
        }
      }
    });
  }

  private multiselectSelectAll() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].isSelected = true;
    }
    this.ref.markForCheck();
    this.emitSelectedRows(SkyGridSelectedRowsSource.SelectAll);
  }

  private multiselectClearAll() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].isSelected = false;
    }
    this.ref.markForCheck();
    this.emitSelectedRows(SkyGridSelectedRowsSource.ClearAll);
  }

  private handleIncomingMessages(message: SkyGridMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyGridMessageType.SelectAll:
        this.multiselectSelectAll();
        break;

      case SkyGridMessageType.ClearAll:
        this.multiselectClearAll();
        break;
    }
  }

  private onHeaderDrop(newColumnIds: Array<string>) {
    // update selected columnIds
    this.selectedColumnIds = newColumnIds;

    // mark for check because we are using ChangeDetectionStrategy.onPush
    this.ref.markForCheck();
  }

  private setDisplayedColumns(respectHidden: boolean = false) {
    if (this.selectedColumnIds !== undefined) {
      // setup displayed columns
      this.displayedColumns = this.selectedColumnIds.map(
        columnId => this.columns.filter(column => column.id === columnId)[0]
      );
    } else if (respectHidden) {
      this.displayedColumns = this.columns.filter(column => {
        return !column.hidden;
      });
    } else {
      this.displayedColumns = this.columns;
    }
  }

  private transformData() {
    // Transform data into object with id and data properties
    if (this.data && this.data.length > 0 && this.data[0].id && !this.data[0].data) {
      if (this.multiselectRowId) {
        this.items = this.getGridDataWithSelectedRows();
      } else {
        this.items = this.data.map(item => new ListItemModel(item.id, item));
      }
    } else {
      this.items = this.data;
    }
  }

  private getGridDataWithSelectedRows() {
    let selectedRows = this.getSelectedRows();
    return this.data.map(item => {
      let checked;
      if (item.hasOwnProperty(this.multiselectRowId)) {
        checked = selectedRows.indexOf(item[this.multiselectRowId]) > -1;
      } else {
        checked = selectedRows.indexOf(item.id) > -1;
      }
      return new ListItemModel(item.id, item, checked);
    });
  }

  private applySelectedRows(): void {
    if (this.items && this.items.length > 0 && this.selectedRowIds) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].isSelected = (this.selectedRowIds.indexOf(this.items[i].id) > -1);
      }
      this.ref.markForCheck();
    }
  }

  private setSortHeaders() {
    this.currentSortField.next(this.sortField || { fieldSelector: '', descending: false });
  }

  private getColumnsFromComponent() {
    this.columns = this.columnComponents.map(columnComponent => {
      return new SkyGridColumnModel(columnComponent.template, columnComponent);
    });
  }

  private updateColumns() {
    this.getColumnsFromComponent();
    this.setDisplayedColumns(true);
    this.ref.markForCheck();
  }

  private resizeColumnByIndex(columnIndex: string, newColWidth: number, deltaX: number) {
    let column = this.getColumnModelByIndex(columnIndex);

    // Prevent accidental shrinkage below minimum width.
    if (newColWidth <= this.minColWidth) {
      deltaX = deltaX + this.minColWidth - newColWidth;
      newColWidth = this.minColWidth;
    }

    // fit=width adds/removes width from the last column
    // fit=scroll adds/removes width from the table
    if (this.fit === 'width') {
      let lastColumn = this.getLastDisplayedColumn();

      // Prevent accidental growth that would bump last column off screen.
      let max = this.getMaxRangeByIndex(columnIndex);
      if (newColWidth > max) {
        newColWidth = max;
        deltaX = max - this.startColumnWidth;
      }
      column.width = newColWidth;
      lastColumn.width = lastColumn.width - deltaX;
      this.updateMaxRange();
    } else {
      this.gridAdapter.setStyle(this.tableElementRef, 'width', `${this.tableWidth + deltaX}px`);
      column.width = newColWidth;
    }

    this.ref.detectChanges();
    this.columnWidthChange.emit(this.getColumnWidthModelChange());

    // If in "scroll" mode, reset the full table width.
    // This prevents pixel "hopping" for the non-resized columns
    if (this.fit === 'scroll') {
      this.tableWidth = this.tableElementRef.nativeElement.offsetWidth;
    }
  }

  private initColumnWidths() {
    // Establish table width.
    this.tableWidth = this.tableElementRef.nativeElement.offsetWidth;
    this.showTopScroll = true;

    // Set column widths based on the width initially given by the browser.
    // computedWidth prevents accidental overflow for browsers with sub-pixel widths.
    this.columnElementRefs.forEach((col, index) => {
      let computedWidth = parseFloat(window.getComputedStyle(col.nativeElement).width);
      let offsetWidth = col.nativeElement.offsetWidth;
      let width = Math.max(computedWidth || offsetWidth, this.minColWidth);
      this.getColumnModelByIndex(index).width = width;
    });

    // 'scroll' tables should be allowed to expand outside of their constraints.
    if (this.fit === 'scroll') {
      this.gridAdapter.setStyle(this.tableElementRef, 'min-width', 'auto');
    }

    // Update max limits for input ranges.
    if (this.fit === 'width') {
      this.updateMaxRange();
    }

    this.ref.detectChanges();
  }

  private getColumnWidthModelChange() {
    let columnWidthModelChange = new Array<SkyGridColumnWidthModelChange>();
    this.columns.forEach(column => {
      columnWidthModelChange.push({
        id: column.id,
        field: column.field,
        width: column.width
      });
    });
    return columnWidthModelChange;
  }

  private updateMaxRange() {
    let leftoverWidth = this.getLastDisplayedColumn().width - this.minColWidth;
    this.displayedColumns.forEach((column, index) => {
      let newMaxRange = column.width + leftoverWidth;
      let rangeInput = this.getRangeInputByIndex(index);
      rangeInput.nativeElement.max = newMaxRange;
      rangeInput.nativeElement.setAttribute('aria-valuemax', newMaxRange);
    });
  }

  private initializeResizeColumn(event: any) {
    const clickTarget = event.target as HTMLElement;
    this.activeResizeColumnIndex = clickTarget.getAttribute('sky-cmp-index');
    let column = this.getColumnModelByIndex(this.activeResizeColumnIndex);
    this.startColumnWidth = column.width;
  }

  private resetTableWidth() {
    this.skyWindow.nativeWindow.setTimeout(() => {
      this.gridAdapter.setStyle(this.tableElementRef, 'width', `auto`);
      this.ref.detectChanges();
      this.tableWidth = this.tableElementRef.nativeElement.offsetWidth;
      this.gridAdapter.setStyle(this.tableElementRef, 'width', `${this.tableWidth}px`);
      this.ref.detectChanges();
    });
  }

  private getRangeInputByIndex(index: string | number) {
    return this.columnRangeInputElementRefs.find(input =>
      input.nativeElement.getAttribute('sky-cmp-index') === index.toString()
    );
  }

  private getColumnModelByIndex(index: string | number) {
    return this.displayedColumns[Number(index)];
  }

  private getMaxRangeByIndex(index: string) {
    let columnElementRef = this.columnElementRefs.find(th =>
      th.nativeElement.getAttribute('sky-cmp-index') === index
    );
    let rangeInput = columnElementRef.nativeElement.querySelector('.sky-grid-column-input-aria-only');
    return Number(rangeInput.max);
  }

  private getLastDisplayedColumn() {
    return this.getColumnModelByIndex(this.displayedColumns.length - 1);
  }

  private addDelimeter(text: string[], delimiter: string) {
    return text.filter(val => val).join(delimiter);
  }

  private emitSelectedRows(source: SkyGridSelectedRowsSource) {
    let selectedRows: SkyGridSelectedRowsModelChange = {
      selectedRowIds: this.getSelectedRows(),
      source: source
    };
    this.multiselectSelectionChange.emit(selectedRows);
  }

  private getSelectedRows() {
    return this.items.filter(item => {
      return item.isSelected;
    }).map(item => {
      if (item.data.hasOwnProperty(this.multiselectRowId)) {
        return item.data[this.multiselectRowId];
      }
      return item.id;
    });
  }

  private isInteractiveElement(event: any): any {
    let interactiveElSelectors = `
      a,
      button,
      input,
      label,
      option,
      select,
      textarea,
      details,
      dialog,
      menu,
      menuitem,
      summary`;
    return event.target.closest(interactiveElSelectors);
  }

  private applyUserConfig(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.uiConfigService.getConfig(this.settingsKey)
        .take(1)
        .subscribe((config: SkyGridUIConfig) => {
          /* istanbul ignore else */
          if (config && config.selectedColumnIds) {

            // Remove any columnIds that don't exist in the current data set.
            const filteredColumnIds = config.selectedColumnIds.filter(
              id => this.columns.find(column => column.id === id)
            );

            this.selectedColumnIds = filteredColumnIds;
            this.ref.markForCheck();
          }

          resolve();
        }, () => {
          resolve();
        });
    });
  }

  private setUserConfig(config: SkyGridUIConfig): void {
    if (!this.settingsKey) {
      return;
    }

    this.uiConfigService.setConfig(
      this.settingsKey,
      config
    )
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        () => { },
        (err) => {
          console.warn('Could not save grid settings.');
          console.warn(err);
        }
      );
  }

  private initColumns(): void {
    /* istanbul ignore else */
    if (
      this.columnComponents.length !== 0 ||
      this.columns !== undefined
    ) {
      /* istanbul ignore else */
      /* sanity check */
      if (this.columnComponents.length > 0) {
        this.getColumnsFromComponent();
      }

      this.transformData();
      this.setDisplayedColumns(true);
      this.ref.markForCheck();
    }

    // Watch for added/removed columns:
    this.subscriptions.push(
      this.columnComponents.changes.subscribe(() => this.updateColumns())
    );

    // Watch for column heading changes:
    this.columnComponents.forEach((comp: SkyGridColumnComponent) => {
      this.subscriptions.push(
        comp.headingModelChanges
          .subscribe((change: SkyGridColumnHeadingModelChange) => {
            this.updateColumnHeading(change);
          })
      );
      this.subscriptions.push(
        comp.descriptionModelChanges
          .subscribe((change: SkyGridColumnDescriptionModelChange) => {
            this.updateColumnDescription(change);
          })
      );
      this.subscriptions.push(
        comp.inlineHelpPopoverModelChanges
          .subscribe((change: SkyGridColumnInlineHelpPopoverModelChange) => {
            this.updateInlineHelpPopover(change);
          })
      );
    });
  }

  private arraysEqual(arrayA: any[], arrayB: any[]) {
    return arrayA.length === arrayB.length &&
      arrayA.every((value, index) =>
        value === arrayB[index]);
  }
}
