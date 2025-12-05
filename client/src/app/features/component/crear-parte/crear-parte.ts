import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule} from '@angular/common'; // Asegúrate de importar DatePipe
import { ParteService } from '../../../services/parte-service';
import { Parte } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-parte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.css'
})
export class CrearParte implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private parteService = inject(ParteService);
  private idUrl = this.route.snapshot.paramMap.get('id');

  listaTecnicos = [
    { id: 'tecnico1', nombre: 'Juan Pérez' },
    { id: 'tecnico2', nombre: 'Ana Gómez' },
    { id: 'tecnico3', nombre: 'Carlos López' },
    { id: 'tecnico4', nombre: 'María Rodríguez' },
    { id: 'tecnico5', nombre: 'Ninguno' }
  ];

  title = signal('Crear Nueva Incidencia');
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
    if (this.idUrl) {
      this.esEdicion.set(true);
      this.title.set('Editar Incidencia #' + this.idUrl);
      this.cargarDatosEdicion(Number(this.idUrl));
    }
  }

  cargarDatosEdicion(id: number) {
    this.parteService.getPartes().subscribe({
      next: (res: any) => {
        let lista = Array.isArray(res) ? res : (res.data || []);
        const encontrado = lista.find((p: any) => p.id == id);
        
        if (encontrado) {
          // 1. Corregir booleano urgente
          encontrado.urgente = (encontrado.urgente == 1 || encontrado.urgente === true);
          
          // 2. Formatear fechas para datetime-local
          if(encontrado.fecha_apertura) {
             encontrado.fecha_apertura = this.formatDateForInput(encontrado.fecha_apertura);
          }
          if(encontrado.fecha_cierre) {
             encontrado.fecha_cierre = this.formatDateForInput(encontrado.fecha_cierre);
          }

          // 3. CORRECCIÓN TÉCNICO ROBUSTA
          // Normalizamos el valor que viene de la BD a String o cadena vacía
          let tecnicoNormalizado = '';
          if (encontrado.tecnico !== null && encontrado.tecnico !== undefined) {
             tecnicoNormalizado = String(encontrado.tecnico);
          }

          // Verificación de seguridad: ¿Existe este técnico en nuestra lista local?
          const existeEnLista = this.listaTecnicos.some(t => t.id === tecnicoNormalizado);
          
          if (!existeEnLista && tecnicoNormalizado !== '') {
            console.warn(`⚠️ ATENCIÓN: El técnico recibido de la BD ("${tecnicoNormalizado}") NO existe en la lista de opciones del select.`);
            console.log('Opciones disponibles:', this.listaTecnicos.map(t => t.id));
            // Opcional: Si quieres forzar que se vea "Ninguno" si el dato es incorrecto:
            // tecnicoNormalizado = ''; 
          }

          // Asignamos el valor normalizado
          encontrado.tecnico = tecnicoNormalizado;

          console.log('✅ Datos cargados en formulario:', encontrado);

          // Usamos spread operator (...) para romper la referencia y asegurar que la vista se actualice
          this.incidencia.set({ ...encontrado });
        }
      },
      error: (err) => console.error('Error cargando parte:', err)
    });
  }

  onSubmit() {
    console.log('Enviando...', this.incidencia());
    
    if (this.esEdicion()) {
      // ACTUALIZAR
      this.parteService.updateParte(this.incidencia()).subscribe({
        next: (res) => {
          alert('¡Incidencia actualizada correctamente!');
          this.router.navigate(['/listado-partes']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al guardar los cambios: ' + (err.message || err.statusText));
        }
      });
    } else {
      // CREAR
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

  cancelarAccion(): void {
    this.router.navigate(['/listado-partes']);
  }

  esEdicionMode(): boolean {
    return this.esEdicion();
  }

  borrarParte() {
    this.parteService.deleteParte(Number(this.idUrl)).subscribe({
      next: () => console.log("Parte borrado.")
    });
    this.router.navigate(['/listado-partes'])
  }

  // Genera fecha actual para nuevos partes
  private getFechaActualFormat(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  // Transforma fecha de la BD para el input (YYYY-MM-DDTHH:mm)
  private formatDateForInput(dateStr: string | Date): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    // Ajuste de zona horaria para que no se mueva la hora al convertir a string
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  }
}