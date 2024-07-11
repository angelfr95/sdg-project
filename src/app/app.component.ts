import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'sdg-project';

  API_BASE_PATH: string = '';

  ngOnInit() {
    this.API_BASE_PATH = environment.API_BASE_PATH;
  }

}
