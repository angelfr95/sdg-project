import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';
import { Subscription } from 'rxjs';
import { GlobalsService } from '../../services/globals.service';
import { chartOptionsExt } from './chart-options-ext';

export type NameAndPopulation = [string, number];

accessibility(Highcharts);
@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.scss']
})
export class PopulationChartComponent implements OnInit {

  @Input() data: NameAndPopulation[] = [];
  @Input() title: string = '';

  filteredData: NameAndPopulation[] = [];
  poblationFilterSubscription!: Subscription;

  // Highcharts configuration in chart-options-ext.ts
  chartOptions: Highcharts.Options = chartOptionsExt;
  Highcharts: typeof Highcharts = Highcharts;

  constructor(
    private _globals: GlobalsService
  ) {}

  ngOnInit() {
    this.poblationFilterSubscription = this._globals._poblationFilter.subscribe(value => {
      this.onPoblationFilterChange(value);
    });
    this.chartOptions.title!.text = this.title;
  }

  onPoblationFilterChange(value: number) {
    this.filteredData = this.data.filter((region: NameAndPopulation) => region[1]! >= value);
    this.chartOptions.chart!.scrollablePlotArea!.minWidth = this.filteredData.length > 25 ? 4000 : 1;
    (this.chartOptions.series![0] as Highcharts.SeriesColumnOptions).data = this.filteredData;
    if(Highcharts.charts[0]) Highcharts.charts[0].update(this.chartOptions);
  }

  ngOnDestroy() {
    Highcharts.charts.length = 0;
  }

}
