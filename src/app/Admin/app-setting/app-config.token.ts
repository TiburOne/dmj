import { InjectionToken } from '@angular/core';

export interface AppSetings {
  apiUrl : string;
  // loginUrl: string;
  // HabilitaPanelHCE: boolean;
  // HabilitaPanelTurnos: boolean;
}

export const API_URLS = new InjectionToken<AppSetings>('apiUrls');
