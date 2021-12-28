import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  constructor(private http:HttpClient) { }


  getOnboardList(status:any){
    return this.http.get<any>(`${environment.baseUrl}/api/v1/academy/onboard/onboard-candidates`,{params:{
      status
    }});
  }

  postBatchData(postData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/academy-inventory/batch-details`,postData)
  }

}
