import * as Highcharts from 'highcharts';

export let chartOptionsExt: Highcharts.Options = {
    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: 1,
        scrollPositionX: 0
      }
    },
    title: {
      text: ""
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
      data: [],
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