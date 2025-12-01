import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParteService } from '../../../services/parte-service';

@Component({
  selector: 'app-root',                  // o cámbialo a 'app-crear-parte' si lo prefieres
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.css'
})
export class CrearParte {
  protected readonly title = signal('Crear nueva incidencia');
  private readonly parteService = new ParteService();

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
    descripcion_detalle: '',
    estado: 'Abierto' as 'Abierto',
  });

  onSubmit() {
    console.log('Incidencia enviada:', this.incidencia());
    alert('¡Incidencia creada correctamente!');
    this.parteService.createParte(this.incidencia());
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
      descripcion_detalle: '',
      estado: 'Abierto' as 'Abierto',
    });
  }
}