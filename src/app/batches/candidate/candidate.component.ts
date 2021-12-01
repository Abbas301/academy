import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  isSubmited = false;


  constructor( private router:Router,
               private batchService:BatchService
               ) { }

  @Output() tableDataValues = new EventEmitter<string>();

  ngOnInit(): void {
  }

  branches = [
    {value: 'Hebbal', viewValue: 'Hebbal'},
    {value: 'BTM', viewValue: 'BTM'},
    {value: 'BasavanaGudi', viewValue: 'BasavanaGudi'},
  ];

  redirect(){
    this.router.navigate(['/candidatelist/']);
  }

  addForm(userData:NgForm) {
    if(userData.valid){
      const formData = {
        candidateId: userData.controls.candidateId.value,
        batchName: userData.controls.batchName.value,
        candidateName: userData.controls.candidateName.value,
        phoneNumber : userData.controls.phoneNumber.value,
        emailId: userData.controls.emailId.value,
        degree: userData.controls.degree.value,
        stream:  userData.controls.stream.value,
        yop: userData.controls.yop.value,
        tenthPercentage : userData.controls.tenthPercentage.value,
        twelfthPercentage: userData.controls.twelfthPercentage.value,
        degreeAggregate: userData.controls.degreeAggregate.value,
        masterAggregate: userData.controls.masterAggregate.value,
        branch: userData.controls.branch.value,
        profileId: userData.controls.profileId.value,

      };
    return this.batchService.postCandidate(formData).subscribe((data: any) => {
      console.log("candidate details posted successfully");
      console.log(data);
      userData.reset();
    })
  }
}

  deleteCandidateDetails(id:any) {
    return this.batchService.deleteCandidate(id).subscribe((res: any) =>{
      console.log("candidate details deleted Successfully");
    })
  }

}
