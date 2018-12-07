import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Grid', () => {
  it('should match previous screenshot', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-lg'
    });
  });

  it('should match previous screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-xs'
    });
  });

  it('should match previous screenshot with descending sort indication', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-desc-lg'
    });
  });

  it('should match previous screenshot with descending sort indication (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-desc-xs'
    });
  });

  it('should match previous screenshot with ascending sort indication', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-asc-lg'
    });
  });

  it('should match previous screenshot with ascending sort indication (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-asc-xs'
    });
  });

  it('should match previous screenshot with highlighted cells', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-lg'
    });
  });

  it('should match previous screenshot with highlighted cells (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-xs'
    });
  });

  it('should match previous screenshot with multiselect enabled', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-lg'
    });
  });

  it('should match previous screenshot with multiselect enabled (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-xs'
    });
  });

  it('should match previous screenshot with selected rows', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    let checkboxes = element.all(by.css('.sky-grid-multiselect-cell sky-checkbox'));
    checkboxes.get(0).click();
    checkboxes.get(2).click();
    checkboxes.get(3).click();
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-selected-lg'
    });
  });

  it('should match previous screenshot with selected rows (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    let checkboxes = element.all(by.css('.sky-grid-multiselect-cell sky-checkbox'));
    checkboxes.get(0).click();
    checkboxes.get(2).click();
    checkboxes.get(3).click();
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-selected-xs'
    });
  });
});
