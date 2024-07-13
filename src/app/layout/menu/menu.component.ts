import { Component } from '@angular/core';
import appConfig from '../../../assets/config/app-config.json';
import { MENU } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  MENU_ID: string = appConfig.MENU_ID;
  ROUTER_LINK: string = appConfig.ROUTE_COUNTRIES;
  menu: string[] = MENU;

  constructor() {}

}
