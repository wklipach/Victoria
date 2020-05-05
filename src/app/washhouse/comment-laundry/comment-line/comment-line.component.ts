import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../services/comment.service';
declare var jQuery: any;

@Component({
  selector: 'app-comment-line',
  templateUrl: './comment-line.component.html',
  styleUrls: ['./comment-line.component.css']
})
export class CommentLineComponent implements OnInit, AfterViewInit {

  @ViewChild('summaryPosition2') public summaryPosition: ElementRef;
  commentlineForm: FormGroup;

  constructor(private cs: CommentService) {
    this.commentlineForm  = new FormGroup({
      'dateMessageFrom': new FormControl('')
    });

  }

  ngOnInit(): void {

    this.commentlineForm.controls['dateMessageFrom'].setValue('01/11/2222');

  }

  ngAfterViewInit() {

  }

  onButtonCollapse($event: MouseEvent) {

    const element = this.summaryPosition.nativeElement;

    // элемент был скрыт и как раз сейчас раскрывается
    if (element.offsetParent == null) {
       console.log('раскрывается');
      this.commentlineForm.controls['dateMessageFrom'].setValue('01/11/2222sffsdgsdgdfg');
    }
  }


  LoadDataFromBase(id_message) {

  }


}
