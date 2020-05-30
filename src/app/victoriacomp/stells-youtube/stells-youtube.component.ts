import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';


@Component({
  selector: 'app-stells-youtube',
  templateUrl: './stells-youtube.component.html',
  styleUrls: ['./stells-youtube.component.css']
})
export class StellsYoutubeComponent implements OnInit, AfterViewInit  {

  @Input() strUrl = '';
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  player: Plyr;

  videoSources: Plyr.Source[] = [];


  constructor() {

  }

  ngOnInit(): void {
    this.videoSources.push({src : this.strUrl, provider: 'youtube'});
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.player.play();
    }, 1000);
  }


  played(event: Plyr.PlyrEvent) {
    // console.log('played', event);
  }


}
