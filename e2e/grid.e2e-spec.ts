import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  browser,
  by,
  element
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

  it('should match previous screenshot with highlighted text', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-text-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-text-lg'
    });
  });

  it('should match previous screenshot with highlighted text (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-text-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-text-xs'
    });
  });

  it('should match previous screenshot with a highlighted row', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-row-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-row-lg'
    });
  });

  it('should match previous screenshot with a highlighted row (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-row-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-row-xs'
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

  it('should match previous screenshot with inline help', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid-inline-help');
    browser.driver.sleep(2000); // Wait for async inline help to show.
    expect('#screenshot-grid-inline-help').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-inline-help-lg'
    });
  });

  it('should match previous screenshot with inline help (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid-inline-help');
    browser.driver.sleep(2000); // Wait for async inline help to show.
    expect('#screenshot-grid-inline-help').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-inline-help-xs'
    });
  });

  it('should match previous screenshot when headers are frozen on scroll', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid-scrollable');
    browser.driver.executeScript(`document.getElementById('screenshot-grid-scrollable').scrollTop = 50;`);
    expect('#screenshot-grid-scrollable').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-frozen-headers'
    });
  });
});
