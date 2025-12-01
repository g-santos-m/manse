// crear-parte.component.ts
import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

type EstadoParte = 'Abierto' | 'Cerrado';

interface Parte {
  id?: string;
  fecha_apertura: string;
  fecha_cierre: string | null;
  nombre_cliente: string;
  direccion_edificio: string;
  ubicacion_concreta: string;
  contacto_incidencia: string;
  urgente: boolean;
  tecnico: string;
  descripcion_breve: string;
  descripcion_detalle: string;
  estado: EstadoParte;
}

@Component({
  selector: 'app-crear-parte',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.css'
})
export class CrearParte implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  title = signal('Crear nueva incidencia');
  incidencia = signal<Parte>({
    fecha_apertura: '',
    fecha_cierre: null,
    nombre_cliente: '',
    direccion_edificio: '',
    ubicacion_concreta: '',
    contacto_incidencia: '',
    urgente: false,
    tecnico: '',
    descripcion_breve: '',
    descripcion_detalle: '',
    estado: 'Abierto'
  });
  esEdicion = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.esEdicion.set(true);
      this.title.set('Editar incidencia');

      // CAMBIO 1: Intentamos leer los datos que vienen del detalle
      const datosDesdeDetalle = history.state.parte as Parte | undefined;

      if (datosDesdeDetalle) {
        this.incidencia.set(datosDesdeDetalle);
      } else {
        // CAMBIO 2: Fallback (solo si no hay datos en history)
        this.incidencia.set({
          id,
          fecha_apertura: '2025-11-17T10:30',
          fecha_cierre: null,
          nombre_cliente: 'Comunidad de Propietarios Sol y Mar',
          direccion_edificio: 'Calle del Mar, 45, 29640 Fuengirola, Málaga',
          ubicacion_concreta: 'Portal 2, escalera B, rellano 3º',
          contacto_incidencia: 'Laura Sánchez – 654 321 987',
          urgente: true,
          tecnico: 'tecnico1',
          descripcion_breve: 'Puerta de garaje no cierra completamente',
          descripcion_detalle: `La puerta comunitaria del garaje se queda a medio cerrar,
emite un ruido fuerte y a veces se queda atascada.
Los vecinos reportan que lleva pasando varios días y temen
que quede abierta por la noche.`,
          estado: 'Abierto'
        });
      }
    } else {
      // Creación nueva
      const ahora = new Date().toISOString().slice(0, 16);
      this.incidencia.update(p => ({ ...p, fecha_apertura: ahora }));
    }
  }

  onSubmit(): void {
    console.log(
      this.esEdicion() ? 'Incidencia actualizada:' : 'Nueva incidencia creada:',
      this.incidencia()
    );
    alert(
      this.esEdicion()
        ? '¡Incidencia actualizada correctamente!'
        : '¡Incidencia creada correctamente!'
    );
    this.router.navigate(['/listado-partes']);
  }

  limpiar(): void {
    const fechaActual = this.esEdicion() ? this.incidencia().fecha_apertura : new Date().toISOString().slice(0, 16);
    this.incidencia.set({
      fecha_apertura: fechaActual,
      fecha_cierre: null,
      nombre_cliente: '',
      direccion_edificio: '',
      ubicacion_concreta: '',
      contacto_incidencia: '',
      urgente: false,
      tecnico: '',
      descripcion_breve: '',
      descripcion_detalle: '',
      estado: 'Abierto'
    });
  }

  esEdicionMode(): boolean {
    return this.esEdicion();
  }
}