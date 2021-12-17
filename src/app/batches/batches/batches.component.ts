import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BatchService } from '../batch.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { data } from 'jquery';

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
  tocPath: any;
  //  tyTrainers = clientTrainers[i].join(',')


  batches: any;
  batchesData: any;
  // clientBatches:any;
  tableData: any;
  index: any;
  @ViewChild('uploadToc') uploadToc!: ElementRef
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
      tocPath: new FormControl('', [Validators.required]),
      tyMentors: new FormControl('', [Validators.required]),
      batchType: new FormControl('', [Validators.required]),
      clientCompanyName: new FormControl('', [Validators.required]),
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
      clientMentorName: ['',[Validators.pattern('[a-z A-Z]')]],
      designation: [''],
      contactNo: ['',[Validators.pattern('[6-9]{1}[0-9]{9}')]],
      emailId: ['']
    });
  }
  createTrainer(): FormGroup {
    return this.formBuilder.group({
      assignTrainerName: ['', [Validators.required]],
      technologies: ['', [Validators.required]],
      days: ['', [Validators.required]],
      emailId: ['', [Validators.required]]
    });
  }
  createCandidate(): FormGroup {
    return this.formBuilder.group({
      candidateName: ['', [Validators.required,Validators.pattern('[a-z A-Z]')]],
      phoneNumber: ['', [Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}')]],
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
    { value: 30, viewValue: 30 },
    { value: 50, viewValue: 50 },
    { value: 60, viewValue: 60 },
  ];

  locations = [
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Bangalore', viewValue: 'Bangalore' },
    { value: 'Pune', viewValue: 'Pune' },
  ];

  branchs = [
    { value: 'Hebbal', viewValue: 'Hebbal' },
    { value: 'BTM', viewValue: 'BTM' },
    { value: 'bBasavangudi', viewValue: 'bBasavangudi' },
  ];

  get contact() {
    return (this.batchForm.get('mentors') as FormArray).controls[0].get('contact') as FormControl
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


  getBatch() {
    return this.batchService.getBatchData().subscribe((res: any) => {
      this.batches = res;
      this.batchesData = this.batches.data;
      // console.log(this.batches.data);

      let interBatchData = this.batches.data;
      // internal Data
      this.internalBatch = interBatchData.filter((batch: any) => {
        return batch.batchType === 'INTERNAL'
      })
      // console.log(this.internalBatch, 'internal');

      for (let i = 0; i < this.internalBatch.length; i++) {
        this.assignTrainers[i] = [];
        for (let j = 0; j < this.internalBatch[i]?.assignTrainerList.length; j++) {
          this.assignTrainers[i].push(this.internalBatch[i].assignTrainerList[j]?.assignTrainerName);
          // let assignTrainers =
        }
      }

      // client Data
      let clientBatchData = this.batches.data;
      this.clientBatch = clientBatchData.filter((batch: any) => {
        return batch.batchType === 'CLIENT'
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
        batchName: this.sample.batchName,
        // tyMentors:this.batchesData[index]?.tyMentors
      }
    })
  }
  clientsample: any;
  viewClientCandidateList(index: number) {

    this.clientsample = this.clientBatch[index]
    console.log(this.clientsample);

    this.router.navigate(['/candidatelist/'], {
      queryParams: {
        batchName: this.clientsample.batchName,
        // clientMentorList:this.clientBatch.clientMentorList
      }
    })

  }

  addBatch(batchForm: FormGroup) {

      console.log(batchForm.value);
      let file = this.tocPath
      console.log(file);
      let date = new Date(batchForm.controls.startDate.value);
      console.log(date);
      let finalDate = date.toLocaleDateString().split('/');
      let newDate = `${finalDate[2]}-${finalDate[0]}-${finalDate[1]}`
      console.log(newDate);

      let batchDetails = {
        location: batchForm.controls.location.value,
        technology: batchForm.controls.technology.value,
        startDate: newDate,
        tyMentors: batchForm.controls.tyMentors.value,
        batchType: batchForm.controls.batchType.value,
        clientCompanyName: batchForm.controls.clientCompanyName.value,
        clientMentorList:this.mentor.value,
        assignTrainerList:this.trainer.value,
        candidateList:this.candidate.value,
      };
      let formData = new FormData();
      formData.append('batchDetails',JSON.stringify(batchDetails))
      formData.append('tocFile',file)
      this.batchService.postBatchData(formData).subscribe(res => {
        console.log("batch details added successfully");
        batchForm.reset();
        this.getBatch();
      })
    }
    uploadTOC(event: Event){
      this.tocPath = (event.target as HTMLInputElement).files?.item(0)
    }
}

