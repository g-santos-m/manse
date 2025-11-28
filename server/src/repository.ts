import { Parte } from '../../shared/interfaces.ts';
import db from './sqlite.ts';

export const getAll = (): Parte[] => {
   const query = db.prepare('SELECT * FROM partes');
   const partes: Parte[] = query.get() as Parte[];
   return partes;
}

export const create = (parte: Parte) => {
   const query = db.prepare('');
}