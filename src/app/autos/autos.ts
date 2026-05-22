import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosService } from '../services/autos.service';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autos.html',
  styleUrl: './autos.css',
})
export class Autos implements OnInit {
  marcas: any[] = [];
  modelos: any[] = [];
  marcaSeleccionada: any = null;
  cargandoMarcas = false;
  cargandoModelos = false;

  constructor(private autosService: AutosService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargandoMarcas = true;
    this.autosService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
         console.log('Primera marca:', data[0]);
        this.cargandoMarcas = false;
        this.cdr.detectChanges(); // <-- fuerza actualización de la vista
      },
      error: (err) => {
        console.error('Error al obtener marcas', err);
        this.cargandoMarcas = false;
        this.cdr.detectChanges();
      },
    });
  }

  seleccionarMarca(marca: any): void {
    this.marcaSeleccionada = marca;
    this.modelos = [];
    this.cargandoModelos = true;

    this.autosService.getModelos(marca.id).subscribe({
      next: (data) => {
        this.modelos = data;
        this.cargandoModelos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener modelos', err);
        this.cargandoModelos = false;
        this.cdr.detectChanges();
      },
    });
  }
}