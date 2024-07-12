import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
  
export class GlobalsService {

    lastElementIndex: number = -1;

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

}