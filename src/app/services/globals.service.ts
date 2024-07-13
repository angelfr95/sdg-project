import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MENU } from "../layout/menu/menu";
import appConfig from '../../assets/config/app-config.json';

@Injectable({
    providedIn: 'root'
})
  
export class GlobalsService {

    private poblationFilterSubject = new BehaviorSubject<number>(0);
    _poblationFilter = this.poblationFilterSubject.asObservable();

    set poblationFilter(value: number) {
        this.poblationFilterSubject.next(value);
    }

    get poblationFilter(): number {
        return this.poblationFilterSubject.getValue();
    }

    formatNumber(value: number): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    clearMenu() {
        MENU.forEach((menu: string) => document.getElementById(appConfig.MENU_ID + menu)!.style.backgroundColor = "");
    }

}