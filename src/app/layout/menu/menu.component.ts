import { Component, OnInit } from '@angular/core';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { CountriesService } from '../../../../api/api/countries.service';
import appConfig from '../../../assets/config/app-config.json';

export interface RegionCustom {
  name?: string;
  totalPopulation?: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  ROUTER_LINK: string = appConfig.ROUTE_TEST;
  regions: RegionCustom[] = [];

  constructor(
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
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
        console.log(this.regions);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
