import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversorService } from '../services/conversor.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor.html',
  styleUrl: './conversor.css',
})
export class ConversorComponent implements OnInit {
  monedas: { code: string; name: string }[] = [];
  monto: number = 1;
  monedaDesde: string = 'USD';
  monedaHasta: string = 'ARS';
  resultado: number | null = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private conversorService: ConversorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.conversorService.getMonedas().subscribe({
      next: (data: any) => {
        this.monedas = Object.entries(data.currencies).map(([code, name]) => ({
          code,
          name: `${code} - ${name}`,
        }));
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar monedas', err);
        this.error = 'No se pudieron cargar las monedas.';
        this.cdr.detectChanges();
      },
    });
  }

  convertir(): void {
    if (!this.monto || !this.monedaDesde || !this.monedaHasta) return;
    this.cargando = true;
    this.resultado = null;
    this.error = '';

    this.conversorService.convertir(this.monto, this.monedaDesde, this.monedaHasta).subscribe({
      next: (data: any) => {
        this.resultado = data.result;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al convertir', err);
        this.error = 'No se pudo realizar la conversión.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}