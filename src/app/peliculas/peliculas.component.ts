import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas: any[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(
    private peliculasService: PeliculasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peliculasService.getTopMovies().subscribe({
      next: (data: any) => {
        this.peliculas = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.error = 'No se pudo cargar.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getBadgeClass(genero: string): string {
    const mapa: { [key: string]: string } = {
      'Drama': 'badge-drama',
      'Crime': 'badge-crime',
      'Action': 'badge-action',
      'Sci-Fi': 'badge-scifi',
      'Fantasy': 'badge-fantasy',
      'Thriller': 'badge-thriller',
      'Comedy': 'badge-comedy',
      'Horror': 'badge-horror',
      'Animation': 'badge-animation',
      'Adventure': 'badge-adventure',
    };
    return mapa[genero] || 'badge-default';
  }
}