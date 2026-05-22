import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextoAudioService {
  private apiKey = 'TU_API_KEY_RAPIDAPI'; // la misma key que usaste para autos
  private apiHost = 'open-ai-text-to-speech1.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  convertirTextoAudio(texto: string, idioma: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'tts-1',
      input: texto,
      voice: idioma,
    };

    return this.http.post(
      'https://open-ai-text-to-speech1.p.rapidapi.com/',
      body,
      { headers, responseType: 'blob' }
    );
  }
}