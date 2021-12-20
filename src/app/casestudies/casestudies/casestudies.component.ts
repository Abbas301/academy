import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CasestudiesService } from './casestudies.service';
import { ToastrService } from 'ngx-toastr';
export interface CaseStudy {
      projectName: string,
      projectType: string,
      projectSubType: string,
      projectDescription: string,
      caseStudyFile: string,
      caseStudyId:number
}

@Component({
  selector: 'app-casestudies',
  templateUrl: './casestudies.component.html',
  styleUrls: ['./casestudies.component.css']
})
export class CasestudiesComponent implements OnInit {
  casestudiesForm!: FormGroup;
  casestudies!: FormGroup;
  form !: FormGroup;

  selected = '';
  pseudo = true;
  miniCase = false;

  plp: boolean = false;
  mini: boolean = true;

  casestudiesData ;
  caseData ;
  miniProject ;
  pseudoProject;

  searchText;
  projecTypeValue;
  deleteData ;

  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closepostmodal') closepostmodal!: ElementRef;
  @ViewChild('closeupdatemodal') closeupdatemodal!: ElementRef;

  subTypes = ['All', 'Detailed', 'Abstract', 'Semi Abstract'];

  projectSubType = [{
    value: 'Detailed',
    viewValue: 'Detailed'
  },
  {
    value: 'Abstract',
    viewValue: 'Abstract'
  },
  {
    value: 'Semi Abstract',
    viewValue: 'Semi Abstract'
  }
  ];


  fontStyleControl = new FormControl();
  fontStyle?: string;
  caseStudyFile!: File;
  localUrl: any;

  constructor(
    private fb: FormBuilder,
    private casestudieService: CasestudiesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.casestudies = this.fb.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      projectSubType: ['',],
      projectDescription: ['', Validators.required],
      caseStudyFileUpload: [''],
      // caseStudyId: ['']
    })
    this.casestudiesForm = this.fb.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      projectSubType: ['',Validators.required],
      projectDescription: ['', Validators.required],
      caseStudyFileUpload: [''],
      caseStudyId: ['']
    })
    // console.log(this.casestudies);
    this.form = this.fb.group({
      subtype: this.fb.control(['All'])
    });
    this.getCasestudiesData();
  }

  onselectMini() {
    this.pseudo = true;
    this.miniCase = false;
  }

  onselectPseudo() {
    this.pseudo = false;
    this.miniCase = true;
  }

  get subtype() {
    return this.form.get('subtype') as FormControl;
  }

  showMini() {
    this.mini = true;
    this.plp = false;
    console.log(this.mini)
  }

  showPlp() {
    this.plp = true;
    this.mini = false;
    console.log(this.plp)

  }

  getCasestudiesData() {
    return this.casestudieService.getCasestudiesData().subscribe(res => {
      this.caseData = res;
      this.casestudiesData = this.caseData.data;
      let miniData = this.caseData.data;
      // miniProject Data
      this.miniProject = miniData.filter((casetype: any) => {
        return casetype.projectType === 'Mini Project'
      })
      let pseudoData = this.caseData.data;
      // pseudoProject Data
      this.pseudoProject = pseudoData.filter((casetype: any) => {
        return casetype.projectType === 'Pseudo Live Project'
      })
    })
  }

  postCaseData(casestudies: FormGroup) {
    let file = this.caseStudyFile
    let casestudiesFormData = {
      projectName: casestudies.controls.projectName.value,
      projectType: casestudies.controls.projectType.value,
      projectSubType: casestudies.controls.projectSubType.value ? casestudies.controls.projectSubType.value : 'None',
      projectDescription: casestudies.controls.projectDescription.value,
      // caseStudyId: this.casestudies.controls.caseStudyId.value ? this.casestudies.controls.caseStudyId.value : null,
    }
    let formData = new FormData();
    formData.append("caseStudies",JSON.stringify(casestudiesFormData))
    formData.append("caseStudyFile",file?file:null)
    this.casestudieService.postCasestudiesData( formData).subscribe(res => {
      
      console.log(res);
      this.getCasestudiesData();
      // this.casestudies.reset();
    })
  }
  resetForm() {
    this.casestudiesForm.reset();
  }
  onUploadingCaseStudies(event: Event) {
    this.caseStudyFile = (event.target as HTMLInputElement).files[0];
    // console.log(this.caseStudyFile)
    // console.log(this.casestudies.get('caseStudyFileUpload').value);
  }

  updateData(caseData:CaseStudy) {
    console.log(caseData);
    this.casestudiesForm.patchValue({
      projectName: caseData.projectName,
      projectType: caseData.projectType,
      projectSubType: caseData.projectSubType,
      projectDescription: caseData.projectDescription,
      caseStudyFile: caseData.caseStudyFile,
      caseStudyId:caseData.caseStudyId
    })
  }
  updateCaseData() {
    let file = this.caseStudyFile
    // console.log(file);
    const casestudiesFormData = {
      projectName: (this.casestudiesForm.get('projectName') as FormControl).value?(this.casestudiesForm.get('projectName') as FormControl).value:'',
      projectType: (this.casestudiesForm.get('projectType') as FormControl).value?(this.casestudiesForm.get('projectType') as FormControl).value:'',
      projectSubType: (this.casestudiesForm.get('projectSubType') as FormControl).value?(this.casestudiesForm.get('projectSubType') as FormControl).value:'',
      projectDescription: (this.casestudiesForm.get('projectDescription') as FormControl).value?(this.casestudiesForm.get('projectDescription') as FormControl).value:'',
      // caseStudyFile: (this.casestudiesForm.get('caseStudyFileUpload') as FormControl).value?(this.casestudiesForm.get('caseStudyFileUpload') as FormControl).value:'',
      caseStudyId: (this.casestudiesForm.get('caseStudyId') as FormControl).value?(this.casestudiesForm.get('caseStudyId') as FormControl).value:'',
    }
    let formData = new FormData();
    formData.append("caseStudies",JSON.stringify(casestudiesFormData))
    formData.append("caseStudyFile",file?file:null)

    this.casestudieService.updateCasestudiesData(formData).subscribe(res => {
      console.log("updated successfully");
      this.getCasestudiesData();
      this.closeModal.nativeElement.click();
    })
  }


  deleteConfirm(cardDetail: any) {
    this.deleteData = cardDetail;
  }
  deleteCasestudies(cardDetail:any) {
    console.log(cardDetail);
    this.closeBtn.nativeElement.click()
    this.casestudieService.deleteCasestudiesData(cardDetail.caseStudyId).subscribe(res => {
      console.log(res);
      this.getCasestudiesData();
    })
  }
}
