import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',                  // o cámbialo a 'app-crear-parte' si lo prefieres
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule                     // solo esto para que funcione ngModel
  ],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.css'
})
export class CrearParte {
  protected readonly title = signal('Crear nueva incidencia');

  incidencia = signal({
    fecha_apertura: '',
    fecha_cierre: '',
    nombre_cliente: '',
    direccion_edificio: '',
    ubicacion_concreta: '',
    contacto_incidencia: '',
    urgente: false,
    tecnico: '',
    descripcion_breve: '',
    descripcion_detalle: ''
  });

  onSubmit() {
    console.log('Incidencia enviada:', this.incidencia());
    alert('¡Incidencia creada correctamente!');
    // Aquí iría el envío real al backend
    // this.incidenciasService.crear(this.incidencia());
  }

  limpiar() {
    this.incidencia.set({
      fecha_apertura: '',
      fecha_cierre: '',
      nombre_cliente: '',
      direccion_edificio: '',
      ubicacion_concreta: '',
      contacto_incidencia: '',
      urgente: false,
      tecnico: '',
      descripcion_breve: '',
      descripcion_detalle: ''
    });
  }
}