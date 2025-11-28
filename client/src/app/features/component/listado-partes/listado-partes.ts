import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';

export interface Parte {
  id: number;
  fecha_apertura: string;
  fecha_cierre?: string | null;
  nombre_cliente: string;
  direccion_edificio: string;
  ubicacion_concreta: string;
  contacto_incidencia?: string;
  urgente: boolean;
  tecnico?: string;
  descripcion_breve: string;
  descripcion_detalle?: string;
  estado: 'Abierto' | 'Cerrado';
}

@Component({
  selector: 'app-listado-partes',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './listado-partes.html',
  styleUrl: './listado-partes.css'
})
export class ListadoPartes {
  // Tus partes directamente aquí (¡ya funciona!)
  partes: Parte[] = [
    {
      id: 101,
      fecha_apertura: '2025-11-25',
      nombre_cliente: 'Ana García',
      direccion_edificio: 'Calle Mayor 45, Madrid',
      ubicacion_concreta: 'Portal 2, 3ºB',
      urgente: true,
      estado: 'Abierto',
      descripcion_breve: 'Ruido fuerte en caldera'
    },
    {
      id: 102,
      fecha_apertura: '2025-11-20',
      fecha_cierre: '2025-11-22',
      nombre_cliente: 'Comunidad Sol y Luna',
      direccion_edificio: 'Av. del Sol 12, Valencia',
      ubicacion_concreta: 'Ascensor 1',
      urgente: false,
      tecnico: 'Pedro Martínez',
      estado: 'Cerrado',
      descripcion_breve: 'Ascensor parado entre plantas'
    },
    {
      id: 103,
      fecha_apertura: '2025-11-27',
      nombre_cliente: 'Carlos Ruiz',
      direccion_edificio: 'Paseo Marítimo 8, Málaga',
      ubicacion_concreta: 'Aire acondicionado salón',
      urgente: true,
      estado: 'Abierto',
      descripcion_breve: 'No enfría'
    },
    {
      id: 104,
      fecha_apertura: '2025-11-15',
      nombre_cliente: 'Hotel Paraíso',
      direccion_edificio: 'Playa del Inglés 1, Gran Canaria',
      ubicacion_concreta: 'Piscina',
      urgente: false,
      estado: 'Abierto',
      descripcion_breve: 'Filtro piscina atascado'
    }
  ];

  partesFiltrados: Parte[] = [];

  // Filtros
  filtroTexto: string = '';
  filtroUrgente: boolean | null = null;
  filtroEstado: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.partesFiltrados = [...this.partes]; // Muestra todos al cargar
  }

  aplicarFiltros(): void {
    let resultado = [...this.partes];

    if (this.filtroTexto.trim() !== '') {
  const texto = this.filtroTexto.toLowerCase().trim();
  resultado = resultado.filter(p =>
    p.id.toString().includes(texto) ||
    p.nombre_cliente.toLowerCase().includes(texto) ||
    p.direccion_edificio.toLowerCase().includes(texto) ||
    p.descripcion_breve.toLowerCase().includes(texto)
  );
}


    (this.filtroUrgente !== null) && (
      resultado = resultado.filter(p => p.urgente === this.filtroUrgente)
    );

    (this.filtroEstado) && (
      resultado = resultado.filter(p => p.estado === this.filtroEstado)
    );

    this.partesFiltrados = resultado;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/partes', id]);
  }

  limpiarFiltros(): void {
    this.filtroTexto = '';
    this.filtroUrgente = null;
    this.filtroEstado = null;
    this.partesFiltrados = [...this.partes];
  }
}