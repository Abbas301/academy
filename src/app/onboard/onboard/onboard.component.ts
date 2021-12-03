import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  formShow = true;
  formHide = false;

  trainerForm = true;
  trainerExcel = false;

  batchForm!: FormGroup;
  items!: FormArray;
  mentors!: FormArray;
  trainers!: FormArray;

  tyMentor = [
    {value: 'pavan', viewValue: 'pavan'},
    {value: 'gangadhar', viewValue: 'gangadhar'},
    {value: 'divya', viewValue: 'divya'},
    {value: 'manohar', viewValue: 'manohar'},
    {value: 'rajesh', viewValue: 'rajesh'},
  ];

  technologies = [
    {value: 'HTML', viewValue: 'HTML'},
    {value: 'CSS', viewValue: 'CSS'},
    {value: 'Angular', viewValue: 'Angular'},
    {value: 'React', viewValue: 'React'},
    {value: 'Node JS', viewValue: 'Node JS'},
    {value: 'Mongo DB', viewValue: 'Mongo DB'},
  ];

  days = [
    {value: '30 days', viewValue: '30 days'},
    {value: '50 days', viewValue: '50 days'},
    {value: '60 days', viewValue: '60 days'},
  ];

  locations = [
    {value: 'Hyderabad', viewValue: 'Hyderabad'},
    {value: 'Bangalore', viewValue: 'Bangalore'},
    {value: 'Pune', viewValue: 'Pune'},
  ];


  constructor(private fb:FormBuilder) { }

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
  }
  resetForm(){
    this.batchForm.reset()
  }

  createMentor(): FormGroup {
    return this.fb.group({
      name: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      contact: ['',[Validators.required,Validators.pattern('[7-9]{1}[0-9]{9}')]],
      Memail: ['',[Validators.required]]
    });
  }
  createTrainer(): FormGroup {
    return this.fb.group({
      trainerName: ['',[Validators.required]],
      technology: ['',[Validators.required]],
      days: ['',[Validators.required]],
      Temail: ['',[Validators.required]]
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

  form(){
    this.formShow = true
    this.formHide = false

  }
  excel(){
    this.formShow = false
    this.formHide = true
  }
  trainersForm(){
    this.trainerForm = true
    this.trainerExcel = false

  }
  trainersExcel(){
    this.trainerForm = false
    this.trainerExcel = true
  }

  get contact(){
    return (this.batchForm.get('mentors')as FormArray ).controls[0].get('contact') as FormControl
  }

  get item(): FormArray{
    return this.batchForm.get('items') as FormArray;
  }

  get mentor(): FormArray{
    return this.batchForm.get('mentors') as FormArray;
  }

  get trainer(): FormArray{
    return this.batchForm.get('trainers') as FormArray;
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
