import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';

  private headers = new HttpHeaders({
    'x-rapidapi-key': 'eb9d8b645bmshe92c11b15550175p14d007jsn4a0c3daa4cb7',
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
  });

  getTopMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  esBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}