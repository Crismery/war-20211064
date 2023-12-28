import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VivenciaPageRoutingModule } from './vivencia-routing.module';

import { VivenciaPage } from './vivencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VivenciaPageRoutingModule
  ],
  declarations: [VivenciaPage]
})
export class VivenciaPageModule {}
