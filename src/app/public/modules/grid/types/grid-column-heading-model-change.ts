import { TemplateRef } from '@angular/core';

export interface SkyGridColumnHeadingModelChange {
  value?: string;
  id?: string;
  field?: string;
  inLineHelpPopover?: TemplateRef<any>;
}
