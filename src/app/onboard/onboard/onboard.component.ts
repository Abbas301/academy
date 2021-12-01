import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface CandidatesList {
  name: string;
  contact: number;
  mail: string;
  degree: string;
  stream: string;
  yop: string;
  aggregate: string;
  branch: string;
}

const ELEMENT_DATA: CandidatesList[] = [
  {name:'sharath', contact:1234567899,mail:'sharath@gmail.com',degree:'B.E',stream:'CSE',yop:'30/8/1997',aggregate:'90%',branch:'CSE' },
  {name:'abbas', contact:1234567899,mail:'sharath@gmail.com',degree:'B.E',stream:'CSE',yop:'30/8/1997',aggregate:'90%',branch:'CSE' },
  
];
@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {

  onboardForm!:FormGroup;
  searchValue: any
  Locations= [
    {value: 'Banglore', viewValue: 'Banglore'},
    {value: 'chennai', viewValue: 'chennai'},
    {value: 'Hyderabad', viewValue: 'Hyderabad'},
  ];
  technologies = [
    {value: 'Frontend', viewValue: 'Frontend'},
    {value: 'Backend', viewValue: 'Backend'},
    {value: 'Database', viewValue: 'Database'}
  ];
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.onboardForm =this.fb.group({
      Location:['',Validators.required],
      date:['',Validators.required],
      technologies:['',Validators.required]
    })
  }

 
  displayedColumns: string[] = ['select', 'name', 'contact', 'mail','degree','stream','yop','aggregate','branch'];
  dataSource = new MatTableDataSource<CandidatesList>(ELEMENT_DATA);
  selection = new SelectionModel<CandidatesList>(true, []);
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CandidatesList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }


  onSubmit(onboardForm:any){
    console.log(onboardForm.value);
    
  }
}
