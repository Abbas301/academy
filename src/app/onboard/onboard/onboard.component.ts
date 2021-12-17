import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { OnboardService } from '../onboard.service';

export interface OnboardList {
  name: string;
  contactNumber: string;
  emailId: string;
  degree: string;
  stream: string;
  yop: string;
  degreePercentage: string;
  jspiderBranch: string;
}

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {

  onboardForm!: FormGroup;
  searchValue: any

  formShow = true;
  formHide = false;

  trainerForm = true;
  trainerExcel = false;

  batchForm!: FormGroup;
  mentors!: FormArray;
  trainers!: FormArray;
  hideMat = false;

  panelOpenState = false;
  @ViewChild(MatAccordion) accordion !: MatAccordion;
  @ViewChild('driverCheckbox') driverCheckbox!: MatCheckbox;
  @ViewChildren("driverSubCheckbox") driverSubCheckbox!: QueryList<MatCheckbox>

  tyMentor = [
    { value: 'pavan', viewValue: 'pavan' },
    { value: 'gangadhar', viewValue: 'gangadhar' },
    { value: 'divya', viewValue: 'divya' },
    { value: 'manohar', viewValue: 'manohar' },
    { value: 'rajesh', viewValue: 'rajesh' },
  ];

  technologies = [
    { value: 'HTML', viewValue: 'HTML' },
    { value: 'CSS', viewValue: 'CSS' },
    { value: 'Angular', viewValue: 'Angular' },
    { value: 'React', viewValue: 'React' },
    { value: 'Node JS', viewValue: 'Node JS' },
    { value: 'Mongo DB', viewValue: 'Mongo DB' },
  ];

  days = [
    { value: '30 days', viewValue: '30 days' },
    { value: '50 days', viewValue: '50 days' },
    { value: '60 days', viewValue: '60 days' },
  ];

  locations = [
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Bangalore', viewValue: 'Bangalore' },
    { value: 'Pune', viewValue: 'Pune' },
  ];
  CandidatesListData: any;
  status = 'ONBOARDED';
  onboardList = []

  constructor( private fb: FormBuilder,
               private onboardService:OnboardService) { }

displayedColumns: string[] = ['select', 'name', 'contactNumber', 'emailId', 'degree', 'stream', 'yop', 'degreePercentage', 'jspiderBranch'];
dataSource = new MatTableDataSource<OnboardList>();
selection = new SelectionModel<OnboardList>(true, []);

  ngOnInit(): void {
    this.batchForm = this.fb.group({
      location: new FormControl(''),
      technology: new FormControl(''),
      startDate: new FormControl(''),
      toc: new FormControl(''),
      tyMentor: new FormControl(''),
      mentors: new FormArray([this.createMentor()]),
      trainers: new FormArray([this.createTrainer()])
    });

    this.onboardService.getOnboardList(this.status).subscribe(res => {      
      this.CandidatesListData = res;
      console.log(this.CandidatesListData);
      this.dataSource.data = this.CandidatesListData.data;

    })
  }
// onclick(element:OnboardList) {
// console.log(element);

// }
  displayData() {
    this.hideMat = !this.hideMat
  }
  selectAll() {
    if (this.driverCheckbox.checked) {
      this.driverSubCheckbox.forEach(element => {
        element.checked = true;
      })
    }
    else {
      this.driverSubCheckbox.forEach(element => {
        element.checked = false;
      })
    }
  }

resetForm() {
  this.batchForm.reset()
}

createMentor(): FormGroup {
  return this.fb.group({
    name: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    contact: ['', [Validators.required, Validators.pattern('[7-9]{1}[0-9]{9}')]],
    Memail: ['', [Validators.required]]
  });
}
createTrainer(): FormGroup {
  return this.fb.group({
    trainerName: ['', [Validators.required]],
    technology: ['', [Validators.required]],
    days: ['', [Validators.required]],
    Temail: ['', [Validators.required]]
  });
}

addMentor(): void {
  this.mentors = this.batchForm.get('mentors') as FormArray;
  this.mentors.push(this.createMentor());
}
addTrainer(): void {
  this.trainers = this.batchForm.get('trainers') as FormArray;
  this.trainers.push(this.createTrainer());
}

form() {
  this.formShow = true
  this.formHide = false

}
excel() {
  this.formShow = false
  this.formHide = true
}
trainersForm() {
  this.trainerForm = true
  this.trainerExcel = false

}
trainersExcel() {
  this.trainerForm = false
  this.trainerExcel = true
}

  get contact() {
  return (this.batchForm.get('mentors') as FormArray).controls[0].get('contact') as FormControl
}

  get item(): FormArray {
  return this.batchForm.get('items') as FormArray;
}

  get mentor(): FormArray {
  return this.batchForm.get('mentors') as FormArray;
}

  get trainer(): FormArray {
  return this.batchForm.get('trainers') as FormArray;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
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

checkboxLabel(row ?: OnboardList): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
}

onSubmit(onboardForm: any) {
  console.log(onboardForm.value);

}
}
