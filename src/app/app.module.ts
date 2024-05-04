import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './common_modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpLoadingInterceptor } from './common_modules/http-loading.interceptor';
import { API_URLS } from './Admin/app-setting/app-config.token';
import { AppConfigService, appConfigServiceInitializer } from './Admin/app-setting/app-config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    AppConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: appConfigServiceInitializer,
			deps: [AppConfigService],
			multi: true,
		},
    {
			provide: API_URLS,
			useFactory: (appConfigService: AppConfigService) => appConfigService.Urls,
			deps: [AppConfigService],
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
