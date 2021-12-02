import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-casestudies',
  templateUrl: './casestudies.component.html',
  styleUrls: ['./casestudies.component.css']
})
export class CasestudiesComponent implements OnInit {
  casestudiesForm! : FormGroup;
  form!: FormGroup;

  plp: boolean = true;
  mini: boolean = false;
  
  searchText: any

  subTypes = ['All','Detailed', 'Abstract', 'Semi Abstract'];
  projectsubtype = [
    {value: 'Detailed', viewValue: 'Detailed'},
    {value: 'Abstract', viewValue: 'Abstract'},
    {value: 'Semi Abstract', viewValue: 'Semi Abstract'}
    ];
    projecttype = [
      {value:'Pseudo Live Project', viewValue: 'Pseudo Live Project'},
    {value: 'Mini Project', viewValue: 'Mini Project'}
    ]
    miniCaseStudies =[
    {ProjectName:'Asset Management System', projectDescription: 'Asset Management System',projectType:'Mini Project',Subtype:'Detailed'},
    {ProjectName:'tech Management System', projectDescription: 'Asset Management System',projectType:'Mini Project',Subtype:'Detailed'},
    {ProjectName:'car Management System', projectDescription: 'Asset Management System',projectType:'Mini Project',Subtype:'Detailed'},
    
    
   ]
   PplCaseStudies =[
    {ProjectName:'nalsjfhnalkjfh', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Detailed'},
    {ProjectName:'tech Management System', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Detailed'},
    {ProjectName:'car Management System', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Abstract'},
    {ProjectName:'light Management System', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Detailed'},
    {ProjectName:'Asset Management System', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Detailed'},
    {ProjectName:'Asset Management System', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Semi Abstract'},
    {ProjectName:'Asset Management System', projectDescription: 'Asset Management System',projectType:'Pseudo Live Project',Subtype:'Detailed'},
    
   ]
  

    fontStyleControl = new FormControl();
    fontStyle?: string;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
 this.casestudiesForm = this.fb.group({
  projectName:['',Validators.required],
  projectType:['',Validators.required],
  projectsubtype:['',Validators.required],
  Description:['',Validators.required],
  uploadCase:['',Validators.required]
 })
 this.form = this.fb.group({
  subtype: this.fb.control(['All'])
});
  }
  get subtype() {
    return this.form.get('subtype') as FormControl;
  }

  showPlp() {
    if (this.plp !== true) {
      this.plp = true;
    }
    this.mini = false;
  }
  showMini() {
    this.mini = true;
    this.plp = false;
  }

  onSubmit(casestudiesForm:any){
    console.log(casestudiesForm);
    
  }
  resetForm(){
    this.casestudiesForm.reset();
  }

}
