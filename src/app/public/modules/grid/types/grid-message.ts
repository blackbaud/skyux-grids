import {
  SkyGridMessageType
} from './grid-message-type';

export interface SkyGridMessage {

  /**
   * Sets the message to one of the following `SkyGridMessage` types:
   * `SkyGridMessageType.ClearAll` — Clears the multiselect checkboxes for all rows in the grid
   * `SkyGridMessageType.SelectAll` — Selects the multiselect checkboxes for all rows in the grid.
   */
  type: SkyGridMessageType;
  data?: {
    abortDeleteRow?: {
      id: string;
    },
    promptDeleteRow?: {
      id: string;
    }
  };
}
