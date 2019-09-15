import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls:
    [
      './app.component.scss'
    ]
})
export class AppComponent {

  public appPages = [
    { title: 'Timesheets', url: '/timesheets', icon: 'md-clock' },
  ];


  constructor(
    public menu: MenuController,
  ) {
  }

  initializeApp() {

  }


}
