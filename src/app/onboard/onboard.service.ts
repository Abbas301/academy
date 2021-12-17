import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  constructor(private http:HttpClient) { }


  getOnboardList(status:any){
    return this.http.get<any>(`http://10.10.20.92.:8083/api/v1/academy/onboard/onboard-candidates`,{params:{
      status
    }});
  }

  postOnboardData(add:any) {
    return this.http.post<any>('localhost:8098/api/v1/academy-inventory/batch-details',add)
  }

}
