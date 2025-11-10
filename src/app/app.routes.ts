import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearParte } from './features/component/crear-parte/crear-parte';

export const routes: Routes = [
  { path: 'crear-parte', component: CrearParte },

  { path: '', redirectTo: '/crear-parte', pathMatch: 'full' },
  { path: '**', redirectTo: '/crear-parte' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}