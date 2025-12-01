// crear-parte.component.ts
import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParteService } from '../../../services/parte-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Parte } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-parte',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.css'
})
export class CrearParte implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly parteService = new ParteService();

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

  onSubmit() {
    console.log('Incidencia enviada:', this.incidencia());
    alert('¡Incidencia creada correctamente!');
    this.parteService.createParte(this.incidencia()).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
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