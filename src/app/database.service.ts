import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private isOpen = false;
  public db?: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) { 
    platform.ready().then(() => {
      this.initDatabase();
    });
  }

  async initDatabase() {
    try {
      this.db = await this.sqlite.create({
        name: 'vivencias.db',
        location: 'default'
      });
  
      if (this.db) {
        console.log('Base de datos inicializada');
        await this.createVivenciasTable();
      } else {
        console.error('Error al inicializar la base de datos.');
      }
    } catch (error) {
      console.error('Error al crear la base de datos', error);
    }
  }
  
  
  async createVivenciasTable() {
    try {
      await this.db?.executeSql(
        'CREATE TABLE IF NOT EXISTS vivencias (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, fecha TEXT, descripcion TEXT, foto TEXT, audio TEXT)',
        []
      );
      console.log('Tabla de vivencias creada');
    } catch (error) {
      console.error('Error al crear la tabla de vivencias', error);
    }
  }
  
  getDatabase(): SQLiteObject | undefined {
    return this.db;
  }

  async guardarVivencia(titulo: string, fecha: string, descripcion: string, foto: string, audio: string) {
    if (this.db) {
      try {
        const result = await this.db.executeSql('INSERT INTO vivencias (titulo, fecha, descripcion, foto, audio) VALUES (?, ?, ?, ?, ?)', [titulo, fecha, descripcion, foto, audio]);
        console.log('Vivencia guardada con éxito');
        return result;
      } catch (error) {
        console.error('Error al guardar la vivencia', error);
        return error;
      }
    } else {
      console.error('La base de datos no está inicializada.');
      return null;
    }
  }

  initialize(): Promise<void> {
    return this.initDatabase();
  }

  getAllVivencias() {
    if (this.db) {
      return this.db.executeSql('SELECT * FROM vivencias', [])
        .then(data => {
          let vivencias = [];
          for (let i = 0; i < data.rows.length; i++) {
            vivencias.push(data.rows.item(i));
          }
          return vivencias;
        })
        .catch(error => {
          console.error('Error al obtener las vivencias', error);
          return [];
        });
    } else {
      return Promise.resolve([]); // Retornar una promesa vacía en caso de que this.db sea undefined
    }
  }
  
  deleteVivencia(id: number) {
    if (this.db) {
      return this.db.executeSql('DELETE FROM vivencias WHERE id = ?', [id])
        .then(() => {
          console.log('Vivencia eliminada con éxito');
        })
        .catch(error => {
          console.error('Error al eliminar la vivencia', error);
          return error;
        });
    } else {
      console.error('La base de datos no está inicializada.');
      return Promise.reject('La base de datos no está inicializada.');
    }
  }  
}
