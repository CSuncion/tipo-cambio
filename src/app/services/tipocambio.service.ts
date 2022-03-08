import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TipoCambio } from '../models/tipocambio';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TipocambioService {
  private _url: string = `${environment.host}tipocambio`

  constructor(private http: HttpClient) { }

  postTipoCambio(tipo: TipoCambio): Observable<TipoCambio[]> {
    return this.http
      .post(this._url, tipo)
      .pipe(
        map((res: any) => res as TipoCambio[]),
      );
  }
  getTipoCambio(): Observable<TipoCambio[]> {
    return this.http
      .get<TipoCambio>(this._url)
      .pipe(
        map((res: any) => res as TipoCambio[]),
      );
  }

  // private handleError(error: any) {
  //   if (error.status === 400) {
  //     return Observable.throwError(error._body);
  //   } else if (error.status == 401) {
  //   }
  //   return Observable.throwError(error.error);
  // }
}
