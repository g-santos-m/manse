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

  // 1. Inyección correcta del servicio (no usar new)
  private parteService = inject(ParteService);
  private router = inject(Router);

  // Usamos una señal para los datos o un array simple. 
  // Para simplificar y que coincida con tu HTML actual usaremos parteTemp como array principal
  parteTemp: Parte[] = []; 
  
  // Variables para filtros (opcionales por ahora)
  filtroTexto = '';
  filtroUrgente: boolean | null = null;
  filtroEstado: 'Abierto' | 'Cerrado' | null = null;
  partesFiltrados = signal<Parte[]>([]); // Si usas filtrado más adelante

  ngOnInit(): void {
    this.cargarPartes();
  }

  cargarPartes() {
    this.parteService.getPartes().subscribe({
      next: (res) => {
        if(res.success) {
          this.parteTemp = res.data;
          this.partesFiltrados.set(res.data); // Sincronizamos para cuando actives filtros
        }
      },
      error: (err) => console.error('Error cargando partes', err)
    });
  }

  // Navegación al detalle
  verDetalle(id?: number): void {
    if (id) {
      this.router.navigate(['/partes', id]);
    }
  }

  // Funciones de utilidad para el HTML
  limpiarFiltros(): void {
    this.filtroTexto = '';
    this.filtroUrgente = null;
    this.filtroEstado = null;
    // Aquí llamarías a tu lógica de filtros si la descomentas
  }

  getNombreTecnico(codigo: string | null | undefined): string {
    if (!codigo) return '—';
    const tecnico = this.listaTecnicos.find(t => t.id === codigo);
    return tecnico ? tecnico.nombre : codigo;
  }

}