import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  constructor(private http:HttpClient) { }


  getTrainerData(){
    return this.http.get<{
      data:any,
      error: boolean
      message: string
    }>(`${environment.baseUrl}/academy/trainers/trainer-details-technologies`)
  }
  postTrainerData(trainerData:any){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/academy/trainers/trainer-details-technologies`,trainerData)
  }

  updateTrainer(trainerData:any){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/academy/trainers/trainer-details-technologies`,trainerData)
  }

  deleteTrainerData(Data:any){
    return this.http.delete<any>(`${environment.baseUrl}/api/v1/academy/trainers/trainer-details/${Data}`)
  }

getTrainerHeader(){
  return this.http.get<any>(`${environment.baseUrl}/api/v1/academy/technologies/technologies-header`)
}

}
