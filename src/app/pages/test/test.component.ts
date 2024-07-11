import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../api/api/countries.service';
import { CountryInfoDto } from '../../../../api/models/CountryInfoDto';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  constructor (
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions() {
    this.countriesService.getAllCountries().subscribe({
      next: (resp: CountryInfoDto[]) => {
        console.log(resp);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
