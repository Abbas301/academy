import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormArray, FormBuilder,Validators } from '@angular/forms';
import { BatchService } from '../batch.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  show = true
  show1 = false

  formShow = true;
  formHide = false;

  trainerForm = true;
  trainerExcel = false;
  searchValue:any

  batchForm!: FormGroup;
  items!: FormArray;
  mentors!: FormArray;
  trainers!: FormArray;
  candidates!: FormArray;


  batches :any;
  batchesData : any;
  clientBatches:any;
  tableData: any;


  constructor( private router:Router ,
               private formBuilder: FormBuilder ,
               private batchService:BatchService
               ) { }


  ngOnInit(): void {
    this.batchForm = new FormGroup({
      items: new FormArray([this.createItem()]),
      mentors: new FormArray([this.createMentor()]),
      trainers: new FormArray([this.createTrainer()]),
      candidates: new FormArray([this.createCandidate()]),
    });

    this.getBatch();
    this.getCbatch();

    // console.log((this.batchForm.get('mentors')as FormArray ).controls[0].get('contact'))

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      batchname: ['',[Validators.required]],
      mentor: ['',[Validators.required]]
    });
  }
  createMentor(): FormGroup {
    return this.formBuilder.group({
      name: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      contact: ['',[Validators.required,Validators.pattern('[7-9]{1}[0-9]{9}')]],
      Memail: ['',[Validators.required]]
    });
  }
  createTrainer(): FormGroup {
    return this.formBuilder.group({
      trainerName: ['',[Validators.required]],
      technology: ['',[Validators.required]],
      days: ['',[Validators.required]],
      Temail: ['',[Validators.required]]
    });
  }
  createCandidate(): FormGroup {
    return this.formBuilder.group({
      fullName: ['',[Validators.required]],
      personalEmail: ['',[Validators.required]],
      officialEmail: ['',[Validators.required]],
      mobile: ['',[Validators.required]]
    });
  }
  addItem(): void {
    this.items = this.batchForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  addMentor(): void {
    this.mentors = this.batchForm.get('mentors') as FormArray;
    this.mentors.push(this.createMentor());
  }
  addTrainer(): void {
    this.trainers = this.batchForm.get('trainers') as FormArray;
    this.trainers.push(this.createTrainer());
  }
  addCandidate(): void {
    this.candidates = this.batchForm.get('candidates') as FormArray;
    this.candidates.push(this.createCandidate());
  }

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

  getBatch() {
     return this.batchService.getBatch().subscribe((res: any) =>{
        this.batches = res;
        this.tableData = this.batches.data;
        console.log(this.tableData);

     })
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

  get candidate(): FormArray{
    return this.batchForm.get('candidates') as FormArray;
  }
  postBatch(userData:any) {

    // return this.batchService.postBatch(formData).subscribe(res =>{
    //   console.log(res);

    // })
  }

  getCbatch() {
     return this.batchService.getCbatchData().subscribe((data: any) => {
      this.clientBatches = data;
      // console.log(data);
    })
  }


  onClick(){
    this.show = true
    this.show1 = false

  }
  onClick1(){
    this.show = false
    this.show1 = true
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
sample:any
  viewCandidateList(index: string | number){
     this.sample = this.tableData[index];

    this.router.navigate(['/candidatelist/'],
    {
      queryParams:{
        batchName : this.sample.batchName,
        startDate : this.sample.startDate,
        endDate : this.sample.endDate,
        mentors : this.sample.mentors,
        trainers : this.sample.trainers,
        progress : this.sample.progress
      }
    }
    )

  }

  // get f() {
  //   return this.batchForm.get('contact')

  // }

  onSubmit(batchForm: any) {
    console.log(this.batchForm.value);
    this.batchForm.reset();
  }

  deleteBatch() {
    confirm("are you sure want to delete this ?")
  }

}

