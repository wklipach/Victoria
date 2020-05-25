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
          ['data3', 200]
        ],
        type: 'pie'
      },
      legend: {
        show: false
      }
    });

    function toggle(id) {
      chart.toggle(id);
    }

    d3.select('.container').insert('div', '.chart').attr('class', 'legend').selectAll('span')
      .data(['data1', 'data2', 'data3'])
      .enter().append('span')
      .attr('data-id', function (id) { return id; })
      .html(function (id) { return id; })
      .each(function (id) {
        d3.select(this).style('background-color', chart.color(id));
      }).on('mouseover', function (id) {
          chart.focus(id);
    })
      .on('mouseout', function (id) {
        chart.revert();
      })
      .on('click', function (id) {
        chart.toggle(id);
      });

  }



}


