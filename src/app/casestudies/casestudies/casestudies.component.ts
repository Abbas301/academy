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
  caseStudyId: number
}

@Component({
  selector: 'app-casestudies',
  templateUrl: './casestudies.component.html',
  styleUrls: ['./casestudies.component.css']
})
export class CasestudiesComponent implements OnInit {
  casestudiesForm!: FormGroup;
  casestudies: FormGroup;
  form: FormGroup;

  selected = '';
  pseudo = true;
  miniCase = false;
  edit = false;

  plp: boolean = false;
  mini: boolean = true;

  casestudiesData: any;
  casestudiesFormData: any;
  formDataValues: any;

  caseData: any;
  miniProject: any;
  pseudoProject = [];
  patchData: any;

  searchText: any
  projecTypeValue;
  deleteData: any;
  casestudyForm: FormGroup;
  file: string;

  modelHeader = '';

  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closepostmodal') closepostmodal!: ElementRef;
  @ViewChild('closeupdatemodal') closeupdatemodal!: ElementRef;
  @ViewChild('resetpostData') resetpostData!: ElementRef;

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
  caseStudyFile: File;
  localUrl: any;
  pseudoProjectResult: any[];

  constructor(
    private fb: FormBuilder,
    private casestudieService: CasestudiesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.casestudyForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      projectType: ['', Validators.required],
      projectSubType: ['',],
      projectDescription: ['', [Validators.required, Validators.minLength(25)]],
      caseStudyFileUpload: ['',],
      caseStudyId: [''],

    })

    this.form = this.fb.group({
      subtype: this.fb.control(['All'])
    });
    this.getCasestudiesData();
  }
  caseStudyModel() {
    this.modelHeader = 'Create New Case Studies'
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
  chooseCaseStudy() {
    if (this.subtype.value === 'Detailed') {
      this.pseudoProjectResult = this.pseudoProject.filter(val => {
        return val.projectSubType === 'Detailed'
      })
    }
    else if (this.subtype.value === 'Abstract') {
      this.pseudoProjectResult = this.pseudoProject.filter(val => {
        return val.projectSubType === 'Abstract'
      })
    }
    else if (this.subtype.value === 'Semi Abstract') {
      this.pseudoProjectResult = this.pseudoProject.filter(val => {
        return val.projectSubType === 'Semi Abstract'
      })
    }
    else {
      this.pseudoProjectResult = this.pseudoProject
    }
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
      this.pseudoProjectResult = this.pseudoProject

    })
  }

  postCaseData(casestudies) {
    let file = this.caseStudyFile
    const casestudiesFormData = {
      projectName: casestudies.controls.projectName.value,
      projectType: casestudies.controls.projectType.value,
      projectSubType: casestudies.controls.projectSubType.value ? casestudies.controls.projectSubType.value : 'None',
      projectDescription: casestudies.controls.projectDescription.value,
      caseStudyId: casestudies.controls.caseStudyId.value ? casestudies.controls.caseStudyId.value : null

    }
    Object.keys(casestudiesFormData).forEach(e => { if (casestudiesFormData[e] === null) delete casestudiesFormData[e] });

    const formData = new FormData();
    formData.append("caseStudies", JSON.stringify(casestudiesFormData))
    formData.append("caseStudyFile", file ? file : null)

    this.casestudieService.postCasestudiesData(formData).subscribe(res => {
      this.toastr.success(res.message)
      this.resetpostData.nativeElement.click();
      this.getCasestudiesData();
      this.closepostmodal.nativeElement.click();
      this.refreshFile()
    }, err => {
      this.toastr.error(err.error.message)
    })

  }
  refreshFile() {
    this.file = null;
  }



  onUploadingCaseStudies(event: Event) {
    this.caseStudyFile = (event.target as HTMLInputElement).files[0];
    console.log(this.caseStudyFile)
    this.file = (event.target as HTMLInputElement).files[0].name;

  }

  updateCasestudy(updateDetails: any) {
    this.patchData = updateDetails;
    console.log(updateDetails);
    this.modelHeader = 'Edit Case Studies'

    this.casestudyForm.patchValue({
      projectName: updateDetails?.projectName,
      projectType: updateDetails?.projectType,
      projectSubType: updateDetails?.projectSubType,
      projectDescription: updateDetails?.projectDescription,
      caseStudyFile: updateDetails?.caseStudyFile,
      caseStudyId: updateDetails?.caseStudyId,
    })
    console.log(this.casestudyForm);

  }
  clearCasestudy() {
    this.resetpostData.nativeElement.click();
    this.refreshFile()
  }

  deleteConfirm(cardDetail) {
    this.deleteData = cardDetail;
  }
  deleteCasestudies(cardDetail) {
    console.log(cardDetail);
    this.closeBtn.nativeElement.click()
    this.casestudieService.deleteCasestudiesData(cardDetail.caseStudyId).subscribe(res => {
      console.log(res);
      this.toastr.success(res.message)
      this.getCasestudiesData();
    }, err => {
      this.toastr.error(err.error.message)
    })
  }

}
