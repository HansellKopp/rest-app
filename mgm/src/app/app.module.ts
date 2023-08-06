import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared/shared.module';
import { PrimengModule } from './primeng/primeng.module';

// register locals
import localeEsVe from "@angular/common/locales/es-VE";
//import localeDeDeu from "@angular/common/locales/de-AT";
import { registerLocaleData } from "@angular/common";
import { MessageService } from 'primeng/api';
import { GlobalErrorHandler } from './shared/utils/global-error-handler';

registerLocaleData(localeEsVe);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RippleModule,
    SharedModule,
    PrimengModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-VE'},
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
