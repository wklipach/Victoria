import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-comment-image',
  templateUrl: './comment-image.component.html',
  styleUrls: ['./comment-image.component.css']
})
export class CommentImageComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @Input() imageResGlobal = [];

  constructor() { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '500px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];



/*  проверка работоспособности при обращении к серверу
    this.galleryImages = [
      {
        small: 'http://localhost:3000/images/messages/1_1.jpg',
        medium: 'http://localhost:3000/images/messages/1_1.jpg'
        big: 'http://localhost:3000/images/messages/1_1.jpg'
      },
      {
        small: 'http://localhost:3000/images/messages/1_1.jpg',
        medium: 'http://localhost:3000/images/messages/1_1.jpg'
        big: 'http://localhost:3000/images/messages/1_1.jpg'
      }
    ];
*/

    this.galleryImages = [];
    this.imageResGlobal.forEach( (el, index) => {
      this.galleryImages.push({small: el, medium: el, big: el});
    });

  }

}
