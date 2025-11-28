import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// === INTERFAZ DEL PARTE (ajústala si ya tienes una) ===
export interface Parte {
  id: number;
  fecha_apertura: string;        // ISO o formato que uses (ej: '2025-04-15')
  fecha_cierre?: string | null;
  nombre_cliente: string;
  direccion_edificio: string;
  ubicacion_concreta: string;
  contacto_incidencia?: string;
  urgente: boolean;
  tecnico?: string;
  descripcion_breve: string;
  descripcion_detalle?: string;
  estado: 'Abierto' | 'En curso' | 'Cerrado';
}

// === SERVICIO (crea uno si no lo tienes) ===
<<<<<<< HEAD:src/app/features/component/listado-partes/listado-partes.ts
//import { PartesService } from '../services/partes.service';
=======
// import { PartesService } from '../services/partes.service';
>>>>>>> 4bf1ace732b043220cfb7641ead8487d45ced7a9:client/src/app/features/component/listado-partes/listado-partes.ts

@Component({
  selector: 'app-listado-partes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './listado-partes.html',
  styleUrls: ['./listado-partes.css']
})
export class ListadoPartes {

  // Listas originales y filtradas
  partes: Parte[] = [];
  partesFiltrados: Parte[] = [];

  // Filtros
  filtroTexto: string = '';
  filtroUrgente: boolean | null = null;
  filtroEstado: string | null = null;

  constructor(
<<<<<<< HEAD:src/app/features/component/listado-partes/listado-partes.ts
    //private partesService: PartesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.cargarPartes();
  }

  /** Carga todos los partes desde el servicio */
  /* private cargarPartes(): void {
=======
    // private partesService: PartesService,
    private router: Router
  ) {}

/*   ngOnInit(): void {
    this.cargarPartes();
  } */

  /** Carga todos los partes desde el servicio */
/*   private cargarPartes(): void {
>>>>>>> 4bf1ace732b043220cfb7641ead8487d45ced7a9:client/src/app/features/component/listado-partes/listado-partes.ts
    this.partesService.getAll().subscribe({
      next: (data: Parte[]) => {
        this.partes = data;
        this.aplicarFiltros();   // Primera aplicación de filtros (todos visibles)
      },
      error: (err) => {
        console.error('Error al cargar los partes', err);
        alert('No se pudieron cargar los partes. Revisa la consola.');
      }
    });
  } */

  /** Aplica todos los filtros activos */
  aplicarFiltros(): void {
    let resultado = [...this.partes];

    // Filtro de texto (por nº parte, cliente o dirección)
    if (this.filtroTexto.trim()) {
      const texto = this.filtroTexto.toLowerCase().trim();
      resultado = resultado.filter(p =>
        p.id.toString().includes(texto) ||
        (p.nombre_cliente?.toLowerCase().includes(texto) ?? false) ||
        (p.direccion_edificio?.toLowerCase().includes(texto) ?? false)
      );
    }

    // Filtro por urgencia
    if (this.filtroUrgente !== null) {
      resultado = resultado.filter(p => p.urgente === this.filtroUrgente);
    }

    // Filtro por estado
    if (this.filtroEstado) {
      resultado = resultado.filter(p => p.estado === this.filtroEstado);
    }

    this.partesFiltrados = resultado;
  }

  /** Navegar al detalle del parte */
  verDetalle(id: number): void {
    this.router.navigate(['/partes', id]);
  }

  /** Limpiar todos los filtros */
  limpiarFiltros(): void {
    this.filtroTexto = '';
    this.filtroUrgente = null;
    this.filtroEstado = null;
    this.aplicarFiltros();
  }
}