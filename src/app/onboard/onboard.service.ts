import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  constructor(private http:HttpClient) { }


  getOnboardList(){
    return this.http.get<any>(`${environment.baseUrl}/academy/onboard/onboard-candidates?status=onboarded`)
  }

}
