import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { parse } from 'yaml';

class TranslateYamlHttpLoader implements TranslateLoader {
  constructor(
    private httpClient: HttpClient,
    public path: string = '/assets/i18n/',
  ) {}

  public getTranslation(lang: string): Observable<unknown> {
    return this.httpClient.get(`${this.path}${lang}.yaml`, { responseType: 'text' }).pipe(map((data) => parse(data)));
  }
}

const config: TranslateModuleConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: (httpClient: HttpClient) => new TranslateYamlHttpLoader(httpClient),
    deps: [HttpClient],
  },
};

export function provideTranslation() {
  return importProvidersFrom([HttpClientModule, TranslateModule.forRoot(config)]);
}