import {AfterViewInit, Component, DoCheck, Input, IterableDiffers, OnInit} from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';
import {ReportService} from '../../washhouse/services/report.service';

@Component({
  selector: 'app-c3pie',
  templateUrl: './c3pie.component.html',
  styleUrls: ['./c3pie.component.css']
})
export class C3pieComponent implements OnInit,  DoCheck  {

  @Input() pieData = [];
  @Input() pieColor = [];
  @Input() pieId = 1;
  differ: any;
  chart: any;
  titleGraph = '';



  constructor(differs: IterableDiffers, private rs: ReportService) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit(): void {
    // this.pie_load( this.pieDatas.id_branch, this.pieDatas.date_begin, this.pieDatas.date_end, this.pieDatas.inttype );
  }

  ngDoCheck() {
    const change = this.differ.diff(this.pieData);
    if (change) {
      this.drawPie(this.pieData, this.pieColor) ;
    }
  }



  drawPie(chartData, colorAdress) {

    switch ( this.pieId ) {
      case 1:
        this.titleGraph = 'Приемка';
        break;

      case 2:
        this.titleGraph = 'Ремонт';
        break;

      case 3:
        this.titleGraph = 'Стирка';
        break;

      case 4:
        this.titleGraph = 'Склад';
        break;

      case 5:
        this.titleGraph = 'Отгружено';
        break;

      case 6:
        this.titleGraph = 'Расходы';
        break;

      default:
        this.titleGraph = '';
        break;
    }

    this.chart = c3.generate({
      bindto: '#chart' + this.pieId.toString(),
      data: {
        columns: chartData,
        type: 'pie'
      },
      legend: {
        position: 'bottom',
      },

      pie: {
        label: {
          format: function (value) { return value; }
        }
      }
    });


    Object.keys(this.chart.internal.config.data_colors).forEach( (key) => {
      const colorNew = colorAdress.find( arr => arr[0] === key)[1];
      if (this.chart.internal.config.data_colors[key] && colorNew) {
        this.chart.internal.config.data_colors[key] = colorNew;
      }
    });

    this.chart.internal.color = this.chart.internal.generateColor();
    this.chart.flush();

    function toggle(id) {
      this.chart.toggle(id);
    }

    d3.selectAll('.c3-legend-item').each(function() {
      d3.select(this).style('font-size', '1.25em');
    });
  }


}



