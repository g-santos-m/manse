import Database from 'better-sqlite3';

const db = new Database('./src/database.sqlite');

db.prepare(`
  CREATE TABLE IF NOT EXISTS parte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_apertura DATE NOT NULL,
    fecha_cierre DATE NULL,
    nombre_cliente TEXT NOT NULL,
    direccion_edificio TEXT NOT NULL,
    ubicacion_concreta TEXT NOT NULL,
    contacto_incidencia TEXT NULL,
    urgente BOOLEAN NOT NULL,
    tecnico TEXT NULL,
    descripcion_breve TEXT NOT NULL,
    descripcion_detalle TEXT NULL,
    estado TEXT NOT NULL,
  )
`).run();

export default db;