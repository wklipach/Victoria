import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'app-c3pie',
  templateUrl: './c3pie.component.html',
  styleUrls: ['./c3pie.component.css']
})
export class C3pieComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    /*
        const chart = c3.generate({
          bindto: '#chart',
          data: {
            columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25]
            ]
          }
        });
    */

    const chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 100],
          ['data2', 300],
          ['data3', 200],
          ['data4', 200],
          ['data5', 200],
          ['data6', 200],
        ],
        type: 'pie',
        colors: {
          data1: '#ff0000',
          data2: '#00ff00',
          data3: '#0000ff',
          data4: '#ff0000',
          data5: '#00ff00',
          data6: '#0000ff'}



      },
      legend: {
          position: 'bottom',
      }
    });

    function toggle(id) {
      chart.toggle(id);
    }

    d3.selectAll('.c3-legend-item').each(function() {
      d3.select(this).style('font-size', '14px');
    });

  }



}


