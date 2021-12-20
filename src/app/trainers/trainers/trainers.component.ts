import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainersService } from '../trainers.service';
export interface trainerinterface {
  trainerName: string,
  emailId: string,
  trainerTechnologies: string
}
@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})


export class TrainersComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  myForm: FormGroup;
  items: FormArray;

  searchValue: any

  trainerDetails: any;
  technologies = ['All', 'Frontend', 'Backend', 'Database'];
  form: FormGroup;
  frontendDetails: any;
  backendDetails: any;
  databaseDetails: any;
  trainerData = []
  updateForm: any
  deleteTrainerData: any
  trainerWiseTechnologies = [];
  frontend = []
  backend = [];
  database = []

  trainerTechnologies = []
  trainerTechnologiesFE = [];
  trainerTechnologiesBE = [];
  trainerTechnologiesDB = [];
  trainerTechnologiesRes = [];
  trainerTechnologiesFEBE = [];
  trainerTechnologiesBEDB = [];
  trainerTechnologiesFEDB = [];
  trainerTechnologiesFBD = [];
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private trainerService: TrainersService
  ) { }

  Technology_types = [{
    value: 'Frontend',
    viewValue: 'Frontend',
    technologies: [{ key: 'Html', value: '' }, { key: 'CSS', value: '' }, { key: 'Javascript', value: '' }, { key: 'Angular', value: '' }, { key: 'React JS', value: '' }, { key: 'Vue JS', value: '' }]
  },
  {
    value: 'Backend',
    viewValue: 'Backend',
    technologies: [{ key: 'Java', value: '' }, { key: 'J2EE', value: '' }, { key: 'Hibernate', value: '' }, { key: 'Spring MVC', value: '' }]
  },
  {
    value: 'Database',
    viewValue: 'Database',
    technologies: [{ key: 'Oracle', value: '' }, { key: 'MySQL', value: '' }, { key: 'MongoDB', value: '' }]
  },
  ];
  Technologies = [{
    value: 'HTML',
    viewValue: 'HTML'
  },
  {
    value: 'CSS',
    viewValue: 'CSS'
  },
  {
    value: 'javascript',
    viewValue: 'javascript'
  },
  {
    value: 'Angular',
    viewValue: 'Angular'
  },
  {
    value: 'React JS',
    viewValue: 'React JS'
  },
  {
    value: 'Vue JS',
    viewValue: 'Vue JS'
  },
  {
    value: 'Java',
    viewValue: 'Java'
  },
  {
    value: 'J2EE',
    viewValue: 'J2EE'
  },
  {
    value: 'Hibernate',
    viewValue: 'Hibernate'
  },
  {
    value: 'Spring MVC',
    viewValue: 'Spring MVC'
  },
  {
    value: 'Oracle',
    viewValue: 'Oracle'
  },
  {
    value: 'MySQL',
    viewValue: 'MySQL'
  },
  {
    value: 'MongoDB',
    viewValue: 'MongoDB'
  },
  ];
  Proficiencys = [{
    value: 'Proficient',
    viewValue: 'Proficient'
  },
  {
    value: 'Intermediate',
    viewValue: 'Intermediate'
  }
  ];

  ngOnInit(): void {
    this.myForm = this.fb.group({
      trainerName: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      items: new FormArray([this.createItem()])
    })
    this.form = this.fb.group({
      technologyFilter: this.fb.control(['All'])
    });
    this.updateForm = this.fb.group({
      trainerName: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      items: new FormArray([this.createItem()])
    })

    this.getTrainer();
  }

  get technologyFilter() {
    return this.form.get('technologyFilter') as FormControl;
  }

  get itemsArray(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      technologyType: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      proficiencyLevel: new FormControl('', [Validators.required])
    });
  }

  addItem(): void {
    this.items = this.myForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  deleteItem(index: any) {
    this.items.removeAt(index)
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

  resetForm() {
    this.myForm.reset();
  }

  // deleteTrainer() {
  // this.closeBtn.nativeElement.click()
  // }

  getTrainer() {
    return this.trainerService.getTrainerData().subscribe(res => {
      this.trainerData = res.data;
      this.trainerWiseTechnologies = []
      for (let i = 0; i < this.trainerData.length; i++) {
        const element = this.trainerData[i];
        this.trainerWiseTechnologies = []
        this.frontend = [];
        this.backend = [];
        this.database = [];
        for (let j = 0; j < element.trainerTechnologies.length; j++) {
          const element1 = element.trainerTechnologies[j];
          if (element1.technologyType.toLowerCase().includes('frontend')) {
            if (element1.technology.toLowerCase().includes('html')) {
              // console.log(element.trainerName + 'Html' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.frontend.push(element1.proficiencyLevel)
            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.frontend.push('NA')
            }
          }
          if (element1.technologyType.toLowerCase().includes('frontend')) {
            if (element1.technology.toLowerCase().includes('css')) {
              // console.log(element.trainerName + 'CSS' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.frontend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.frontend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('frontend')) {
            if (element1.technology.toLowerCase().includes('javascript')) {
              // console.log(element.trainerName + 'Javascript' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.frontend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.frontend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('frontend')) {
            if (element1.technology.toLowerCase().includes('angular')) {
              // console.log(element.trainerName + 'Angular' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.frontend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.frontend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('frontend')) {
            if (element1.technology.toLowerCase().includes('react js')) {
              // console.log(element.trainerName + 'React JS' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.frontend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.frontend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('frontend')) {

            if (element1.technology.toLowerCase().includes('vue js')) {
              // console.log(element.trainerName + 'Vue JS' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.frontend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.frontend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('backend')) {

            if (element1.technology.toLowerCase().includes('java')) {
              // console.log(element.trainerName + 'Java' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.backend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.backend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('backend')) {
            if (element1.technology.toLowerCase().includes('j2ee')) {
              // console.log(element.trainerName + 'J2EE' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.backend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.backend.push('NA')

            }

          }
          if (element1.technologyType.toLowerCase().includes('backend')) {
            if (element1.technology.toLowerCase().includes('hibernate')) {
              // console.log(element.trainerName + 'Hibernate' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.backend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.backend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('backend')) {
            if (element1.technology.toLowerCase().includes('spring mvc')) {
              // console.log(element.trainerName + 'Spring MVC' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.backend.push(element1.proficiencyLevel)

            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.backend.push('NA')

            }
          }
          if (element1.technologyType.toLowerCase().includes('database')) {
            if (element1.technology.toLowerCase().includes('oracle')) {
              // console.log(element.trainerName + 'Oracle' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.database.push(element1.proficiencyLevel)
            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.database.push("NA")
            }
          }
          if (element1.technologyType.toLowerCase().includes('database')) {
            if (element1.technology.toLowerCase().includes('mysql')) {
              // console.log(element.trainerName + 'MySQL' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.database.push(element1.proficiencyLevel)
            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.database.push("NA")
            }
          }
          if (element1.technologyType.toLowerCase().includes('database')) {

            if (element1.technology.toLowerCase().includes('mongodb')) {
              // console.log(element.trainerName + 'MongoDB' + element1.proficiencyLevel)
              this.trainerWiseTechnologies.push(element1.proficiencyLevel)
              this.database.push(element1.proficiencyLevel)
            }
            else {
              this.trainerWiseTechnologies.push('NA')
              this.database.push("NA")
            }
          }


        }
        // this.trainerTechnologies.push(this.trainerWiseTechnologies)
        this.trainerTechnologies.push(this.trainerWiseTechnologies)
        this.trainerTechnologiesRes = this.trainerTechnologies
        this.trainerTechnologiesFE.push(this.frontend)
        this.trainerTechnologiesBE.push(this.backend)
        this.trainerTechnologiesDB.push(this.database)
        this.trainerTechnologiesFEBE.push(this.frontend.concat(this.backend))
        this.trainerTechnologiesFEDB.push(this.frontend.concat(this.database))
        this.trainerTechnologiesBEDB.push(this.backend.concat(this.database))
        this.trainerTechnologiesFBD.push(this.frontend.concat(this.backend).concat(this.database))
        console.log(this.trainerTechnologiesFBD)
      }
    })
  }
  resetArray() {

    console.log(this.trainerTechnologiesFBD)

    this.trainerTechnologiesRes = [];
    if (this.technologyFilter.value.includes('Frontend') && this.technologyFilter.value.includes('Backend') && this.technologyFilter.value.includes('Database')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesFBD

    }
    if (this.technologyFilter.value.includes('All')) {
      this.trainerTechnologiesRes = this.trainerTechnologies
    }
    if (this.technologyFilter.value.includes('Frontend') && !this.technologyFilter.value.includes('All') && !this.technologyFilter.value.includes('Backend') && !this.technologyFilter.value.includes('Database')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesFE
    }
    if (this.technologyFilter.value.includes('Backend') && !this.technologyFilter.value.includes('All') && !this.technologyFilter.value.includes('Frontend') && !this.technologyFilter.value.includes('Database')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesBE
    } if (this.technologyFilter.value.includes('Database') && !this.technologyFilter.value.includes('All') && !this.technologyFilter.value.includes('Frontend') && !this.technologyFilter.value.includes('Backend')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesDB
    }
    if (this.technologyFilter.value.includes('Frontend') &&
      this.technologyFilter.value.includes('Backend')
      && !this.technologyFilter.value.includes('Database') && !this.technologyFilter.value.includes('All')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesFEBE;
    }
    if (this.technologyFilter.value.includes('Frontend') && this.technologyFilter.value.includes('Database') && !this.technologyFilter.value.includes('All') && !this.technologyFilter.value.includes('Backend')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesFEDB;
    }
    if (this.technologyFilter.value.includes('Backend') && this.technologyFilter.value.includes('Database') && !this.technologyFilter.value.includes('All') && !this.technologyFilter.value.includes('Frontend')) {
      this.trainerTechnologiesRes = this.trainerTechnologiesBEDB;
    }
  }








  postTrainer(myForm: FormGroup) {
    console.log(this.myForm.value);

    console.log(this.itemsArray.value);
    const trainerFormData = {
      trainerName: myForm.controls.trainerName.value,
      emailId: myForm.controls.emailId.value,
      trainerTechnologies: this.itemsArray.value
    }
    this.trainerService.postTrainerData(trainerFormData).subscribe(res => {


      this.getTrainer();
      console.log(res);
    })
    console.log(trainerFormData);

  }

  // updateData(caseData:CaseStudy) {
  // console.log(caseData);
  // const formUpdate = this.casestudiesForm.patchValue({
  // projectName: caseData.projectName,
  // projectType: caseData.projectType,
  // projectSubType: caseData.projectSubType,
  // projectDescription: caseData.projectDescription,
  // caseStudyFile: caseData.caseStudyFile,
  // })
  // }

  updateTrainerData(trainerinterface) {
    this.updateForm.patchValue({
      trainerName: trainerinterface.trainerName,
      emailId: trainerinterface.emailId,
      trainerTechnologies: trainerinterface.trainerTechnologies,
    })
  }

  updateTrainer(myform) {

    this.trainerService.updateTrainerData(myform).subscribe(res => {

    })
  }




  deleteConfirm(trainer) {
    this.deleteTrainerData = trainer;
  }
  deleteTrainer(trainer) {
    this.closeBtn.nativeElement.click()
    this.trainerService.deleteTrainerData(trainer.trainerDetailsId).subscribe(res => {
      this.getTrainer();
    })
  }

}
