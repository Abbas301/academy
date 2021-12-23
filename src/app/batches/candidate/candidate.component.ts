import { Component, OnInit, Output ,EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { NgForm } from '@angular/forms';
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

  constructor( private router:Router,
               private batchService:BatchService,
               private ActivatedRouter: ActivatedRoute,
               private toastr: ToastrService
               ) { }

  @Output() tableDataValues = new EventEmitter<string>();
  @ViewChild ('resetButton') resetButton:ElementRef;

  ngOnInit(): void {

    this.ActivatedRouter.queryParams
      .subscribe(params => {
        console.log(params);
        this.candidates = params
        console.log(this.candidates);
      });
  }

  branches = [
    {value: 'Hebbal', viewValue: 'Hebbal'},
    {value: 'BTM', viewValue: 'BTM'},
    {value: 'BasavanaGudi', viewValue: 'BasavanaGudi'},
  ];

  redirect(){
    this.router.navigate(['/candidatelist/']);
  }

  onSubmit(userData:NgForm) {
    if(userData.valid){
      const formData = {
        candidateName: userData.controls.candidateName.value,
        emailId: userData.controls.emailId.value,
        stream:  userData.controls.stream.value,
        tenthPercentage : userData.controls.tenthPercentage.value,
        degreeAggregate: userData.controls.degreeAggregate.value,
        branch: userData.controls.branch.value,
        phoneNumber : userData.controls.phoneNumber.value,
        degree: userData.controls.degree.value,
        yop: userData.controls.yop.value,
        twelfthPercentage: userData.controls.twelfthPercentage.value,
        masterAggregate: userData.controls.masterAggregate.value,
        profileId: userData.controls.profileId.value,
        batchName: userData.controls.batchName.value,
        batchId: userData.controls.batchId.value,
      };
     this.batchService.postedCandidate(formData).subscribe((res: any) => {
      console.log("candidate details posted successfully");
      if(res.error == false) {
      this.toastr.success('Candidate details added successfully');
      userData.reset();
      this.resetButton.nativeElement.click();
      }
    },err => {
      console.log("err",err);
      this.toastr.error(err.error.message);
      this.toastr.error('some error occured');
    })
  }
}

}
