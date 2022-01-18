import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { OnboardService } from '../onboard.service';
import { ToastrService } from 'ngx-toastr';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import * as moment from 'moment';



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
  selected = 'INTERNAL';
  internal = true;
  client = false;
  tocPath: any;

  batchForm!: FormGroup;
  mentors!: FormArray;
  trainers!: FormArray;
  hideMat = false;
  candidates: any[] = [];

  panelOpenState = false;
  @ViewChild(MatAccordion) accordion !: MatAccordion;
  @ViewChild('driverCheckbox') driverCheckbox!: MatCheckbox;
  @ViewChildren("driverSubCheckbox") driverSubCheckbox!: QueryList<MatCheckbox>
  @ViewChild('uploadToc') uploadToc!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;
  @ViewChild('closeModal', { read: ElementRef }) closeModal!: ElementRef;
  @ViewChild('headerCheckbox') headerCheckbox!: MatCheckbox;

  technologies = [
    { value: 'JAVA_WITH_ANGULAR', viewValue: 'JAVA_WITH_ANGULAR' },
    { value: 'JAVA_WITH_REACT', viewValue: 'JAVA_WITH_REACT' }
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
  array: any[] = [];
  ArrayData = [];
  trainerDetails: any;
  TrainerData: any;
  fileName: string;

  constructor(private fb: FormBuilder,
    private onboardService: OnboardService,
    private toastr: ToastrService,
  ) { }

  displayedColumns: string[] = ['select', 'name', 'contactNumber', 'emailId', 'degree', 'stream', 'yop', 'degreePercentage', 'jspiderBranch'];
  dataSource = new MatTableDataSource<OnboardList>();
  selection = new SelectionModel<OnboardList>(true, []);

  ngOnInit(): void {
    this.getTrainerDetails();
    this.getOnboard();

    this.batchForm = this.fb.group({
      location: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      tocPath: new FormControl('', [Validators.required]),
      tyMentors: new FormControl('', [Validators.required]),
      batchType: new FormControl('INTERNAL', [Validators.required]),
      deliveryManager: new FormControl('', [Validators.required]),
      mentors: new FormArray([this.createMentor()]),
      trainers: new FormArray([this.createTrainer()])
    });

  }
  getOnboard() {
    this.onboardService.getOnboardList(this.status).subscribe(res => {
      this.CandidatesListData = res;
      console.log(this.CandidatesListData);
      this.dataSource.data = this.CandidatesListData.data;
    })
  }

  // VAlidation get methods

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
    this.array.splice(this.array.indexOf(row), 1);
    console.log(this.array);
  }

  uploadTOC(event: Event) {
    this.tocPath = (event.target as HTMLInputElement).files?.item(0);
    this.fileName = (event.target as HTMLInputElement).files[0].name;
  }

  refreshFile(){
    this.fileName = null;
  }

  addBatch(batchForm: FormGroup) {

    let file = this.tocPath
    console.log(file);
    let date = new Date(batchForm.controls.startDate.value);
    // console.log(date);
    var dateObj = new Date(date);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');

    var candidates: any = []
    this.array.forEach((element: any, index: any) => {
      let obj = { candidateId: '', candidateName: '', phoneNumber: '', emailId: '', branch: '', degreeAggregate: '', degree: '', stream: '', yop: '', tenthPercentage: 0, twelfthPercentage: '', masterAggregate: '', profileId: '' }

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
      startDate: momentString,
      tyMentors: [batchForm.controls.tyMentors.value],
      batchType: batchForm.controls.batchType.value,
      deliveryManager: batchForm.controls.deliveryManager.value,
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
        this.getOnboard();
        batchForm.reset();
        this.closeModal.nativeElement.click();
        this.refreshFile();
      }
    }, err => {
      console.log(err, 'err');
      this.toastr.error(err.error.message);
    })
  }

  resetFormData() {
    this.batchForm.reset();
    this.refreshData();
  }

  refreshData() {
    this.fileName = null;
  }

  getTrainerDetails() {
    this.onboardService.getTrainerData().subscribe((res: any) => {
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
