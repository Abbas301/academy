import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BatchService } from '../batch.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { MatButton } from '@angular/material/button';

export class CsvData {
  public candidateId: string;
  public candidateName: string;
  public emailId: string;
  public stream: string;
  public tenthPercentage: string;
  public degreeAggregate: string;
  public branch: string;
  public phoneNumber: string;
  public degree: string;
  public yop: string;
  public twelfthPercentage: string;
  public masterAggregate: string;
  public profileId: string;
}


@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  show = true
  show1 = false
  formShow = false;
  formHide = true;
  searchValue: any
  selected = 'internal';
  internal = true;
  client = false
  batchForm!: FormGroup;
  message!: '';
  error = true;

  items!: FormArray;
  mentors!: FormArray;
  trainers!: FormArray;
  candidates!: FormArray;
  internalBatch: any;
  clientBatch: any;
  tocPath: any;


  batches: any;
  batchesData: any;
  tableData: any;
  index: any;
  @ViewChild('uploadToc') uploadToc!: ElementRef
  @ViewChild('headerCheckbox') headerCheckbox!: MatCheckbox
  @ViewChildren('bodyCheckbox') bodyCheckbox!: QueryList<MatCheckbox>
  @ViewChildren('batchType') batchType!: QueryList<MatRadioButton>
  @ViewChild('closeModal', { read: ElementRef }) closeModal: ElementRef;
  @ViewChildren('resetData') resetData!: ElementRef;
  candidateList: any;
  clientMentor: any[] = [];
  assignTrainers: any[] = [];
  clientTrainers: any[] = [];
  errMsg: string;
  json: any;

  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;
  activationFile: File;
  formDataActivation: FormData;
  csvResult: any[];
  trainerDetails: any;
  TrainerData: any;
  trainerTechnology: any;
  file: string;
  fileName: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private batchService: BatchService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.getBatch();
    this.getTrainerDetails();
    this.getExcel();

    this.batchForm = this.formBuilder.group({
      location: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      tocPath: new FormControl('', [Validators.required]),
      tyMentors: new FormControl('', [Validators.required]),
      batchType: new FormControl('', [Validators.required]),
      deliveryManager: new FormControl('', [Validators.required]),
      clientCompanyName: new FormControl('', [Validators.pattern('[a-z A-Z]*')]),
      mentors: new FormArray([this.createMentor()]),
      trainers: new FormArray([this.createTrainer()]),
      candidates: new FormArray([this.createCandidate()]),
      uploadXL: new FormControl('',),
    });

    (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('tenthPercentage').valueChanges.subscribe(res =>{
      if(res<35) {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('tenthPercentage').setErrors({tenthPercentage:true})
      } else {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('tenthPercentage').setErrors(null)
      }
    });

    (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('degreeAggregate').valueChanges.subscribe(res =>{
      if(res<35) {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('degreeAggregate').setErrors({degreeAggregate:true})
      } else {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('degreeAggregate').setErrors(null)
      }
    });

    (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('twelfthPercentage').valueChanges.subscribe(res =>{
      if(res<35) {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('twelfthPercentage').setErrors({twelfthPercentage:true})
      } else {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('twelfthPercentage').setErrors(null)
      }
    });

    (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('masterAggregate').valueChanges.subscribe(res =>{
      if(res<35) {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('masterAggregate').setErrors({masterAggregate:true})
      } else {
        (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).get('masterAggregate').setErrors(null)
      }
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
      clientMentorName: ['', [Validators.pattern('[a-z A-Z]*')]],
      designation: [''],
      contactNo: ['', [Validators.pattern('[6-9]{1}[0-9]{9}')]],
      emailId: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]]
    });
  }
  createTrainer(): FormGroup {
    return this.formBuilder.group({
      assignTrainerName: ['', [Validators.required, Validators.pattern('[a-z A-Z]*')]],
      technologies: ['', [Validators.required]],
      days: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]]
    });
  }
  createCandidate(): FormGroup {
    return this.formBuilder.group({
      candidateName: ['', [Validators.required, Validators.pattern('[a-z A-Z]*')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}')]],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      degree: ['', [Validators.required,Validators.pattern('[a-z A-Z]*')]],
      stream: ['', [Validators.required,Validators.pattern('[a-z A-Z]*')]],
      yop: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      tenthPercentage: ['', [Validators.required,Validators.pattern('[0-9]{2}')]],
      twelfthPercentage: ['', [Validators.required,Validators.pattern('[0-9]{2}')]],
      degreeAggregate: ['', [Validators.required,Validators.pattern('[0-9]{2}')]],
      masterAggregate: ['', [Validators.pattern('[0-9]{2}')]],
      branch: ['', [Validators.required]],
      profileId: ['',[Validators.pattern('[a-z A-Z 0-9]*')]],
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

  technologies = [
    { value: 'JAVA_WITH_ANGULAR', viewValue: 'JAVA_WITH_ANGULAR' },
    { value: 'JAVA_WITH_REACT', viewValue: 'JAVA_WITH_REACT' }
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
    { value: 'Basavangudi', viewValue: 'Basavangudi' },
  ];

  // VAlidation get methods

  get clientCompanyName() {
    return this.batchForm.controls.clientCompanyName as FormControl
  }

  get contactNo() {
    return (this.batchForm.controls.mentors as FormArray).controls[0].get('contactNo') as FormControl
  }

  get clientMentorName() {
    return (this.batchForm.controls.mentors as FormArray).controls[0].get('clientMentorName') as FormControl
  }

  get clientMentorEmailId() {
    return (this.batchForm.controls.mentors as FormArray).controls[0].get('emailId') as FormControl
  }

  get assignTrainerName() {
    return (((this.batchForm.controls.trainers as FormArray).controls[0]) as FormGroup).controls.assignTrainerName
  }

  get assignTrainerEmailID() {
    return (((this.batchForm.controls.trainers as FormArray).controls[0]) as FormGroup).controls.emailId
  }

  get candidateName() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.candidateName
  }

  get candidatePhoneNumber() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.phoneNumber
  }

  get candidateEmail() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.emailId
  }

  get candidateYOP() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.yop
  }

  get degree() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.degree
  }

  get stream() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.stream
  }

  get tenthPercentage() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.tenthPercentage
  }

  get twelfthPercentage() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.twelfthPercentage
  }

  get degreeAggregate() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.degreeAggregate
  }

  get masterAggregate() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.masterAggregate
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

  get candidateExcel(): FormControl {
    return this.batchForm.get('candidateExcel') as FormControl;
  }

  deleteItem(index: any) {
    this.trainer.removeAt(index);
  }

  deleteMentorItem(index: any) {
    this.mentor.removeAt(index);
  }

  deleteCandidateItem(index: any) {
    this.candidate.removeAt(index);
  }


  getBatch() {
    return this.batchService.getBatchData().subscribe((res: any) => {
      this.batches = res;
      this.batchesData = this.batches.data;
      // internal Data
      let interBatchData = this.batches.data;
      this.internalBatch = interBatchData.filter((batch: any) => {
        return batch.batchType === 'INTERNAL'
      })
      console.log(this.internalBatch, 'internal');

      for (let i = 0; i < this.internalBatch.length; i++) {
        this.assignTrainers[i] = [];
        for (let j = 0; j < this.internalBatch[i]?.assignTrainerList.length; j++) {
          this.assignTrainers[i].push(this.internalBatch[i].assignTrainerList[j]?.assignTrainerName);
        }
      }
      // client Data
      let clientBatchData = this.batches.data;
      this.clientBatch = clientBatchData.filter((batch: any) => {
        return batch.batchType === 'CLIENT'
      })
      console.log(this.clientBatch, 'client');
      for (let i = 0; i < this.clientBatch.length; i++) {
        this.clientTrainers[i] = [];
        for (let j = 0; j < this.clientBatch[i]?.assignTrainerList.length; j++) {
          this.clientTrainers[i].push(this.clientBatch[i].assignTrainerList[j]?.assignTrainerName);
        }
      }

      for (let i = 0; i < this.clientBatch.length; i++) {
        this.clientMentor[i] = [];
        for (let j = 0; j < this.clientBatch[i]?.clientMentorList.length; j++) {
          this.clientMentor[i].push(this.clientBatch[i].clientMentorList[j]?.clientMentorName);
        }
      }
      console.log(this.clientMentor);
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
  sample: any
  viewCandidateList(index: number) {

    this.sample = this.internalBatch[index];
    console.log(this.sample);

    this.router.navigate(['/candidatelist/'], {
      queryParams: {
        batchName: this.sample.batchName,
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
      }
    })

  }

  addBatch(batchForm: FormGroup) {
    console.log(batchForm.value);
    let file = this.tocPath
    console.log(file);
    let date = new Date(batchForm.controls.startDate.value);
    console.log(date);
    var dateObj = new Date(date);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
    console.log(this.formHide);
    let batchDetails = {
      location: batchForm.controls.location.value,
      technology: batchForm.controls.technology.value,
      startDate: momentString,
      tyMentors: [batchForm.controls.tyMentors.value],
      batchType: batchForm.controls.batchType.value,
      deliveryManager: batchForm.controls.deliveryManager.value,
      clientCompanyName: batchForm.controls.clientCompanyName.value,
      clientMentorList: this.mentor.value,
      assignTrainerList: this.trainer.value,
      candidateList: this.formHide ? this.csvResult : this.candidate.value,
    };
    let formData = new FormData();
    formData.append('batchDetails', JSON.stringify(batchDetails))
    formData.append('tocFile', file)
    this.batchService.postBatchData(formData).subscribe((res: any) => {
      console.log("batch details added successfully");
        this.toastr.success('Batch Details Added Successfully');
        batchForm.reset();
        this.closeModal.nativeElement.click();
        this.getBatch();
        this.refreshFile();
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
  }

  resetFormData() {
     this.batchForm.reset();
     this.refreshFile();
  }

  uploadTOC(event: Event) {
    this.tocPath = (event.target as HTMLInputElement).files?.item(0);
    this.fileName = (event.target as HTMLInputElement).files[0].name;
  }

  // upload file

  onChoosingActivationFile(event: Event) {
    this.activationFile = (event.target as HTMLInputElement).files[0];
    if (this.activationFile && this.activationFile.size < 3000000) {
      this.formDataActivation = new FormData()
      this.formDataActivation.append('filename', this.activationFile);
      this.formDataActivation.append('document_type', 'xls');
      let reader = new FileReader();
      reader.readAsText(this.activationFile);
      reader.onload = () => {
        this.csvResult = [];
        let csv = reader.result;
        console.log(reader.result);
        let lines = csv.toString().split('\r\n');
        console.log(lines);
        let headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
          let obj = {};
          let currentLines = lines[i].split(',');
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLines[j];
          }
          this.csvResult.push(obj);
        }
        this.csvResult.pop();
        this.csvResult.forEach((element, i) => {
          delete element['']
          delete element["\r"]
          return element;
        });
        console.log(this.csvResult);
      }
      this.file = (event.target as HTMLInputElement).files[0].name;
    } else {
      this.toastr.warning('File Size is more than 3MB', 'Warning');
    }
  }
  refreshFile(){
    this.file = null;
    this.fileName = null;
  }

  saveToExcel() {
    this.batchService.exportAsExcelFile(this.json['data'], 'Candidate List','xls');
  }

  getExcel() {
    this.batchService.getJson().subscribe(res => {
      this.json = res;
    })
  }

  // Dropdown Patches
  getTrainerDetails() {
    this.batchService.getTrainerData().subscribe((res: any) => {
      this.trainerDetails = res;
      this.TrainerData = this.trainerDetails.data
      console.log(this.TrainerData);
    })
  }

  onChangeTrainerName(event: any, batchForm: FormGroup, index: number) {
    console.log(this.TrainerData);
    this.TrainerData.forEach((ele) => {
      if (ele.trainerName === event.value) {
        const technology = []
        console.log(ele.trainerTechnologies);
        ele.trainerTechnologies.forEach(e => {
          technology.push(e.technology)
        });
        console.log(technology);
        let emailId = ele.emailId;
        (batchForm.get('trainers') as FormArray).controls[index].get('technologies').patchValue(technology);
        (batchForm.get('trainers') as FormArray).controls[index].get('emailId').setValue(emailId);
      }
    })
  }

}

