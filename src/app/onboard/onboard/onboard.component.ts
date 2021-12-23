import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { OnboardService } from '../onboard.service';
import { ToastrService } from 'ngx-toastr';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';

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
  selected = 'internal';
  internal = true;
  client = false;
  tocPath: any;

  batchForm!: FormGroup;
  mentors!: FormArray;
  trainers!: FormArray;
  hideMat = false;
  candidates :any[] = [];

  panelOpenState = false;
  @ViewChild(MatAccordion) accordion !: MatAccordion;
  @ViewChild('driverCheckbox') driverCheckbox!: MatCheckbox;
  @ViewChildren("driverSubCheckbox") driverSubCheckbox!: QueryList<MatCheckbox>
  @ViewChild('uploadToc') uploadToc!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;

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
    { value: '30', viewValue: '30' },
    { value: '50', viewValue: '50' },
    { value: '60', viewValue: '60' },
  ];

  locations = [
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Bangalore', viewValue: 'Bangalore' },
    { value: 'Pune', viewValue: 'Pune' },
  ];
  CandidatesListData: any;
  status = 'ONBOARDED';
  onboardList = []
  array :any[] =[];
  ArrayData =[];

  constructor(private fb: FormBuilder,
              private onboardService: OnboardService,
              private toastr: ToastrService
              ) { }

  displayedColumns: string[] = ['select', 'name', 'contactNumber', 'emailId', 'degree', 'stream', 'yop', 'degreePercentage', 'jspiderBranch'];
  dataSource = new MatTableDataSource<OnboardList>();
  selection = new SelectionModel<OnboardList>(true, []);

  ngOnInit(): void {

    this.batchForm = this.fb.group({
      location: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      tocPath: new FormControl('', [Validators.required]),
      tyMentors: new FormControl('', [Validators.required]),
      batchType: new FormControl('', [Validators.required]),
      clientCompanyName: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
      mentors: new FormArray([this.createMentor()]),
      trainers: new FormArray([this.createTrainer()])
    });

    this.onboardService.getOnboardList(this.status).subscribe(res => {
      this.CandidatesListData = res;
      console.log(this.CandidatesListData);
      this.dataSource.data = this.CandidatesListData.data;

    })
  }

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

  get candidateYOP() {
    return (((this.batchForm.controls.candidates as FormArray).controls[0]) as FormGroup).controls.yop
  }

  onSelect() {
    this.internal = true;
    this.client = false
  }

  onSelect1() {
    this.internal = false;
    this.client = true
  }

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

  createMentor(): FormGroup {
    return this.fb.group({
      clientMentorName: ['', [Validators.pattern('[a-z A-Z]*')]],
      designation: [''],
      contactNo: ['', [Validators.pattern('[6-9]{1}[0-9]{9}')]],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]]
    });
  }
  createTrainer(): FormGroup {
    return this.fb.group({
      assignTrainerName: ['', [Validators.required, Validators.pattern('[a-z A-Z]*')]],
      technologies: ['', [Validators.required]],
      days: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]]
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

  deleteItem(index: any) {
    this.trainer.removeAt(index);
  }

  deleteMentorItem(index: any) {
    this.mentor.removeAt(index);
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

  checkboxLabel(row?: OnboardList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  selectedCandidates(row: any) {
    this.array.push(row)
    console.log(this.array);
  }
  remove(row: any) {
     this.array.splice(this.array.indexOf(row),1);
    // console.log(this.array);
    console.log( this.array);
  }

  uploadTOC(event: Event) {
    this.tocPath = (event.target as HTMLInputElement).files?.item(0)
  }

  addBatch(batchForm: FormGroup) {

    let file = this.tocPath
    console.log(file);
    let date = new Date(batchForm.controls.startDate.value);
    console.log(date);
    let finalDate = date.toLocaleDateString().split('/');
    let newDate = `${finalDate[2]}-${finalDate[0]}-${finalDate[1]}`
    console.log(newDate);

    // let candidatesArray = this.CandidatesListData.data;
    // console.log(candidatesArray);
    var candidates:any = []
     this.array.forEach((element:any, index:any) => {
      let obj = {candidateId:'',candidateName:'',phoneNumber:'',emailId:'',branch:'',degreeAggregate:'',degree:'',stream:'',yop:'',tenthPercentage:0,twelfthPercentage:'',masterAggregate:'',profileId:''}
      
      // obj.candidateId = element.candidateId
      obj.candidateName = element.name;
      obj.phoneNumber = element.contactNumber
      obj.degreeAggregate = element.degreePercentage
      obj.emailId = element.emailId
      obj.branch = element.jspiderBranch
      obj.degree = element.degree
      obj.stream = element.stream
      obj.yop = element.yop
      obj.tenthPercentage = element.tenthPercentage
      obj.twelfthPercentage = element.twelfthPercentage
      obj.masterAggregate = element.masterDegreeAggregate
      obj.profileId = element.profileId
      candidates.push(obj)     
    });
    console.log(candidates);

    let batchDetails = {
      location: batchForm.controls.location.value,
      technology: batchForm.controls.technology.value,
      startDate: newDate,
      tyMentors: batchForm.controls.tyMentors.value,
      batchType: batchForm.controls.batchType.value,
      clientCompanyName: batchForm.controls.clientCompanyName.value,
      clientMentorList: this.mentor.value,
      assignTrainerList: this.trainer.value,
      candidateList: candidates,
    };
    let formData = new FormData();
    formData.append('batchDetails', JSON.stringify(batchDetails))
    formData.append('tocFile', file)
    this.onboardService.postBatchData(formData).subscribe((res: any) => {
      console.log(res);
      
      console.log("batch details added successfully");
      if (res.error == false) {
        this.toastr.success('Batch Details Added Successfully');
        this.resetButton.nativeElement.click();
        batchForm.reset();
      }
    },err => {
      console.log(err,'err');
      this.toastr.error(err.message);
    })
  }

}
