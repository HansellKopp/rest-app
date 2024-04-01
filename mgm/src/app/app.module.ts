import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared/shared.module';
import { PrimengModule } from './primeng/primeng.module';

// register locals
import localeEsVe from "@angular/common/locales/es-VE";
import { registerLocaleData } from "@angular/common";
import { MessageService } from 'primeng/api';
import { GlobalErrorHandler } from './shared/utils/global-error-handler';
import { AuthInterceptor } from './shared/utils/auth.interceptor';
import { TotestComponent } from './shared/totest/totest.component';
import { httpInterceptorProviders } from './shared/utils/http-request.interceptor';
import { provideTranslation } from './providers/translation';

registerLocaleData(localeEsVe);

@NgModule({
  declarations: [
    AppComponent,
    TotestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RippleModule,
    SharedModule,
    PrimengModule,
    HttpClientModule,
  ],
  providers: [
    provideTranslation(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    httpInterceptorProviders,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
