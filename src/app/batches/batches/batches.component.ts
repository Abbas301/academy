import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BatchService } from '../batch.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

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
  searchValue: any

  selected = 'internal';
  internal = true;
  client = false

  batchForm!: FormGroup;

  items!: FormArray;
  mentors!: FormArray;
  trainers!: FormArray;
  candidates!: FormArray;
  internalBatch: any;
  clientBatch: any;

  batches: any;
  batchesData: any;
  // clientBatches:any;
  tableData: any;
  index: any;
  @ViewChild('headerCheckbox') headerCheckbox!: MatCheckbox
  @ViewChildren('bodyCheckbox') bodyCheckbox!: QueryList<MatCheckbox>
  @ViewChildren('batchType') batchType!: QueryList<MatRadioButton>
  candidateList: any;
  clientMentor: any[] = [];
  assignTrainers: any[] = [];
  clientTrainers: any[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private batchService: BatchService
  ) { }


  ngOnInit(): void {

    this.getBatch();

    this.batchForm = this.formBuilder.group({
      location: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      toc: new FormControl('', [Validators.required]),
      tyMentors: new FormControl('', [Validators.required]),
      batchType: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      mentors: new FormArray([this.createMentor()]),
      trainers: new FormArray([this.createTrainer()]),
      candidates: new FormArray([this.createCandidate()]),
    });
  }

  onSelect() {
    this.internal = true;
    this.client = false
  }

  onSelect1() {
    this.internal = false;
    this.client = true
  }

  selectAll() {
    if ((this.headerCheckbox as MatCheckbox).checked) {
      this.bodyCheckbox.forEach((element) => {
        (element as MatCheckbox).checked = true
      })
    }
    else {
      this.bodyCheckbox.forEach((element) => {
        (element as MatCheckbox).checked = false
      })
    }
  }

  createMentor(): FormGroup {
    return this.formBuilder.group({
      clientMentorName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      contactNo: ['', [Validators.required, Validators.pattern('[7-9]{1}[0-9]{9}')]],
      emailId: ['', [Validators.required]]
    });
  }
  createTrainer(): FormGroup {
    return this.formBuilder.group({
      assignTrainerName: ['', [Validators.required]],
      technology: ['', [Validators.required]],
      days: ['', [Validators.required]],
      Temail: ['', [Validators.required]]
    });
  }
  createCandidate(): FormGroup {
    return this.formBuilder.group({
      candidateName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      stream: ['', [Validators.required]],
      yop: ['', [Validators.required]],
      tenthPercentage: ['', [Validators.required]],
      twelfthPercentage: ['', [Validators.required]],
      degreeAggregate: ['', [Validators.required]],
      masterAggregate: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      profileId: ['', [Validators.required]],
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
  addCandidate(): void {
    this.candidates = this.batchForm.get('candidates') as FormArray;
    this.candidates.push(this.createCandidate());
  }

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

  batchTypes = [
    { value: 'internal', viewValue: 'internal' },
    { value: 'client', viewValue: 'client' },
  ]

  branchs = [
    { value: 'Hebbal', viewValue: 'Hebbal' },
    { value: 'BTM', viewValue: 'BTM' },
    { value: 'bBasavangudi', viewValue: 'bBasavangudi' },
  ];

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

  get candidate(): FormArray {
    return this.batchForm.get('candidates') as FormArray;
  }
  postBatch(userData: any) {

  }

  getBatch() {
    return this.batchService.getBatchData().subscribe((res: any) => {
      this.batches = res;
      this.batchesData = this.batches.data;
      // console.log(this.batches.data);

      let interBatchData = this.batches.data;
      // internal Data
      this.internalBatch = interBatchData.filter((batch: any) => {
        return batch.batchType === 'internal'
      })
      // console.log(this.internalBatch, 'internal');

      for (let i = 0; i < this.internalBatch.length; i++) {
        this.assignTrainers[i] = [];
        for (let j = 0; j < this.internalBatch[i]?.assignTrainerList.length; j++) {
          this.assignTrainers[i].push(this.internalBatch[i].assignTrainerList[j]?.assignTrainerName);
        }
      }

      // client Data
      let clientBatchData = this.batches.data;
      this.clientBatch = clientBatchData.filter((batch: any) => {
        return batch.batchType === 'client'
      })
      // console.log(this.clientBatch, 'client');
      for (let i = 0; i < this.clientBatch.length; i++) {
        this.clientTrainers[i] = [];
        for (let j = 0; j < this.clientBatch[i]?.assignTrainerList.length; j++) {
          this.clientTrainers[i].push(this.clientBatch[i].assignTrainerList[j]?.assignTrainerName);
        }
      }

      for (let i = 0; i < this.batchesData.length; i++) {
        this.clientMentor[i] = [];
        for (let j = 0; j < this.batchesData[i]?.clientMentorList.length; j++) {
          this.clientMentor[i].push(this.batchesData[i].clientMentorList[j]?.clientMentorName);
        }
      }
    })
  }

  postBatchData(userData:FormGroup) {
    if(userData.valid){
      const formData = {

        location: userData.controls.location.value,
        technology: userData.controls.technology.value,
        startDate:  userData.controls.startDate.value,
        toc : userData.controls.tenthPercentage.value,
        tyMentors: userData.controls.degreeAggregate.value,
        batchType: userData.controls.branch.value,
        companyName : userData.controls.phoneNumber.value,
        degree: userData.controls.degree.value,
        yop: userData.controls.yop.value,
        twelfthPercentage: userData.controls.twelfthPercentage.value,
        masterAggregate: userData.controls.masterAggregate.value,
        profileId: userData.controls.profileId.value,
        batchName: userData.controls.batchName.value,
        batchId: userData.controls.batchId.value,

      };
     this.batchService.postBatchData(formData).subscribe((data) => {
      console.log("candidate details posted successfully");
      console.log(data);
      userData.reset();
    })
  }
  }

  onClick() {
    this.show = true
    this.show1 = false

  }
  onClick1() {
    this.show = false
    this.show1 = true
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
 sample: any
  viewCandidateList(index: number) {

    this.sample = this.internalBatch[index];
    console.log(this.sample);

    this.router.navigate(['/candidatelist/'], {
      queryParams: {
        batchName: this.sample.batchName
      }
    })
  }
clientsample: any;
  viewClientCandidateList(index: number) {

    this.clientsample = this.clientBatch[index]
    console.log(this.client);

    this.router.navigate(['/candidatelist/'], {
      queryParams: {
        batchName: this.clientsample.batchName
      }
    })
  }

  onSubmit(batchForm: any) {
    console.log(this.batchForm.value);
    this.batchForm.reset();
  }

}

