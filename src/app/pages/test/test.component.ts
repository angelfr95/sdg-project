import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  regionName: string = '';

  constructor (
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.regionName = params['regionName'];
      this.getRegionByName(this.regionName);
  });
  }

  getRegionByName(region: string) {
    this.countriesService.getRegionByName(region).subscribe({
      next: (resp: CountryInfoDto[]) => {
        console.log(resp);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
