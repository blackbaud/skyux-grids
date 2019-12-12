import { TemplateRef } from '@angular/core';

export interface SkyGridColumnDescriptionModelChange {
  value?: string;
  id?: string;
  field?: string;
  inLineHelpPopover?: TemplateRef<any>;
}
