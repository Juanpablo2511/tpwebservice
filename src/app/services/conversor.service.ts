import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  private apiKey = 'EPOE7oMSqnCSl3tKArrX9vonPFiOgKs2'; // reemplazá con tu key de apilayer
  private apiUrl = 'https://api.apilayer.com/currency_data';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ apikey: this.apiKey });
  }

  getMonedas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`, { headers: this.getHeaders() });
  }

  convertir(monto: number, desde: string, hasta: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/convert?to=${hasta}&from=${desde}&amount=${monto}`,
      { headers: this.getHeaders() }
    );
  }
}