import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

   @ViewChild('closeBtn') closeBtn!: ElementRef;

  myForm !: FormGroup;
  items!: FormArray;

  searchValue: any

  trainerDetails: any;
  technologies = ['All', 'Frontend', 'Backend', 'Database'];
  form !: FormGroup;
  frontendDetails: any;
  backendDetails: any;
  databaseDetails: any;


  constructor( private http: HttpClient,
               private fb: FormBuilder,
               private router:Router,
               ) {
    this.http.get('http://localhost:3000/details').subscribe(data => {
      this.trainerDetails = data;
      console.log(data)
      for (const technologyType of this.trainerDetails) {
        this.frontendDetails = technologyType.frontend;
        this.backendDetails = technologyType.backend;
        this.databaseDetails = technologyType.database;
      }
    });
  }

  Technology_types = [
    { value: 'Frontend', viewValue: 'Frontend' },
    { value: 'Backend', viewValue: 'Backend' },
    { value: 'Database', viewValue: 'Database' },
  ];
  Technologies = [
    { value: 'HTML', viewValue: 'HTML' },
    { value: 'CSS', viewValue: 'CSS' },
    { value: 'JS', viewValue: 'JS' },
    { value: 'Angular', viewValue: 'Angular' },
    { value: 'React JS', viewValue: 'React JS' },
    { value: 'Vue JS', viewValue: 'Vue JS' },
    { value: 'Java', viewValue: 'Java' },
    { value: 'J2EE', viewValue: 'J2EE' },
    { value: 'Hibernate', viewValue: 'Hibernate' },
    { value: 'Spring MVC', viewValue: 'Spring MVC' },
    { value: 'Oracle', viewValue: 'Oracle' },
    { value: 'MySQL', viewValue: 'MySQL' },
    { value: 'MongoDB', viewValue: 'MongoDB' },
  ];
  Proficiencys = [
    { value: 'Proficient', viewValue: 'Proficient' },
    { value: 'Intermediate', viewValue: 'Intermediate' },
    { value: 'JS', viewValue: 'JS' },
    { value: 'Angular', viewValue: 'Basic' },
  ];

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      items: new FormArray([this.createItem()])
    })


    this.form = this.fb.group({
      technologyFilter: this.fb.control(['All'])
    });

  }

  get technologyFilter() {
    return this.form.get('technologyFilter') as FormControl;
  }

  get itemsArray(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      technologytype: ['', Validators.required],
      technologies: ['', Validators.required],
      Proficiency: ['', Validators.required]
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
  resetForm(){
    this.myForm.reset();
  }

  delete_trainer(trainer: any) {
    const index = this.trainerDetails.indexOf(trainer);
    this.trainerDetails.splice(index, 1);
  }
deleteTrainer(){
  this.closeBtn.nativeElement.click()
}
// getTrainersData(){
//   this.trainerService.getTrainerData().subscribe(res=>{
//     if(!res.error && Array.isArray(res?.data) && res.data.length>0){
//       this.trainersData =res?.data
//     }
//   },err=>{
//     console.log(err)
//   })
//}

}
