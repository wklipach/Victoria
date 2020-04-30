import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-branch-selection',
  templateUrl: './branch-selection.component.html',
  styleUrls: ['./branch-selection.component.css']
})
export class BranchSelectionComponent implements OnInit {

  @Input() public id_user = -1;
  @Input() public arrayBranch: Array<any>;
  @Output() messageToEmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

    if (this.arrayBranch) {

        console.log('component this.arrayBranch', this.arrayBranch);
        console.log('component this.id_user', this.id_user);
    }


  }

  curBranch(branch: any) {
    console.log('component', branch);
    this.messageToEmit.emit(branch);
  }
}
