import { Component, OnInit, Output ,EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  isSubmited = false;
  batchName: any;
  batchId: any;
  candidates: any;
  rform: FormGroup;

  constructor( private router:Router,
               private batchService:BatchService,
               private ActivatedRouter: ActivatedRoute,
               private toastr: ToastrService
               ) { }

  @Output() tableDataValues = new EventEmitter<string>();

  ngOnInit(): void {

    this.rform = new FormGroup({

        candidateName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('[a-z A-Z]*')]),
        phoneNumber: new FormControl('',[Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}')]),
        emailId : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}')]),
        stream:  new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[a-z A-Z]*')]),
        tenthPercentage : new FormControl('',[Validators.required,Validators.pattern('[0-9]{2}')]),
        degreeAggregate: new FormControl('',[Validators.required,Validators.pattern('[0-9]{2}')]),
        branch: new FormControl('',[Validators.required]),
        degree: new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]*')]),
        yop:new FormControl('',[Validators.required,Validators.pattern('[0-9]{4}')]),
        twelfthPercentage: new FormControl('',[Validators.required,Validators.pattern('[0-9]{2}')]),
        masterAggregate: new FormControl('',[Validators.pattern('[0-9]{2}')]),
        profileId:new FormControl('',[Validators.pattern('[a-z A-Z 0-9]*')]),
        batchName:new FormControl('',[Validators.required]),
        batchId:new FormControl('',[Validators.required]),
    })

    this.ActivatedRouter.queryParams
      .subscribe(params => {
        console.log(params);
        this.candidates = params
        console.log(this.candidates);
      });

      this.rform.get('tenthPercentage').valueChanges.subscribe(res =>{
        if(res<35) {
          this.rform.get('tenthPercentage').setErrors({tenthPercentage:true})
        } else {
          this.rform.get('tenthPercentage').setErrors(null)
        }
      })

      this.rform.get('degreeAggregate').valueChanges.subscribe(res =>{
        if(res<35) {
          this.rform.get('degreeAggregate').setErrors({degreeAggregate:true})
        } else {
          this.rform.get('degreeAggregate').setErrors(null)
        }
      })

      this.rform.get('twelfthPercentage').valueChanges.subscribe(res =>{
        if(res<35) {
          this.rform.get('twelfthPercentage').setErrors({twelfthPercentage:true})
        } else {
          this.rform.get('twelfthPercentage').setErrors(null)
        }
      })

      this.rform.get('masterAggregate').valueChanges.subscribe(res =>{
        if(res<35) {
          this.rform.get('masterAggregate').setErrors({masterAggregate:true})
        } else {
          this.rform.get('masterAggregate').setErrors(null)
        }
      })
  }

  navigateCandidateList() {
    this.router.navigate(['/candidatelist/'],{   queryParams: {
      batchName: this.candidates['batchName'],
    }});
  }

  branches = [
    {value: 'Hebbal', viewValue: 'Hebbal'},
    {value: 'OAR', viewValue: 'OAR'},
    {value: 'BTM', viewValue: 'BTM'},
    {value: 'BasavanaGudi', viewValue: 'BasavanaGudi'},
  ];

  onSubmit(rform:FormGroup) {
    if(rform.valid){
      const formData = {
        candidateName: rform.controls.candidateName.value,
        emailId: rform.controls.emailId.value,
        stream:  rform.controls.stream.value,
        tenthPercentage : rform.controls.tenthPercentage.value,
        degreeAggregate: rform.controls.degreeAggregate.value,
        branch: rform.controls.branch.value,
        phoneNumber : rform.controls.phoneNumber.value,
        degree: rform.controls.degree.value,
        yop: rform.controls.yop.value,
        twelfthPercentage: rform.controls.twelfthPercentage.value,
        masterAggregate: rform.controls.masterAggregate.value ? rform.controls.masterAggregate.value : null,
        profileId: rform.controls.profileId.value ? rform.controls.profileId.value : null,
        batchName: rform.controls.batchName.value,
        batchId: rform.controls.batchId.value,
      };
     this.batchService.postedCandidate(formData).subscribe((res: any) => {
      console.log("candidate details posted successfully");
      if(res.error == false) {
      this.toastr.success('Candidate details added successfully');
      // rform.reset();
      this.router.navigate(['/candidatelist/'],{   queryParams: {
        batchName: this.candidates['batchName'],
      }});
      }
    },err => {
      console.log("err",err);
      this.toastr.error(err.error.message);
    })
  }
}

}
