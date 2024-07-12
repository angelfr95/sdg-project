import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { Subscription } from 'rxjs';
import appConfig from '../../../assets/config/app-config.json';

export interface RegionCustom {
  name?: string;
  totalPopulation?: number;
}

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrl: './continents.component.scss'
})
export class ContinentsComponent implements OnInit {

  regions: RegionCustom[] = [];
  filteredRegions: RegionCustom[] = [];
  poblationFilterSubscription!: Subscription;
  MENU_ID: string = appConfig.MENU_ID;

  constructor(
    protected _globals: GlobalsService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    if(this._globals.lastElementIndex !== -1) document.getElementById(this.MENU_ID + this._globals.lastElementIndex)!.style.backgroundColor = "";
    this.poblationFilterSubscription = this._globals._poblationFilter.subscribe(value => {
      this.onPoblationFilterChange(value);
    });
    this.getRegions();
  }

  getRegions() {
    this.countriesService.getAllCountries().subscribe({
      next: (resp: CountryInfoDto[]) => {
        resp.forEach((item: CountryInfoDto) => {
          let index = this.regions.findIndex(region => region.name === item.region);
          if (index !== -1) {
            this.regions[index].totalPopulation! += item.population;
          } else {
            this.regions.push({ name: item.region, totalPopulation: item.population });
          }
        });
        this.onPoblationFilterChange(this._globals.poblationFilter);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onPoblationFilterChange(value: number) {
    this.filteredRegions = this.regions.filter((region: RegionCustom) => region.totalPopulation! >= value);
  }

}
