import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VivenciaPage } from './vivencia.page';

const routes: Routes = [
  {
    path: '',
    component: VivenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VivenciaPageRoutingModule {}
