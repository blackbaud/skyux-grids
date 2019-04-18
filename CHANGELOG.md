# 3.1.4 (2019-04-18)

- Fixed grid module to properly provide `SkyAppWindowRef`. [#52](https://github.com/blackbaud/skyux-grids/pull/52)

# 3.1.3 (2019-03-07)

- Fixed grid component to no longer emit extra `selectedColumnIdsChange` events. [#36](https://github.com/blackbaud/skyux-grids/pull/36)

# 3.1.2 (2019-02-28)

- Fixed grid component to load properly when using RxJS version 6 or above. [#47](https://github.com/blackbaud/skyux-grids/pull/47)

# 3.1.1 (2019-02-22)

- Fixed grid component to no longer truncate text when table cell is stretched wider than its original width. [#38](https://github.com/blackbaud/skyux-grids/pull/38)

# 3.1.0 (2019-01-16)

- Added UI Config Service hooks to grid component. [#31](https://github.com/blackbaud/skyux-grids/pull/31)

# 3.0.0 (2019-01-11)

- Major version release.

# 3.0.0-rc.6 (2019-01-04)

- Added `rowHighlightedId` input to grid component. [#28](https://github.com/blackbaud/skyux-grids/pull/28)

# 3.0.0-rc.5 (2018-12-21)

- Fixed grid component to only listen to `mousemove` and `mouseup` events while resizing columns. [#25](https://github.com/blackbaud/skyux-grids/pull/25)

# 3.0.0-rc.4 (2018-12-13)

- Fixed grid component to properly import polyfills. [#23](https://github.com/blackbaud/skyux-grids/pull/23)

# 3.0.0-rc.3 (2018-12-12)

- Added multiselect feature to display column of checkboxes on grid component. [#6](https://github.com/blackbaud/skyux-grids/pull/6)

# 3.0.0-rc.2 (2018-11-20)

 - Added support for `@skyux/list-builder-common@3.0.0-rc.1`. [#14](https://github.com/blackbaud/skyux-grids/pull/14)
 - Fixed grid component's column resize drag handle to not inadvertently trigger column sort. [#17](https://github.com/blackbaud/skyux-grids/pull/17)
 - Fixed grid cells to properly handle text overflow when column widths are fixed. [#13](https://github.com/blackbaud/skyux-grids/pull/13)

# 3.0.0-rc.1 (2018-11-12)

- Added async column descriptions. [#6](https://github.com/blackbaud/skyux-grids/pull/6)
- Fixed column resizing to recalculate table width when columns are hidden or shown. [#8](https://github.com/blackbaud/skyux-grids/pull/8)

# 3.0.0-rc.0 (2018-10-23)

- Initial release candidate.

# 3.0.0-alpha.1 (2018-10-22)

- Fixed column headers to no longer shift in size when sorting. [#4](https://github.com/blackbaud/skyux-grids/pull/4)

# 3.0.0-alpha.0 (2018-10-10)

- Initial alpha release.
