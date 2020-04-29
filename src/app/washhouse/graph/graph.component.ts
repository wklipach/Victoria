import { Component, OnInit } from '@angular/core';
import Dygraph from 'dygraphs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const g = new Dygraph('graph',
          `Date,A,B
          2016/01/01,10,20
          2016/07/01,20,10
          2016/12/31,40,30
`, {
        fillGraph: true
      });
  }

}
