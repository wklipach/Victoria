import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-biblio-video',
  templateUrl: './biblio-video.component.html',
  styleUrls: ['./biblio-video.component.css']
})
export class BiblioVideoComponent implements OnInit {

  link_video = '';

  constructor( private _route: ActivatedRoute, private location: Location ) {
    this.link_video = this._route.snapshot.queryParamMap.get('link_video');

  }

  ngOnInit(): void {


  }

  goBack() {
    this.location.back();
  }
}
