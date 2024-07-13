import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { ActivatedRoute } from '@angular/router';
import appConfig from '../../../assets/config/app-config.json';
import { Subscription } from 'rxjs';
import { GlobalsService } from '../../services/globals.service';
import { NameAndPopulation } from '../../common/population-chart/population-chart.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent implements OnInit {

  ROUTER_LINK: string = appConfig.ROUTE_CONTINENTS;
  countryData: NameAndPopulation[] = [];
  filteredCountryData: NameAndPopulation[] = [];
  poblationFilterSubscription!: Subscription;
  dataLoaded: boolean = false;
  errorService: boolean = false;

  constructor (
    protected _globals: GlobalsService,
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.poblationFilterSubscription = this._globals._poblationFilter.subscribe(value => {
      this.onPoblationFilterChange(value);
    });
    this.route.queryParams.subscribe(params => {
      this._globals.clearMenu();
      let element = document.getElementById(appConfig.MENU_ID + params['regionName']);
      if(element) element.style.backgroundColor = "#D3D3D3";
      this.getRegionByName(params['regionName']);
    });
  }

  getRegionByName(region: string) {
    this.countryData = [];
    this.dataLoaded = false;
    this.errorService = false;
    this.countriesService.getRegionByName(region).subscribe({
      next: (resp: CountryInfoDto[]) => {
        resp.forEach((item: CountryInfoDto) => {
          this.countryData.push([ item.name.common, item.population ]);
        })
        this.onPoblationFilterChange(this._globals.poblationFilter);
      },
      error: (error: any) => {
        this.errorService = true;
        console.log(error);
      }
    })
  }

  onPoblationFilterChange(value: number) {
    this.filteredCountryData = this.countryData.filter((region: NameAndPopulation) => region[1] >= value);
    this.dataLoaded = true;
  }

}
