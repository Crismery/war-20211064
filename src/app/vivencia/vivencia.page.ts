import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-vivencia',
  templateUrl: './vivencia.page.html',
  styleUrls: ['./vivencia.page.scss'],
})
export class VivenciaPage implements OnInit {
  vivencias: any[] = []; 

  constructor(private databaseService: DatabaseService) { }

  ionViewWillEnter() {
    this.databaseService.initialize().then(() => {
      if (this.databaseService.db) {
        this.cargarVivencias();
      }
    });
  }
  
  ngOnInit() {
  }

  cargarVivencias() {
    this.databaseService.getAllVivencias().then((data) => {
      this.vivencias = data;
    });
  }

  borrarVivencia(id: number) {
    this.databaseService?.deleteVivencia(id)?.then(() => {
      this.cargarVivencias();
    }).catch(error => {
      console.error('Error al eliminar la vivencia:', error);
    });
  }
}
