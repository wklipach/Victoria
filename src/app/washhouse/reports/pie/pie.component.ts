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
  differ: any;

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
        drawChart(this.pieDatas);
        clearInterval(timeout);
      }
    }, 300);


    // google.charts.setOnLoadCallback(drawChart(this.datas));

    function drawChart(chartData) {
      console.log('chartData', chartData);
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'address');
      data.addColumn('number', 'count');
      data.addRows(chartData);

      // trigger: 'none'
      const options = {title: 'Выработка', is3D: 'true', pieSliceText: 'value', pieStartAngle: '0',  tooltip: { isHtml: true}};
      const chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
  }
}
