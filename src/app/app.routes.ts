import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';

export const routes: Routes = [
     { path: 'peliculas', component: PeliculasComponent },
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' }
];

