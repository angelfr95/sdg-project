import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopulationChartComponent } from './population-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [PopulationChartComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    PopulationChartComponent
  ]
})
export class PopulationChartModule { }
