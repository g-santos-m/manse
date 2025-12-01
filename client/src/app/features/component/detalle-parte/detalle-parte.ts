// detalle-parte.component.ts
import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';   // ← Añadido

@Component({
  selector: 'app-detalle-parte',
  standalone: true,
  imports: [
    CommonModule,     // ← Necesario para *ngIf, [class.xxx], etc.
    DatePipe          // ← Necesario para usar | date en el HTML
  ],
  templateUrl: './detalle-parte.html',
  styleUrl: './detalle-parte.css'
})
export class DetalleParte implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly title = signal('Detalle del Parte');

  parte = signal({
    id: '',
    fecha_apertura: '',
    fecha_cierre: null as string | null,
    nombre_cliente: '',
    direccion_edificio: '',
    ubicacion_concreta: '',
    contacto_incidencia: '',
    urgente: false,
    tecnico: '',
    descripcion_breve: '',
    descripcion_detalle: '',
    estado: 'Abierto' as 'Abierto' | 'Cerrado'
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '123';

    // Datos de ejemplo (simulando que vienen del backend)
    this.parte.set({
      id,
      fecha_apertura: '2025-11-17T10:30:00',
      fecha_cierre: null,
      nombre_cliente: 'Comunidad de Propietarios Sol y Mar',
      direccion_edificio: 'Calle del Mar, 45, 29640 Fuengirola, Málaga',
      ubicacion_concreta: 'Portal 2, escalera B, rellano 3º',
      contacto_incidencia: 'Laura Sánchez – 654 321 987',
      urgente: true,
      tecnico: 'Juan Pérez',
      descripcion_breve: 'Puerta de garaje no cierra completamente',
      descripcion_detalle: `La puerta comunitaria del garaje se queda a medio cerrar,
      emite un ruido fuerte y a veces se queda atascada.
      Los vecinos reportan que lleva pasando varios días y temen
      que quede abierta por la noche.`,
      estado: 'Abierto'
    });
  }

  volver() {
    this.router.navigate(['/listado-partes']);
  }

  editar() {
  this.router.navigate(['/crear-parte', this.parte().id], {
    state: { parte: this.parte() }   // ← ¡¡ESTO ES LA CLAVE!!
  });
}
}