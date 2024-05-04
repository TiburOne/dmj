import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, take, lastValueFrom, BehaviorSubject, Observable, tap } from 'rxjs';
import { AppSetings } from './app-config.token';


@Injectable()

export class AppConfigService {
  public static Contador: number = 0;
  private appConfig$: BehaviorSubject<AppSetings | undefined> = new BehaviorSubject<AppSetings | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.loadAppConfig().subscribe();
    AppConfigService.Contador =+ 1;
  }

  private parseBoolean(value: string | boolean): boolean {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  }
   loadAppConfig(): Observable<AppSetings> {
     return this.http.get<AppSetings>('front.config.json').pipe(
      tap((data: AppSetings) => {
        this.appConfig$.next(data);
      })
    );
  }

  get Urls(): AppSetings | undefined {
    return this.appConfig$.getValue();
  }
  onDestroy(): void {
  }

}


export function appConfigServiceInitializer(appConfigService: AppConfigService) {
  return () => appConfigService.loadAppConfig();
}
