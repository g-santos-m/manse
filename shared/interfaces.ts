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
  estado: 'Abierto' | 'En curso' | 'Cerrado';
}