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
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot with descending sort indication', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot with descending sort indication (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot with ascending sort indication', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot with ascending sort indication (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('th')).click();
    element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot with highlighted cells', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot with highlighted cells (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/grid');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-grid');
    element(by.css('#highlight-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done);
  });
});
