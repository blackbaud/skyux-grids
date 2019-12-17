import {
  TemplateRef
} from '@angular/core';

import {
  SkyPopoverComponent
} from '@skyux/popovers';

export interface SkyGridColumnInlineHelpPopoverModelChange {
  value?: TemplateRef<SkyPopoverComponent>;
  id?: string;
  field?: string;
}
