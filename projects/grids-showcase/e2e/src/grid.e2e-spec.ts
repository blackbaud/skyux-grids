import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

import { element, browser, by } from 'protractor';

describe('Grid', () => {
  beforeEach(async () => {
    await SkyHostBrowser.get('visual/grid');
  });

  it('should match previous screenshot', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-lg',
    });
  });

  it('should match previous screenshot (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-xs',
    });
  });

  it('should match previous screenshot with descending sort indication', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-desc-lg',
    });
  });

  it('should match previous screenshot with descending sort indication (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-desc-xs',
    });
  });

  it('should match previous screenshot with ascending sort indication', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('th')).click();
    await element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-asc-lg',
    });
  });

  it('should match previous screenshot with ascending sort indication (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('th')).click();
    await element(by.css('th')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-sort-asc-xs',
    });
  });

  it('should match previous screenshot with highlighted text', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('#highlight-text-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-text-lg',
    });
  });

  it('should match previous screenshot with highlighted text (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('#highlight-text-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-text-xs',
    });
  });

  it('should match previous screenshot with a highlighted row', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('#highlight-row-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-row-lg',
    });
  });

  it('should match previous screenshot with a highlighted row (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid');
    await element(by.css('#highlight-row-button')).click();
    expect('#screenshot-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-highlighted-row-xs',
    });
  });

  it('should match previous screenshot with multiselect enabled', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-lg',
    });
  });

  it('should match previous screenshot with multiselect enabled (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-xs',
    });
  });

  it('should match previous screenshot with selected rows', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    let checkboxes = element.all(
      by.css('.sky-grid-multiselect-cell sky-checkbox')
    );
    await checkboxes.get(0).click();
    await checkboxes.get(2).click();
    await checkboxes.get(3).click();
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-selected-lg',
    });
  });

  it('should match previous screenshot with selected rows (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-multiselect');
    let checkboxes = element.all(
      by.css('.sky-grid-multiselect-cell sky-checkbox')
    );
    await checkboxes.get(0).click();
    await checkboxes.get(2).click();
    await checkboxes.get(3).click();
    expect('#screenshot-grid-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-multiselect-selected-xs',
    });
  });

  it('should match previous screenshot with inline help', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-inline-help');
    await browser.driver.sleep(2000); // Wait for async inline help to show.
    expect('#screenshot-grid-inline-help').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-inline-help-lg',
    });
  });

  it('should match previous screenshot with inline help (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-inline-help');
    await browser.driver.sleep(2000); // Wait for async inline help to show.
    expect('#screenshot-grid-inline-help').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-inline-help-xs',
    });
  });

  it('should match previous screenshot with scrollbars', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-scrollbars');
    expect('#screenshot-grid-scrollbars').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-scrollbars-lg',
    });
  });

  it('should match previous screenshot with scrollbars (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-scrollbars');
    expect('#screenshot-grid-scrollbars').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-scrollbars-xs',
    });
  });

  it('should match previous screenshot with row delete', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-row-delete');
    await element.all(by.css('.sky-dropdown-button')).get(0).click();
    await element.all(by.css('.sky-dropdown-item button')).get(0).click();
    expect('#screenshot-grid-row-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-row-delete-lg',
    });
  });

  it('should match previous screenshot with row delete (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-row-delete');
    await element.all(by.css('.sky-dropdown-button')).get(0).click();
    await element.all(by.css('.sky-dropdown-item button')).get(0).click();
    expect('#screenshot-grid-row-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-row-delete-xs',
    });
  });

  it('should match previous screenshot with column alignments', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-column-align');
    expect('#screenshot-grid-column-align').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-column-alignment-lg',
    });
  });

  it('should match previous screenshot with column alignments (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-column-align');
    expect('#screenshot-grid-column-align').toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-column-alignment-xs',
    });
  });

  it('should match previous screenshot with column alignments and inline help', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-grid-column-align-and-inline');
    expect(
      '#screenshot-grid-column-align-and-inline'
    ).toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-column-alignment-and-inline-lg',
    });
  });

  it('should match previous screenshot with column alignments and inline help (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-grid-column-align-and-inline');
    expect(
      '#screenshot-grid-column-align-and-inline'
    ).toMatchBaselineScreenshot(done, {
      screenshotName: 'grid-column-alignment-and-inline-xs',
    });
  });
});
