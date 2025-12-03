import { Component, signal, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ParteService } from '../../../services/parte-service';
import { Parte } from '../../../interfaces/interfaces';

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
  private parteService = inject(ParteService);

  // --- NUEVO PARA MODAL ---
  @Input() idEntrada: number | null | undefined = null;
  @Output() cerrarModal = new EventEmitter<boolean>(); // Avisa al padre
  // ------------------------

  listaTecnicos = [
    { id: 'tecnico1', nombre: 'Juan Pérez' },
    { id: 'tecnico2', nombre: 'Ana Gómez' },
    { id: 'tecnico3', nombre: 'Carlos López' },
    { id: 'tecnico4', nombre: 'María Rodríguez' },
    { id: 'tecnico5', nombre: 'Ninguno' }
  ];

  title = signal('Crear nueva incidencia');
  esEdicion = signal(false);

  incidencia = signal<Parte>({
    fecha_apertura: this.getFechaActualFormat(), 
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

  ngOnInit(): void {
    // 1. PRIORIDAD: Si me pasan ID por Input (MODAL)
    if (this.idEntrada) {
      this.esEdicion.set(true);
      this.title.set('Editar incidencia #' + this.idEntrada);
      this.cargarDatosEdicion(this.idEntrada);
    } 
    // 2. Si no, miro la URL (PANTALLA COMPLETA)
    else {
      const idUrl = this.route.snapshot.paramMap.get('id');
      if (idUrl) {
        this.esEdicion.set(true);
        this.title.set('Editar incidencia #' + idUrl);
        this.cargarDatosEdicion(Number(idUrl));
      }
    }
  }

  cargarDatosEdicion(id: number) {
    this.parteService.getPartes().subscribe({
      next: (res: any) => {
        let lista = Array.isArray(res) ? res : (res.data || []);
        const encontrado = lista.find((p: any) => p.id == id);

        if (encontrado) {
          encontrado.urgente = (encontrado.urgente == 1 || encontrado.urgente === true);
          this.incidencia.set(encontrado);
        }
      },
      error: (err) => console.error('Error cargando parte:', err)
    });
  }

  onSubmit() {
    console.log('Enviando datos...', this.incidencia());

    if (this.esEdicion()) {
      this.parteService.updateParte(this.incidencia()).subscribe({
        next: (res) => {
          alert('¡Incidencia actualizada correctamente!');
          
          // LÓGICA MODAL: Si hay idEntrada, emitimos evento en vez de navegar
          if (this.idEntrada) {
            this.cerrarModal.emit(true); // true = guardado
          } else {
            this.router.navigate(['/listado-partes']);
          }
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al guardar los cambios.');
        }
      });

    } else {
      this.parteService.createParte(this.incidencia()).subscribe({
        next: (res) => {
          alert('¡Incidencia creada correctamente!');
          this.router.navigate(['/listado-partes']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Ocurrió un error al crear el parte.');
        }
      });
    }
  }

  limpiar(): void {
    // Si estamos en modal, limpiar debería actuar como cancelar
    if (this.idEntrada) {
       this.cerrarModal.emit(false); // Cancelar
       return;
    }

    this.incidencia.set({
      fecha_apertura: this.getFechaActualFormat(),
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

  private getFechaActualFormat(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
}