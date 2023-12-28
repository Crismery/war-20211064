import { Component, OnInit } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from '../database.service';
import { MediaCapture, MediaFile, CaptureError} from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import { CaptureAudioOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  titulo: string="";
  fecha: string="";
  descripcion: string="";
  foto: File | null = null;
  audioGrabado: boolean = false;
  audioUrl: string ="";

  constructor(private mediaCapture: MediaCapture, private sqlite: SQLite, private databaseService: DatabaseService) {}

  cargarFoto(event: any) {
    const files = event.target.files; // Obtén la lista de archivos seleccionados
  
    if (files && files.length > 0) {
      const foto = files[0]; // Suponemos que solo se selecciona una foto
      if (foto) {
        // Realiza las operaciones necesarias con la foto, por ejemplo, cargarla en una variable
        this.foto = foto;
      } else {
        console.error('No se ha seleccionado un archivo de imagen válido.');
      }
    } else {
      console.error('No se ha seleccionado ningún archivo de imagen.');
    }
  }
  
  grabarAudio() {
    const options: CaptureAudioOptions = { limit: 1, duration: 10 };
    this.mediaCapture.captureAudio(options)
      .then(
        (audioData) => {
          // Verificar si audioData es un arreglo de MediaFile o un objeto de CaptureError
          if (Array.isArray(audioData)) {
            // Manejar el caso de éxito
            if (audioData.length > 0) {
              const audioFile = audioData[0];
              const audioPath = audioFile.fullPath;
              this.audioUrl = audioPath;
              this.audioGrabado = true;
            } else {
              console.error('No se capturó ningún archivo de audio.');
            }
          } else {
            // Manejar el caso de error
            console.error('Error al grabar audio', audioData);
          }
        }
      );
  }
   
  guardarVivencia() {
    // Verifica si todos los campos requeridos se han completado
    if (!this.titulo || !this.fecha || !this.descripcion) {
      console.error('Debes completar todos los campos obligatorios.');
      return;
    }
  
    // Convierte la fecha en un formato adecuado para almacenar en SQLite
    const fechaFormateada = new Date(this.fecha).toISOString();
  
    // Guarda los datos en la base de datos SQLite
    this.sqlite.create({
      name: 'vivencias.db',
      location: 'default'
    }).then((db) => {
      db.executeSql(
        'INSERT INTO vivencias (titulo, fecha, descripcion, foto, audio) VALUES (?, ?, ?, ?, ?)',
        [this.titulo, fechaFormateada, this.descripcion, this.foto ? this.foto : '', this.audioUrl ? this.audioUrl : '']
      ).then((res) => {
        console.log('Vivencia guardada con éxito');
        // Reinicia los campos después de guardar
        this.titulo = '';
        this.fecha = '';
        this.descripcion = '';
        this.foto = null;
        this.audioUrl = '';
        this.audioGrabado = false;
      }).catch((error) => {
        console.error('Error al guardar vivencia en la base de datos', error);
      });
    });
  }

  ngOnInit() {
  }
}