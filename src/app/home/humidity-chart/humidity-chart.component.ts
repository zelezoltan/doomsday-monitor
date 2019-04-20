import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-humidity-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.css']
})
export class HumidityChartComponent implements OnInit {

  chart: Chart;
  constructor(db: AngularFireDatabase) {
    db.list('humidity', ref => ref.limitToLast(1)).valueChanges().subscribe(data => {
      if (data.length > 0) {
        if (this.chart) {
          const newItem: any = data[0];
          if((new Date()).getTime()/1000 - newItem.date/1000 < 10) {
            let shift = true;
            if (this.chart.ref.series[0].data.length < 10) { shift = false; }
            
            this.chart.addPoint([newItem.date, newItem.value], 0, true, shift);
          }
        } else {
          alert('init chart, first!');
        }
      }
    });
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const chart = new Chart({
      chart: {
        type: 'spline',
        //width: 400,
        marginRight: 10,
    },
    

    time: {
        useUTC: false
    },

    title: {
        text: 'Vault humidity'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 100,
        title: {
          text: 'Time'
        }
    },
    yAxis: {
        title: {
            text: 'Humidity %'
        },
        /*plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]*/
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}%'
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
      name: 'Humidity',
      data: /*(function () {
          // generate an array of random data
          var data = [],
              time = (new Date()).getTime(),
              i;

          for (i = -19; i <= 0; i += 1) {
              data.push({
                  x: time + i * 1000,
                  y: Math.random()
              });
          }
          return data;
      }())*/[],
      type: undefined
    }]
    });
    
    this.chart = chart;
  }

}
