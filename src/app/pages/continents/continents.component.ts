import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { NameAndPopulation } from '../../common/population-chart/population-chart.component';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrl: './continents.component.scss'
})
export class ContinentsComponent implements OnInit {

  regions: NameAndPopulation[] = [];
  dataLoaded: boolean = false;

  constructor(
    protected _globals: GlobalsService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this._globals.clearMenu();
    this.getRegions();
  }

  getRegions() {
    this.dataLoaded = false;
    this.countriesService.getAllCountries().subscribe({
      next: (resp: CountryInfoDto[]) => {
        resp.forEach((item: CountryInfoDto) => {
          let index = this.regions.findIndex(region => region[0] === item.region);
          if (index !== -1) {
            this.regions[index][1]! += item.population;
          } else {
            this.regions.push([ item.region, item.population ]);
          }
        });
        this.dataLoaded = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
