import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentService} from '../../services/comment.service';
import {GlobalRef} from '../../../services/globalref';
import {AuthService} from '../../../services/auth-service.service';
import {Router} from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-comment-line',
  templateUrl: './comment-line.component.html',
  styleUrls: ['./comment-line.component.css']
})
export class CommentLineComponent implements OnInit, AfterViewInit {

  @Input() id_message = -1;
  @Input() maslineShort = {sFrom: '', sDate: '', sSituationLittle: '', sSituationSumma: '', unread: 0, InputOutput: 0};

  @ViewChild('summaryPositionLine') public summaryPositionLine: ElementRef;
  @ViewChild('openButton') public openButton: ElementRef;

  id_user_vict = -1;
  id_branch_vict = -1;
  commentlineForm: FormGroup;
  imageResGlobal = [];
  sSituationLittle = '';
  sSituationSumma = '';
  sFrom = '';
  TextFromTo = 'Собеседник';
  sDate = '';
  intInstruction = 0;
  intResponseSucc = 0;
  sBranch = '';
  unread = 0;
  sError = '';
  intResp = 1;
  showVideo = false;
  link_video = '';

  constructor(private cs: CommentService,
              private gr: GlobalRef,
              private authService: AuthService,
              private router: Router) {
    this.commentlineForm  = new FormGroup({ });
 }

  ngOnInit(): void {

    this.commentlineForm.addControl('situation' + this.id_message.toString() , new FormControl(''));
    this.commentlineForm.addControl('data_situation' + this.id_message, new FormControl(''));
    this.commentlineForm.addControl('data_solution' + this.id_message, new FormControl(''));
    this.commentlineForm.addControl('checkResume' + this.id_message, new FormControl(''));
    this.commentlineForm.addControl('summa' + this.id_message, new FormControl(''));
    this.commentlineForm.addControl('respResume' + this.id_message, new FormControl(''));
    this.commentlineForm.addControl('link_video' + this.id_message, new FormControl(''));
    this.commentlineForm.controls['situation' + this.id_message].disable();
    this.commentlineForm.controls['data_situation' + this.id_message].disable();
    this.commentlineForm.controls['data_solution' + this.id_message].disable();

    const Res = this.authService.loginStorage();
      this.id_user_vict = Res.id_user_vict;
      this.id_branch_vict = Res.id_branch_vict;


     console.log('InputOutput', this.maslineShort.InputOutput);
     if (this.maslineShort.InputOutput === 0) {
        this.TextFromTo = 'Собеседник';
     } else {
        this.TextFromTo = 'Собеседник';
     }

    this.sFrom = this.maslineShort.sFrom;
    this.sDate = this.maslineShort.sDate;
    this.unread = this.maslineShort.unread;

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
      // делаем прочитанным
      if (this.unread === 1) {
        this.unread = 0;
        // добавляем в баз укак прочитанное
        this.cs.setMessageRead(this.id_message, this.id_user_vict).subscribe();
      }

      // засасываем данные
       this.LoadDataFromBase(this.id_message);
    }
  }


  LoadDataFromBase(id_message) {

    this.showVideo = false;
    this.link_video = '';

    this.cs.getMessage(id_message).subscribe(value => {

      if (value[0]) {
        // const dPipe = new DatePipe('ru');
        // this.date_from =  dPipe.transform(value[0].date_from, 'dd.MM.yyyy   HH.mm');
        this.sBranch = value[0].branch_name;
        this.commentlineForm.controls['situation' + this.id_message].setValue(value[0].situation);
        this.commentlineForm.controls['data_situation' + this.id_message].setValue(value[0].data_situation);
        this.commentlineForm.controls['data_solution' + this.id_message].setValue(value[0].data_solution);
        this.commentlineForm.controls['summa' + this.id_message].setValue(value[0].summa);

        this.commentlineForm.controls['checkResume' + this.id_message].setValue(value[0].result_response.toString());

        this.commentlineForm.controls['respResume' + this.id_message].setValue(value[0].comment_response);
        if (value[0].result_response.toString() === '3') {
           this.intInstruction = 1;
        }

        if (value[0].result_response.toString() === '0') {
          this.intResponseSucc = 0;
          this.commentlineForm.controls['checkResume' + this.id_message].enable();
          this.commentlineForm.controls['summa' + this.id_message].enable();
          this.commentlineForm.controls['respResume' + this.id_message].enable();
        }

        if (value[0].result_response.toString() === '1') {
          this.intResponseSucc = 1;
          this.commentlineForm.controls['checkResume' + this.id_message].disable();
          this.commentlineForm.controls['summa' + this.id_message].disable();
          this.commentlineForm.controls['respResume' + this.id_message].disable();
        }

        if (value[0].result_response.toString() === '2') {
          this.intResponseSucc = 1;
          this.commentlineForm.controls['checkResume' + this.id_message].disable();
          this.commentlineForm.controls['summa' + this.id_message].disable();
          this.commentlineForm.controls['respResume' + this.id_message].disable();
          this.intResp = 2;
        }

        if  (this.intInstruction === 1) {
           console.log('value[0].link_video',  value[0].link_video);
           if (value[0].link_video) {
             this.showVideo = true;
             this.link_video = value[0].link_video;
           }

        }


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

  onClickResume() {

    if (!this.commentlineForm.controls['checkResume' + this.id_message].value) {
      this.sError = 'Вы не выбрали результат ответа';
      return;
    } else {
      console.log('value', this.commentlineForm.controls['checkResume' + this.id_message].value);
    }

    if (this.commentlineForm.controls['checkResume' + this.id_message].value.toString() === '0') {
      this.sError = 'Вы не выбрали результат ответа';
      return;
    }

    if (!Number(this.commentlineForm.controls['summa' + this.id_message].value.toString().trim())) {
      this.commentlineForm.controls['summa' + this.id_message].setValue('0');
    }

    const summa =  this.commentlineForm.controls['summa' + this.id_message].value.toString().trim();
    const intResp = this.commentlineForm.controls['checkResume' + this.id_message].value;

    if  (this.commentlineForm.controls['respResume' + this.id_message].value === undefined) {
      console.log('undefined');
    }

    let comment_response = '';
    if  (this.commentlineForm.controls['respResume' + this.id_message].value !== null) {
      comment_response = this.commentlineForm.controls['respResume' + this.id_message].value.toString().trim();
    }

     this.cs.setResponseMessage(this.id_message, this.id_user_vict, summa, comment_response, intResp).subscribe(value => {
        jQuery(this.summaryPositionLine.nativeElement).collapse('hide');
     }) ;

  }

  ocClickResumeCheck() {
    this.sError = '';
    this.intResp = this.commentlineForm.controls['checkResume' + this.id_message].value;
  }

  onClickRespose() {
    //
    this.router.navigate(['/comment-new'], { state: { 'numberOldZsr' : this.id_message}});
    //
  }

show_video() {

    this.router.navigate(['/biblio_video'], {queryParams: {'link_video': this.link_video}} );

  }
}
