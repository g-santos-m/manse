import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ParteService } from '../../../services/parte-service';
import { Parte } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-listado-partes',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './listado-partes.html',
  styleUrl: './listado-partes.css'
})
export class ListadoPartes implements OnInit {

  listaTecnicos = [
    { id: 'tecnico1', nombre: 'Juan Pérez' },
    { id: 'tecnico2', nombre: 'Ana Gómez' },
    { id: 'tecnico3', nombre: 'Carlos López' },
    { id: 'tecnico4', nombre: 'María Rodríguez' },
    { id: 'tecnico5', nombre: 'Ninguno' }
  ];

  private parteService = inject(ParteService);
  private router = inject(Router);

  parteTemp: Parte[] = []; 
  partesFiltrados = signal<Parte[]>([]);

  // Variables para filtros
  filtroTexto = '';
  filtroUrgente: boolean | null = null;
  filtroEstado: 'Abierto' | 'Cerrado' | null = null;
  filtroFechaDesde: string | null = null;
  filtroFechaHasta: string | null = null;
  filtroTecnico: string | null = null;

  // --- CAMBIO 1: Configuración por defecto al iniciar ---
  // Antes estaba vacío (''), ahora ponemos 'id' y 'desc'
  columnaOrden: string = 'id';
  direccionOrden: 'asc' | 'desc' = 'desc';

  ngOnInit(): void {
    this.cargarPartes();
  }

  cargarPartes() {
    this.parteService.getPartes().subscribe({
      next: (res) => {
        if(res.success) {
          // Lógica de auto-cierre si tiene fecha
          this.parteTemp = res.data.map(parte => {
            if (parte.fecha_cierre) {
              return { ...parte, estado: 'Cerrado' };
            }
            return parte;
          });
          
          // Al llamar a esto, ya usará 'id' y 'desc' definidos arriba
          this.aplicarFiltros(); 
        }
      },
      error: (err) => console.error('Error cargando partes', err)
    });
  }

  aplicarFiltros(): void {
    const texto = this.filtroTexto.toLowerCase().trim();
    const fechaDesde = this.filtroFechaDesde ? new Date(this.filtroFechaDesde) : null;
    const fechaHasta = this.filtroFechaHasta ? new Date(this.filtroFechaHasta) : null;
    if (fechaHasta) fechaHasta.setHours(23, 59, 59, 999);

    // 1. FILTRADO
    let resultado = this.parteTemp.filter(p => {
      const coincideTexto = !texto || 
        p.nombre_cliente?.toLowerCase().includes(texto) ||
        p.direccion_edificio?.toLowerCase().includes(texto) ||
        p.descripcion_breve?.toLowerCase().includes(texto);

      const esUrgenteReal = !!p.urgente; 
      const coincideUrgente = this.filtroUrgente === null || esUrgenteReal === this.filtroUrgente;
      const coincideEstado = this.filtroEstado === null || p.estado === this.filtroEstado;
      const coincideTecnico = this.filtroTecnico === null || p.tecnico === this.filtroTecnico;

      const fechaParte = p.fecha_apertura ? new Date(p.fecha_apertura) : null;
      let coincideFecha = true;
      if (fechaParte) {
         if (fechaDesde && fechaParte < fechaDesde) coincideFecha = false;
         if (fechaHasta && fechaParte > fechaHasta) coincideFecha = false;
      }

      return coincideTexto && coincideUrgente && coincideEstado && coincideTecnico && coincideFecha;
    });

    // 2. ORDENACIÓN
    if (this.columnaOrden) {
      resultado.sort((a: any, b: any) => {
        let valorA = a[this.columnaOrden];
        let valorB = b[this.columnaOrden];

        if (valorA == null) valorA = '';
        if (valorB == null) valorB = '';

        // Si son números (como el ID suele ser), esto funciona bien.
        // Si son strings, los pasamos a minúsculas.
        if (typeof valorA === 'string') valorA = valorA.toLowerCase();
        if (typeof valorB === 'string') valorB = valorB.toLowerCase();

        if (valorA < valorB) return this.direccionOrden === 'asc' ? -1 : 1;
        if (valorA > valorB) return this.direccionOrden === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.partesFiltrados.set(resultado);
  }

  ordenar(columna: string) {
    if (this.columnaOrden === columna) {
      this.direccionOrden = this.direccionOrden === 'asc' ? 'desc' : 'asc';
    } else {
      this.columnaOrden = columna;
      this.direccionOrden = 'asc';
    }
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.filtroTexto = '';
    this.filtroUrgente = null;
    this.filtroEstado = null;
    this.filtroFechaDesde = null;
    this.filtroFechaHasta = null;
    this.filtroTecnico = null;
    
    // --- CAMBIO 2: Resetear al orden por defecto ---
    this.columnaOrden = 'id';
    this.direccionOrden = 'desc';
    
    this.aplicarFiltros();
  }

  verDetalle(id?: number): void {
    if (id) this.router.navigate(['/partes', id]);
  }

  getNombreTecnico(codigo: string | null | undefined): string {
    if (!codigo) return '—';
    const tecnico = this.listaTecnicos.find(t => t.id === codigo);
    return tecnico ? tecnico.nombre : codigo;
  }
}