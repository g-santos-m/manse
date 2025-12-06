import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearParte } from './features/component/crear-parte/crear-parte';
import { DetalleParte } from './features/component/detalle-parte/detalle-parte';
import { ListadoPartes } from './features/component/listado-partes/listado-partes';

export const routes: Routes = [
  { path: 'crear-parte', component: CrearParte },
  
  { path: 'editar-parte/:id', component: CrearParte },
  
  { path: 'listado-partes', component: ListadoPartes },

  { path: 'partes/:id', component: DetalleParte },

  { path: '', redirectTo: '/listado-partes', pathMatch: 'full' },
  
  { path: '**', redirectTo: '/listado-partes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}