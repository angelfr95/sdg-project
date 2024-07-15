import { Component, HostListener, Input, OnInit } from '@angular/core';
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

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.resizeFunction();
  }

  ngOnInit() {
    this.poblationFilterSubscription = this._globals._poblationFilter.subscribe(value => {
      this.onPoblationFilterChange(value);
    });
    this.chartOptions.title!.text = this.title;
  }

  onPoblationFilterChange(value: number) {
    this.filteredData = this.data.filter((region: NameAndPopulation) => region[1]! >= value);
    (this.chartOptions.series![0] as Highcharts.SeriesColumnOptions).data = this.filteredData;
    this.resizeFunction();
  }

  ngOnDestroy() {
    Highcharts.charts.length = 0;
  }

  updateScrollChar(elementsLength: number) {
    this.chartOptions.chart!.scrollablePlotArea!.minWidth = this.filteredData.length > elementsLength ? 4000 : 1;
  }

  updateChar() {
    if(Highcharts.charts[0]) Highcharts.charts[0].update(this.chartOptions);
  }

  resizeFunction() {
    if(window.innerWidth < 800) {
      this.updateScrollChar(6);
    } else if(window.innerWidth >= 800 && window.innerWidth < 1290) {
      this.updateScrollChar(10);
    } else {
      this.updateScrollChar(25);
    }
    this.updateChar();
  }

}
