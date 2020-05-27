import {
  Component,
  DoCheck,
  Input,
  IterableDiffers,
  OnInit
} from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, DoCheck  {

  @Input() pieDatas = [];
  @Input() pieIdAddress = [];
  differ: any;

  colorAdress =  [{id: 1, color: 'Blue'},
                 {id: 2, color: 'Crimson'},
                 {id: 3, color: 'Orange'},
                 {id: 4, color: 'Green'},
                 {id: 5, color: 'Gold'},
                 {id: 6, color: 'SkyBlue'},
                 {id: 7, color: 'PeachPuff'}];

  constructor(differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }


  ngOnInit(): void {
    //
  }

  ngDoCheck() {
    const change = this.differ.diff(this.pieDatas);
    if (change) {
      this.drawPie();
    }
  }



  drawPie() {
    google.charts.load('current', {packages: ['corechart']});

    let timeout;
    timeout = setInterval(() => {
      if (google.visualization !== undefined) {
        drawChart(this.pieDatas, this.pieIdAddress, this.colorAdress);
        clearInterval(timeout);
      }
    }, 300);


    // google.charts.setOnLoadCallback(drawChart(this.datas));

    function drawChart(chartData, chartAddress, colorAdress) {
      console.log('chartData', chartData);
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'address');
      data.addColumn('number', 'count');
      data.addRows(chartData);

      // Blue, Crimson, Orange, Green, SlateBlue, SkyBlue, PeachPuff
      const mySlice = {};
      if (chartAddress) {
        Object.keys(chartAddress).forEach(key => {
          console.log('this.pieIdAddress', key, chartAddress[key]);
          const yColor  = colorAdress.find(a => a.id === chartAddress[key]);
          if (yColor) {
            mySlice[key] = {color: yColor.color};
          }
        });
        console.log('mySlice', mySlice);
      }

      // trigger: 'none'
      const options = {title: 'Выработка', is3D: 'true',
                       pieSliceText: 'value', pieStartAngle: '0',
                       chartArea: {left: 20, top: 0, width: '200%', height: '200%'},
                       tooltip: { isHtml: true}};

      if ('0' in mySlice) {
        options['slices'] = mySlice;
      }


      const chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);

    }
  }
}


