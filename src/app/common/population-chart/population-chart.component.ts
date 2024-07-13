import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';

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

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: 1,
        scrollPositionX: 0
      }
    },
    title: {
      text: "Population by " + this.title
    },
    xAxis: {
      type: 'category',
      labels: {
        autoRotation: [-45, -90],
        style: {
          fontSize: '15px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Population: <b>{point.y}</b>'
    },
    series: [{
      name: 'Population',
      type: 'column',
      colors: ['var(--generic-blue)', 'var(--secondary-blue)',],
      colorByPoint: true,
      groupPadding: 0,
      data: this.data,
      dataLabels: {
        enabled: true,
        rotation: 0,
        color: '#FFFFFF',
        verticalAlign: 'top',
        // format: '{point.y}',
        y: 0,
        style: {
          fontSize: '10px',
          fontFamily: 'Verdana, sans-serif',
        }
      },
      pointWidth: 50
    }],
    scrollbar: {
      enabled: true
    },
    accessibility: {
      enabled: true
    }
  };

  ngOnInit() {
    this.updateCharWidth(this.data.length);
    this.chartOptions.title!.text = this.chartOptions.title!.text + this.title;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currentValue = changes['data']['currentValue'];
    this.updateCharWidth(currentValue.length);
    (this.chartOptions.series![0] as Highcharts.SeriesColumnOptions).data = currentValue;
    Highcharts.chart('chartContainer', this.chartOptions);
  }

  updateCharWidth(dataLength: number) {
    this.chartOptions.chart!.scrollablePlotArea!.minWidth = dataLength > 25 ? 4000 : 1;
  }

}
