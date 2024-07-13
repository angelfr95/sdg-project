import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { ActivatedRoute } from '@angular/router';
import appConfig from '../../../assets/config/app-config.json';
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
  dataLoaded: boolean = false;
  errorService: boolean = false;

  constructor (
    protected _globals: GlobalsService,
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this._globals.clearMenu();
      let element = document.getElementById(appConfig.MENU_ID + params['regionName']);
      if(element) element.style.backgroundColor = "var(--light-grey)";
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
        this.dataLoaded = true;
      },
      error: (error: any) => {
        this.errorService = true;
        console.log(error);
      }
    })
  }

}
