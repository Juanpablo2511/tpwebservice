import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { Autos } from './autos/autos'; 
import { ConversorComponent } from './conversor/conversor';
import { TextoAudioComponent } from './texto-audio/texto-audio';

export const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'autos', component: Autos },
  { path: 'conversor', component: ConversorComponent },
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' },
  { path: 'texto-audio', component: TextoAudioComponent }
];