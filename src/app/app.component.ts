import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Vivencias', url: '/vivencia', icon: 'id-card' },
    { title: 'Registrar', url: '/registrar', icon: 'add-circle' },
    { title: 'Acerca de', url: '/acercade', icon: 'people-circle' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
