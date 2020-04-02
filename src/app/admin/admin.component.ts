import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm: FormGroup;
  branchList = [];
  public bShowChangeBranch = false;
  public bErrorEmptyBranch = false;
  bShowNewBranch = false;
  bErrorEmptyNewBranch = false;
  bShowDeleteBranch = false;
  sBranchName = '';

  constructor(private adminserv: AdminService) {
    this.adminForm = new FormGroup({
      'inputBranch': new FormControl({}, []),
      'inputChangeBranche': new FormControl({}, []),
      'inputNewBranche': new FormControl({}, [])
    });
  }

  ngOnInit(): void {
    this.loadBranchList();
  }

  loadBranchList() {
    //
    this.adminserv.getBranch().subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.branchList.push(element);
      });

      this.adminForm.controls['inputBranch'].setValue(this.branchList.find((valBranch) => valBranch.id === 1).name);
    });
    //
  }

  changeBranch() {

      console.log('-----', this.adminForm.controls['inputBranch'].value);
    this.bShowChangeBranch = true;
    this.adminForm.controls['inputChangeBranche'].setValue(this.adminForm.controls['inputBranch'].value);

    //    sBranch =
    // this.parlorForm.controls['inputGender'].setValue(this.genderList.find((value1) => value1.id === idGender)
    // const gender = this.genderList.find((value) => value.name === inputGender).id;

  }

  DisappearFrameChangeBranch() {
    this.bShowChangeBranch = false;
  }

  OnChangeBranch() {
    //
    console.log('изменяем фидиал');
  }

  DisappearFrameNewBranch() {
    this.bShowNewBranch = false;
  }

  newBranch() {
    this.bShowNewBranch = true;
    this.adminForm.controls['inputNewBranche'].setValue('');
  }

  OnNewBranch() {
    console.log('добавляем филиал');
  }

  OnDeleteBranch() {
    console.log('удаляем филиал');
  }

  DisappearFrameDeleteBranch() {
    this.bShowDeleteBranch = false;
  }

  DeleteBranch() {
    this.bShowDeleteBranch = true;
    this.sBranchName = this.adminForm.controls['inputBranch'].value;
  }
}
