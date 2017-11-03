import { Component } from '@angular/core';
import { WebService } from "./web.service";
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public auth:WebService,public options:JasperoAlertsModule) { 
  }
  title = 'app';
}
