import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { ActivatedRoute } from '@angular/router';
import appConfig from '../../../assets/config/app-config.json';
import { Subscription } from 'rxjs';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  ROUTER_LINK: string = appConfig.ROUTE_HOME;
  regionName: string = '';
  regionData: CountryInfoDto[] = [];
  filteredRegionData: CountryInfoDto[] = [];
  poblationFilterSubscription!: Subscription;

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
      this.regionName = params['regionName'];
      this.getRegionByName(this.regionName);
  });
  }

  getRegionByName(region: string) {
    this.countriesService.getRegionByName(region).subscribe({
      next: (resp: CountryInfoDto[]) => {
        this.regionData = resp;
        this.onPoblationFilterChange(this._globals.poblationFilter);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onPoblationFilterChange(value: number) {
    this.filteredRegionData = this.regionData.filter((region: CountryInfoDto) => region.population! >= value);
  }

}
