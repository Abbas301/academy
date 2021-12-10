import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';

export interface Details {
  candidateName: string;
  phoneNumber: string;
  emailId: string;
  degree: string;
  stream: string;
  yop: string;
  degreeAggregate: string;
  branch: string;
  candidateId: string;
  tenthPercentage: string
  twelfthPercentage: string
  masterAggregate: string
  profileId: string;
  batchName: string;
}

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {
  [x: string]: any;

  details: any = []
  Cform !: FormGroup;
  index !: number;
  candidates: any;
  id: any;

  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'candidateName', 'phoneNumber', 'emailId', 'degree', 'stream', 'yop', 'degreeAggregate', 'branch', 'deleteEmployee'];
  dataSource = new MatTableDataSource<Details>();
  selection = new SelectionModel<Details>(true, []);
  deleteElement: any;
  CandidateListData: any;


  constructor(private router: Router,
    private ActivatedRouter: ActivatedRoute,
    private batchService: BatchService,
  ) { }

  ngOnInit(): void {

    this.Cform = new FormGroup({
      candidateId: new FormControl(''),
      batchName: new FormControl(''),
      candidateName: new FormControl(''),
      phoneNumber: new FormControl(''),
      emailId: new FormControl(''),
      degree: new FormControl(''),
      tenthPercentage: new FormControl(''),
      twelfthPercentage: new FormControl(''),
      stream: new FormControl(''),
      yop: new FormControl(''),
      masterAggregate: new FormControl(''),
      degreeAggregate: new FormControl(''),
      branch: new FormControl(''),
      profileId: new FormControl(''),
    })

    this.getAllCandidates()
  }

  branches = [
    { value: 'Hebbal', viewValue: 'Hebbal' },
    { value: 'BTM', viewValue: 'BTM' },
    { value: 'BasavanaGudi', viewValue: 'BasavanaGudi' },
  ];

  viewCandidate() {
    this.router.navigate(['/candidate/']);
  }


  updateCandidate(element: Details) {
    this.modalOpenButton.nativeElement.click();
    this.candidateId = element.candidateId
    const formData = this.Cform.patchValue({
      candidateId: element?.candidateId,
      candidateName: element?.candidateName,
      phoneNumber: element?.phoneNumber,
      emailId: element?.emailId,
      degree: element?.degree,
      tenthPercentage: element?.tenthPercentage,
      twelfthPercentage: element?.twelfthPercentage,
      stream: element?.stream,
      yop: element?.yop,
      profileId: element?.profileId,
      masterAggregate: element?.masterAggregate,
      degreeAggregate: element?.degreeAggregate,
      branch: element?.branch,
      batchName: element?.batchName,
    })
  }
  onClickUpdate() {
    let updateFormData = {
      candidateId: (this.Cform.get('candidateId') as FormControl).value ? (this.Cform.get('candidateId') as FormControl).value : '',
      candidateName: (this.Cform.get('candidateName') as FormControl).value ? (this.Cform.get('candidateName') as FormControl).value : '',
      emailId: (this.Cform.get('emailId') as FormControl).value ? (this.Cform.get('emailId') as FormControl).value : '',
      stream: (this.Cform.get('stream') as FormControl).value ? (this.Cform.get('stream') as FormControl).value : '',
      tenthPercentage: (this.Cform.get('tenthPercentage') as FormControl).value ? (this.Cform.get('tenthPercentage') as FormControl).value : '',
      degreeAggregate: (this.Cform.get('degreeAggregate') as FormControl).value ? (this.Cform.get('degreeAggregate') as FormControl).value : '',
      branch: (this.Cform.get('branch') as FormControl).value ? (this.Cform.get('branch') as FormControl).value : '',
      phoneNumber: (this.Cform.get('phoneNumber') as FormControl).value ? (this.Cform.get('phoneNumber') as FormControl).value : '',
      degree: (this.Cform.get('degree') as FormControl).value ? (this.Cform.get('degree') as FormControl).value : '',
      yop: (this.Cform.get('yop') as FormControl).value ? (this.Cform.get('yop') as FormControl).value : '',
      twelfthPercentage: (this.Cform.get('twelfthPercentage') as FormControl).value ? (this.Cform.get('twelfthPercentage') as FormControl).value : '',
      masterAggregate: (this.Cform.get('masterAggregate') as FormControl).value ? (this.Cform.get('masterAggregate') as FormControl).value : '',
      profileId: (this.Cform.get('profileId') as FormControl).value ? (this.Cform.get('profileId') as FormControl).value : '',
      batchName: (this.Cform.get('batchName') as FormControl).value ? (this.Cform.get('batchName') as FormControl).value : '',
    }
    this.batchService.updatedCandidate(updateFormData).subscribe((data: any) => {
      console.log("candidate details updated successfully");
      console.log(this.CandidatesList.id);
      this.getAllCandidates()
    })

  }

  deleteConfirm(element: any) {
    this.deleteElement = element
  }
  deleteCandidate(candidatelist: Details) {
    this.closeBtn.nativeElement.click();
    // this.batchService.deleteCandidateData(candidatelist.candidateId).subscribe((data: any) => {
    //   console.log("candidate data deleted successfully");
    // })

  }

  onSubmit(Cform: any) {
    console.log(this.Cform.value);


  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Details): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.candidateName + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllCandidates() {


    this.batchService.getSingleBatch(this.batchName).subscribe(res => {
      this.candidateList = res;
      this.candidates = this.candidateList.data[0];
      console.log(this.candidates);

      console.log(this.candidates.batchName);
      this.details = this.candidateList.data[0].candidateList;
      console.log(this.details);
      this.dataSource.data = this.details;
      // this.dataSource.data = this.paginator;

    });

  }
}



