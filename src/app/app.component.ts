import {Component} from '@angular/core';
import {StorageService} from "./services/StorageService";
import {DEV_CONFIG} from "./environment/Server.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: StorageService) {
    store.setServerConfig(DEV_CONFIG);
  }
}
