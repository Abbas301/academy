import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('closepostmodal', { read: ElementRef }) closepostmodal: ElementRef;
  @ViewChild('resetpostmodal', { read: ElementRef }) resetpostmodal: ElementRef;

  trainerForm: FormGroup;
  items: FormArray;
  updateitems: FormArray;
  modelHeader = '';
  searchValue: any
  trainerTechnologiesRes = [];
  trainerDetails: any;
  technologiesData = ['Frontend', 'Backend', 'Database'];
  form: FormGroup;
  allSelected=false;

  trainerData = []
  updateForm: FormGroup
  deleteTrainerData: any
  selectAll = false;
  FrontendTechnologies = [];
  BackendTechnologies = [];
  DatabaseTechnologies = [];
  setOfTechnologies: string[];
  // select: any;
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private trainerService: TrainersService,
    private toster: ToastrService
  ) { }

  Technology_types = [{
    value: 'Frontend',
    viewValue: 'Frontend',
  },
  {
    value: 'Backend',
    viewValue: 'Backend',
  },
  {
    value: 'Database',
    viewValue: 'Database',
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
    value: 'Spring',
    viewValue: 'Spring'
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

  technologyType = ["Frontend", "Backend", "Database"]

  // @ViewChild('allSelected') private allSelected: MatSelect;
  @ViewChild('select') private select: MatSelect;
  @ViewChildren('selectTechnology') selectTechnology: QueryList<MatOption>

  ngOnInit(): void {
    this.trainerForm = this.fb.group({
      trainerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      emailId: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]),
      items: new FormArray([this.createItem()]),
      trainerId: [],
    })
    this.form = this.fb.group({
      technologyFilter: this.fb.control(['All'])
    });
    this.getHeader()

  }

  trainerModel() {
    this.modelHeader = 'Create New Trainer'
  }

  get technologyFilter() {
    return this.form.get('technologyFilter') as FormControl;
  }

  get itemsArray(): FormArray {
    return this.trainerForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      technologyType: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      proficiencyLevel: new FormControl('', [Validators.required])
    });
  }

  addItem(): void {
    this.itemsArray.push(this.createItem());
    console.log(this.items)
  }

  deleteItem(index) {
    this.itemsArray.removeAt(index)
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }


  getHeader() {
    this.trainerService.getTrainerHeader().subscribe(res => {
      const technologies = res['data'][0];
      this.FrontendTechnologies.push({ value: technologies.frontendTechnology, technology: 'Frontend' })
      this.BackendTechnologies.push({ value: technologies.backendTechnology, technology: 'Backend' })
      this.DatabaseTechnologies.push({ value: technologies.databaseList, technology: 'Database' })

      this.getTrainer()
    }, err => {
      // console.log(err)
    })
  }

  getTrainer() {
    this.trainerTechnologiesRes = [];
    this.trainerService.getTrainerData().subscribe(res => {
      this.trainerData = res.data;
      let frontendResults = [];
      if (this.technologyFilter.value.includes('All') || (this.technologyFilter.value.includes('Frontend') && this.technologyFilter.value.includes('Backend') && this.technologyFilter.value.includes('Database'))) {
        this.technologyType = ["Frontend", "Backend", "Database"];
        this.setOfTechnologies = this.FrontendTechnologies[0].value.concat(this.BackendTechnologies[0].value).concat(this.DatabaseTechnologies[0].value)
      }
      else if (!this.technologyFilter.value.includes('All') && (this.technologyFilter.value.includes('Frontend') && this.technologyFilter.value.includes('Backend'))) {
        this.technologyType = ["Frontend", "Backend"];
        this.setOfTechnologies = this.FrontendTechnologies[0].value.concat(this.BackendTechnologies[0].value)
      }
      else if (!this.technologyFilter.value.includes('All') && (this.technologyFilter.value.includes('Frontend') && this.technologyFilter.value.includes('Database'))) {
        this.technologyType = ["Frontend", "Database"];
        this.setOfTechnologies = this.FrontendTechnologies[0].value.concat(this.DatabaseTechnologies[0].value)
      }
      else if (!this.technologyFilter.value.includes('All') && (this.technologyFilter.value.includes('Backend') && this.technologyFilter.value.includes('Database'))) {
        this.technologyType = ["Backend", "Database"];
        this.setOfTechnologies = this.BackendTechnologies[0].value.concat(this.DatabaseTechnologies[0].value)
      }
      else if (!this.technologyFilter.value.includes('All') && (this.technologyFilter.value.includes('Frontend') && !this.technologyFilter.value.includes('Backend') && !this.technologyFilter.value.includes('Database'))) {
        this.technologyType = ["Frontend"];
        this.setOfTechnologies = this.FrontendTechnologies[0].value

      }
      else if (!this.technologyFilter.value.includes('All') && (!this.technologyFilter.value.includes('Frontend') && this.technologyFilter.value.includes('Backend') && !this.technologyFilter.value.includes('Database'))) {
        this.technologyType = ["Backend"];
        this.setOfTechnologies = this.BackendTechnologies[0].value

      }
      else if (!this.technologyFilter.value.includes('All') && (!this.technologyFilter.value.includes('Frontend') && !this.technologyFilter.value.includes('Backend') && this.technologyFilter.value.includes('Database'))) {
        this.technologyType = ["Database"];
        this.setOfTechnologies = this.DatabaseTechnologies[0].value

      }
      else {
        this.technologyType = ["Frontend", "Backend", "Database"];
        this.setOfTechnologies = this.FrontendTechnologies[0].value.concat(this.BackendTechnologies[0].value).concat(this.DatabaseTechnologies[0].value)

      }
      for (let i = 0; i < this.trainerData.length; i++) {
        const element = this.trainerData[i].trainerTechnologies;
        frontendResults = [];
        for (let j = 0; j < this.setOfTechnologies.length; j++) {
          frontendResults.push({ key: this.setOfTechnologies[j], value: '' })
          element.forEach(element => {
            if (element.technology.toLowerCase() === (this.setOfTechnologies[j].toLowerCase())) {
              frontendResults.forEach(res => {
                if (res.key.toLowerCase() === (element.technology.toLowerCase())) {
                  res.value = element.proficiencyLevel
                }
              })
            }
          })
        }
        frontendResults = frontendResults.filter(element => {
          // console.log(element)
          element.value = element.value === '' ? '--' : element.value
          return element
        })
        this.trainerTechnologiesRes.push(frontendResults)
        // console.log(frontendResults)
      }
    })
  }


  postTrainer(trainerForm: FormGroup) {
    const trainerFormData = {
      trainerName: trainerForm.controls.trainerName.value,
      emailId: trainerForm.controls.emailId.value,
      trainerTechnologies: this.itemsArray.value,
      trainerDetailsId: trainerForm.controls.trainerId.value ? trainerForm.controls.trainerId.value : null,
    };
    Object.keys(trainerFormData).forEach(e => { if (trainerFormData[e] === null) delete trainerFormData[e] });
    this.trainerService.postTrainerData(trainerFormData).subscribe(res => {
      this.toster.success(res.message)
      this.getHeader();
      this.closepostmodal.nativeElement.click()
    }, err => {
      this.toster.error(err.error.message)
    })
  }


  setTrainers(trainerData: any): FormArray {
    const formArray = new FormArray([]);
    trainerData.forEach(element => {
      const formGroup = new FormBuilder().group({
        technologyType: [element.technologyType],
        technology: [element.technology],
        proficiencyLevel: [element.proficiencyLevel]
      })
      formArray.push(formGroup);
    });
    return formArray;

  }

  updateTrainerData(trainerDetails: any) {
    this.modelHeader = 'Update Trainer'
    this.trainerForm.patchValue({
      'trainerName': trainerDetails.trainerName,
      'emailId': trainerDetails.emailId,
      'trainerId': trainerDetails.trainerDetailsId
    });
    this.trainerForm.setControl('items', this.setTrainers(trainerDetails.trainerTechnologies));
  }


  deleteConfirm(trainer) {
    this.deleteTrainerData = trainer;
  }
  deleteTrainer(trainer) {
    this.closeBtn.nativeElement.click()
    this.trainerService.deleteTrainerData(trainer.trainerDetailsId).subscribe(res => {
      this.toster.success(res.message)
      this.getTrainer();
    }, err => {
      this.toster.error(err.error.message)
    })
  }

  clearItemsArray() {
    this.resetpostmodal.nativeElement.click()
    this.itemsArray.clear();
    this.itemsArray.push(this.createItem());
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
   optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }


}
