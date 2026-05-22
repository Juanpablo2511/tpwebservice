import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutosService {
  private apiKey = 'fb3da027b8msh7e5dafcfe927422p1686c7jsncd33ee5e0b49'; 
  private apiHost = 'car-specs.p.rapidapi.com';

  private marcasCache: any[] | null = null;
  private modelosCache: { [marca: string]: any[] } = {};

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
    });
  }

 getMarcas(): Observable<any[]> {
  if (this.marcasCache) {
    return of(this.marcasCache);
  }
  return this.http
    .get<any[]>('https://car-specs.p.rapidapi.com/v2/cars/makes', {
      headers: this.getHeaders(),
    })
    .pipe(
      tap((data) => {
        console.log('Marcas recibidas:', data); // <-- agregá esto
        this.marcasCache = data;
      })
    );
}

getModelos(marcaId: string): Observable<any[]> {
  if (this.modelosCache[marcaId]) {
    return of(this.modelosCache[marcaId]);
  }
  return this.http
    .get<any[]>(`https://car-specs.p.rapidapi.com/v2/cars/makes/${marcaId}/models`, {
      headers: this.getHeaders(),
    })
    .pipe(
      tap((data) => {
        console.log('Modelos recibidos:', data);
        this.modelosCache[marcaId] = data;
      })
    );
}
}