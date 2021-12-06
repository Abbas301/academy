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
const ELEMENT_DATA: CandidatesList[] = [
  {
    candidateName: "abbas",
    phoneNumber: "8546921456",
    emailId: "abbas123@gmail.com",
    degree: "B.tech",
    stream: "mechanical",
    yop: "2020",
    tenthPercentage: "92",
    twelfthPercentage: "79",
    degreeAggregate: "73",
    masterAggregate: "NA",
    branch: "Hebbal",
    profileId: "TYC042654",
    id: "396"
  },
  {
    id: "754",
    candidateName: "sharath",
    phoneNumber: "8575785958",
    emailId: "sharath@gmail.com",
    degree: "B.tech",
    stream: "computers",
    yop: "2019",
    tenthPercentage: "92",
    twelfthPercentage: "84",
    degreeAggregate: "75",
    masterAggregate: "73",
    branch: "Hebbal",
    profileId: "TYC046352"
  },
  {
    id: "879",
    candidateName: "john burg",
    phoneNumber: "6300580835",
    emailId: "john134@gmail.com",
    degree: "B.tech",
    tenthPercentage: "92",
    twelfthPercentage: "79",
    stream: "computer science",
    yop: "2020",
    masterAggregate: "NA",
    degreeAggregate: "73",
    branch: "BTM",
    profileId: "TYC042666"
  },
  {
    id: "125",
    candidateName: "sanjay Gowda",
    phoneNumber: "9390522542",
    emailId: "sanjay@123gmail.com",
    degree: "B.tech",
    tenthPercentage: "92",
    twelfthPercentage: "79",
    stream: "computer science",
    yop: "2020",
    masterAggregate: "NA",
    degreeAggregate: "73",
    branch: "BTM",
    profileId: "TYC042668"
  }
]

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {

  details: any = []
  // CandidatesList: any;
  Cform !: FormGroup;
  index: any;
  id: any;

  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'candidateName', 'phoneNumber', 'emailId', 'degree', 'stream', 'yop', 'degreeAggregate', 'branch', 'deleteEmployee'];
  dataSource = new MatTableDataSource<CandidatesList>(ELEMENT_DATA);
  selection = new SelectionModel<CandidatesList>(true, []);
  deleteElement: any;


  constructor(private router: Router,
    private ActivatedRouter: ActivatedRoute,
    private batchService: BatchService
  ) { }

  ngOnInit(): void {
    // this.getCandidate();


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
    // return this.batchService.getCandidate().subscribe((data: any) => {
    //   this.CandidatesList = data;
    //   console.log(this.CandidatesList);
    //   this.dataSource.data = this.CandidatesList
    //   this.dataSource.sort = this.sort
    //   this.dataSource.paginator = this.paginator
    // })
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
    // this.batchService.updatedCandidate(this.id, Cform.value).subscribe((data: any) => {
    //   console.log("candidate details updated successfully");
    //   console.log(this.CandidatesList.id);
    // })

  }

  deleteConfirm(element: any) {
    this.deleteElement = element
  }
  deleteCandidate(candidatelist: CandidatesList) {
    this.closeBtn.nativeElement.click();
    // this.batchService.deleteCandidateData(candidatelist.id).subscribe((data: any) => {
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



