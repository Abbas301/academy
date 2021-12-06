import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface CandidatesList {
  candidateName: string;
  phoneNumber: string;
  emailId: string;
  degree: string;
  stream: string;
  yop: string;
  degreeAggregate: string;
  branch: string;
  id: string;
  tenthPercentage: string
  twelfthPercentage: string
  masterAggregate: string
  profileId: string;
}

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {

  details: any = []
  CandidatesList: any;
  Cform !: FormGroup;
  index: any;
  id: any;

  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'candidateName', 'phoneNumber', 'emailId', 'degree', 'stream', 'yop', 'degreeAggregate', 'branch', 'deleteEmployee'];
  dataSource = new MatTableDataSource<CandidatesList>();
  selection = new SelectionModel<CandidatesList>(true, []);
  deleteElement: any;

  constructor(private router: Router,
    private ActivatedRouter: ActivatedRoute,
    private batchService: BatchService
  ) { }

  ngOnInit(): void {
    this.getCandidate();


    this.ActivatedRouter.queryParams.subscribe(res => {
      this.details = res;
      console.log(this.details);
    })

    this.Cform = new FormGroup({
      id: new FormControl(''),
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
  }

  getCandidate() {
    return this.batchService.getCandidate().subscribe((data: any) => {
      this.CandidatesList = data;
      console.log(this.CandidatesList);
      this.dataSource.data = this.CandidatesList
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  branches = [
    { value: 'Hebbal', viewValue: 'Hebbal' },
    { value: 'BTM', viewValue: 'BTM' },
    { value: 'BasavanaGudi', viewValue: 'BasavanaGudi' },
  ];

  viewCandidate() {
    this.router.navigate(['/candidate/']);
  }


  updateCandidate(element: CandidatesList) {
    this.modalOpenButton.nativeElement.click();
    this.id = element.id
    const formData = this.Cform.patchValue({
      candidateName: element?.candidateName,
      phoneNumber: element?.phoneNumber,
      emailId: element?.emailId,
      degree: element?.degree,
      tenthPercentage: element?.tenthPercentage,
      twelfthPercentage: element?.twelfthPercentage,
      stream: element?.stream,
      yop: element?.yop,
      masterAggregate: element?.masterAggregate,
      degreeAggregate: element?.degreeAggregate,
      branch: element?.branch,
      profileId: element?.profileId,

    })
  }
  onClickUpdate(Cform: FormGroup) {
    this.batchService.updatedCandidate(this.id, Cform.value).subscribe((data: any) => {
      console.log("candidate details updated successfully");
      console.log(this.CandidatesList.id);
    })

  }

  deleteConfirm(element:any){
    this.deleteElement = element
  }
  deleteCandidate(candidatelist: CandidatesList) {
    this.closeBtn.nativeElement.click();
    this.batchService.deleteCandidateData(candidatelist.id).subscribe((data: any) => {
      console.log("candidate data deleted successfully");
    })

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

  checkboxLabel(row?: CandidatesList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.candidateName + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}



