import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextoAudioService } from '../services/texto-audio.service';

@Component({
  selector: 'app-texto-audio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './texto-audio.html',
  styleUrl: './texto-audio.css',
})
export class TextoAudioComponent {
  texto: string = '';
  vozSeleccionada: string = 'alloy';
  audioUrl: string | null = null;
  cargando: boolean = false;
  error: string = '';

  voces = [
    { value: 'alloy', label: 'Alloy (Neutro)' },
    { value: 'echo', label: 'Echo (Masculino)' },
    { value: 'fable', label: 'Fable (Británico)' },
    { value: 'onyx', label: 'Onyx (Grave)' },
    { value: 'nova', label: 'Nova (Femenino)' },
    { value: 'shimmer', label: 'Shimmer (Suave)' },
  ];

  constructor(
    private textoAudioService: TextoAudioService,
    private cdr: ChangeDetectorRef
  ) {}

  convertir(): void {
    if (!this.texto.trim()) return;
    this.cargando = true;
    this.audioUrl = null;
    this.error = '';

    this.textoAudioService.convertirTextoAudio(this.texto, this.vozSeleccionada).subscribe({
      next: (blob: Blob) => {
        this.audioUrl = URL.createObjectURL(blob);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'No se pudo convertir el texto.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}