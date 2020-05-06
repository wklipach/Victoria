import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentService} from '../../services/comment.service';
import {GlobalRef} from '../../../services/globalref';
declare var jQuery: any;

@Component({
  selector: 'app-comment-line',
  templateUrl: './comment-line.component.html',
  styleUrls: ['./comment-line.component.css']
})
export class CommentLineComponent implements OnInit, AfterViewInit {

  @Input() id_message = -1;
  @Input() maslineShort = {sFrom: '', sDate: '', sSituationLittle: '', sSituationSumma: ''};

  @ViewChild('summaryPositionLine') public summaryPositionLine: ElementRef;
  @ViewChild('openButton') public openButton: ElementRef;

  commentlineForm: FormGroup;
  imageResGlobal = [];
  sSituationLittle = '';
  sSituationSumma = '';
  sFrom = '';
  sDate = '';

  constructor(private cs: CommentService,  private gr: GlobalRef) {
    this.commentlineForm  = new FormGroup({
      'situation': new FormControl(''),
      'data_situation': new FormControl(''),
      'resume': new FormControl(''),
      'summa': new FormControl(''),
      'respResume': new FormControl('')
    });

    this.commentlineForm.controls['situation'].disable();
    this.commentlineForm.controls['data_situation'].disable();
  }

  ngOnInit(): void {

    this.sFrom = this.maslineShort.sFrom;
    this.sDate = this.maslineShort.sDate;

    this.sSituationLittle = this.maslineShort.sSituationLittle;
    this.sSituationSumma = this.maslineShort.sSituationSumma;



  }

  ngAfterViewInit() {
    // подменяем имена чтобы раскладушка и кнопка работала только со своей строкой
    const element = this.openButton.nativeElement;
    element['dataset']['target'] = '#collapseCommentLine' + this.id_message;
    const element2 = this.summaryPositionLine.nativeElement;
    element2.id = 'collapseCommentLine' + this.id_message;
  }

  onButtonCollapse($event: MouseEvent) {

    const element = this.summaryPositionLine.nativeElement;

    // элемент был скрыт и как раз сейчас раскрывается
    if (element.offsetParent == null) {
       this.LoadDataFromBase(this.id_message);
    }
  }


  LoadDataFromBase(id_message) {
    this.cs.getMessage(id_message).subscribe(value => {

      if (value[0]) {
        // const dPipe = new DatePipe('ru');
        // this.date_from =  dPipe.transform(value[0].date_from, 'dd.MM.yyyy   HH.mm');
        this.commentlineForm.controls['situation'].setValue(value[0].situation);
        this.commentlineForm.controls['data_situation'].setValue(value[0].data_situation);
        this.commentlineForm.controls['summa'].setValue(value[0].summa);
        this.commentlineForm.controls['resume'].setValue(value[0].result_response);
        this.commentlineForm.controls['respResume'].setValue(value[0].comment_response);
        this.loadImageFromBase(id_message);
      }
    });
  }

    loadImageFromBase(id_message) {
      const imageRes = [];
      this.cs.getMessageImageList(id_message).subscribe((aRes: Array<any>) => {
        if (aRes[0]) {

          aRes.forEach((element, ih) => {
            imageRes.push(this.gr.sUrlImageGlobal + element.name);
          });
          this.imageResGlobal = imageRes;
        }
      });
    }

}
