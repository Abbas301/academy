import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  constructor(private http:HttpClient) { }

  postTrainerData(trainerData:any){
    return this.http.post<any>(`${environment.baseUrl}/academy/trainers/trainer-details-technologies`,trainerData)
  }

  getTrainerData(){
    return this.http.get<any>(`${environment.baseUrl}/academy/trainers/trainer-details-technologies`)
  }
  deleteTrainerData(id:any, trainerData:any){
    return this.http.delete<any>(`${environment.baseUrl}/academy/trainers/trainer-details-technologies`,)
  }

}
