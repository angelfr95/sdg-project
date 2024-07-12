import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { ContinentsComponent } from './continents/continents.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { PopulationChartModule } from '../common/population-chart/population.module';

@NgModule({
  declarations: [
    ContinentsComponent,
    CountriesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PopulationChartModule
  ],
  exports: [
    ContinentsComponent,
    CountriesComponent
  ]
})
export class PagesModule { }
