import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FirstserviceService } from '../firstservice.service';
import { HistogramForm } from './histogram_form';
@Component({
  selector: 'app-inhistogram-cmp',
  templateUrl: './inhistogram-cmp.component.html',
  styleUrls: ['./inhistogram-cmp.component.css']
})
// export class InhistogramCmpComponent implements OnInit {



//   constructor(private firstservice: FirstserviceService) {
//    }

//   ngOnInit() {
//   }

// }

export class InhistogramCmpComponent implements AfterViewInit {

  canvas: any;
  ctx: any;
  list_stats: any;
  histogram_form = new HistogramForm();
  chart = [];


  selected_menu = function(selectiondata) {
    this.histogram_form.histogram_selection = selectiondata;
  };

  get_histogram = function() {
    const hist_gram_data = this.histogram_form;
    this.histogram_graph(hist_gram_data);

  };

  constructor(private firstservice: FirstserviceService) {
    this.firstservice.get_stats_list().subscribe(results => {
      this.list_stats = results.hist_list;
    });
  }

  ngAfterViewInit() {}



  histogram_graph(histogram_graph_data) {
    const selected_histogram = histogram_graph_data.histogram_selection;
    this.firstservice.get_histogram_data_service(selected_histogram).subscribe(results => {
      console.log(results);


    const dataPack1 = results.hist.training_hist.map(Math.log2);

    const dataPack2 = results.hist.corpus_hist.map(Math.log2);
    // const dataPack2 = results.hist.training_hist.map(Math.log2);
    const dates = results.hist.hist_range;

    const numberWithCommas = function(y) {
      const x = Math.round((Math.pow(2, y))) ;
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // this.canvas =
    // // this.canvas = document.getElementById('myChart');
    // this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
          labels: dates,
          datasets: [
          {
              label: 'Training',
              data: dataPack1,
              backgroundColor: 'red',
              hoverBackgroundColor: 'rgba(55, 160, 225, 0.7)',
              hoverBorderWidth: 2,
              hoverBorderColor: 'lightgrey'
          },
          {
              label: 'Corpus',
              data: dataPack2,
              backgroundColor: 'blue',
              hoverBackgroundColor: 'rgba(225, 58, 55, 0.7)',
              hoverBorderWidth: 2,
              hoverBorderColor: 'lightgrey'
          },
          ]
      },
      options: {
           animation: {
            duration: 10,
          },
          tooltips: {
            mode: 'label',
            callbacks: {
            label: function(tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + numberWithCommas(tooltipItem.yLabel);
            }
            }
           },
          // scales: {
          //   xAxes: [{
          //     stacked: true,
          //     gridLines: { display: false },
          //     }],
          //   yAxes: [{
          //     stacked: true,
          //     ticks: {
          //       callback: function(value) { return numberWithCommas(value); },
          //      },
          //     }],
          // }, // scales
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'log2 Scale'
              }
            }]
          },

          legend: {display: true}
      } // options


    });
  });
  }

}
