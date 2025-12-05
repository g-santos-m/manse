import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearParte } from './features/component/crear-parte/crear-parte';
import { DetalleParte } from './features/component/detalle-parte/detalle-parte';
import { ListadoPartes } from './features/component/listado-partes/listado-partes';

export const routes: Routes = [
  // Ruta para CREAR (sin ID)
  { path: 'crear-parte', component: CrearParte },
  
  // Ruta para EDITAR (con ID obligatorio) -> Reutiliza CrearParte
  { path: 'editar-parte/:id', component: CrearParte },
  
  // Ruta del LISTADO
  { path: 'listado-partes', component: ListadoPartes },

  // Ruta del DETALLE
  // Corrección: Usamos 'partes/:id' para que sea limpio
  { path: 'partes/:id', component: DetalleParte },

  // Redirección por defecto
  { path: '', redirectTo: '/listado-partes', pathMatch: 'full' },
  
  // Wildcard para rutas no encontradas
  //{ path: '**', redirectTo: '/listado-partes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}