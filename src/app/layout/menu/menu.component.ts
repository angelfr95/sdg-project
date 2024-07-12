import { Component } from '@angular/core';
import appConfig from '../../../assets/config/app-config.json';
import { MENU } from './menu';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  MENU_ID: string = appConfig.MENU_ID;
  ROUTER_LINK: string = appConfig.ROUTE_TEST;
  menu: string[] = MENU;

  constructor(
    private _globals: GlobalsService
  ) {}

  selectMenu(index: any) {
    
    if(this._globals.lastElementIndex !== -1) {
      let lastElement = document.getElementById(this.MENU_ID + this._globals.lastElementIndex);
      lastElement!.style.backgroundColor = "";  
    }
    
    let element = document.getElementById(this.MENU_ID + index);
    element!.style.backgroundColor = "red";
    this._globals.lastElementIndex = index;
    
  }

}
