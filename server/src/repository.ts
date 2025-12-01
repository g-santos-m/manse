import { Parte } from '../../shared/interfaces.ts';
import db from './sqlite.ts';

export const getAll = (): Parte[] => {
   const query = db.prepare('SELECT * FROM parte');
   const partes: Parte[] = query.get() as Parte[];
   return partes;
}

export const create = (parte: Parte) => {
   const query = db.prepare('INSERT INTO parte (fecha_apertura, fecha_cierre, nombre_cliente, direccion_edificio, ubicacion_concreta, contacto_incidencia, urgente, tecnico, descripcion_breve, descripcion_detalle, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
   query.run(parte.fecha_apertura, parte.fecha_cierre, parte.nombre_cliente, parte.direccion_edificio, parte.ubicacion_concreta, parte.contacto_incidencia, parte.urgente, parte.tecnico, parte.descripcion_breve, parte.descripcion_detalle, parte.estado);
}

export const update = (parte: Parte) => {
   const query = db.prepare('UPDATE parte SET fecha_apertura = ?, fecha_cierre = ?, nombre_cliente = ?, direccion_edificio = ?, ubicacion_concreta = ?, contacto_incidencia = ?, urgente = ?, tecnico = ?, descripcion_breve = ?, descripcion_detalle = ?, estado = ? WHERE id = ?');
   query.run(parte.fecha_apertura, parte.fecha_cierre, parte.nombre_cliente, parte.direccion_edificio, parte.ubicacion_concreta, parte.contacto_incidencia, parte.urgente, parte.tecnico, parte.descripcion_breve, parte.descripcion_detalle, parte.estado, parte.id);
}

export const remove = (id: number) => {
   const query = db.prepare('DELETE FROM parte WHERE id = ?');
   query.run(id);
}