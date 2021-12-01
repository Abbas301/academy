import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasestudiesService {

  constructor(private http:HttpClient) { }

postCasestudiesData(caseData:any){
  return this.http.post<any>(`${environment.baseUrl}/academy-inventory/case-studies`,caseData)
}

getCasestudiesData(){
  return this.http.get<any>(`${environment.baseUrl}/academy-inventory/case-studies`)
}

deleteCasestudiesData(id:any){
  return this.http.delete<any>(`${environment.baseUrl}/academy-inventory/case-studies/${id}`)
}

updateCasestudiesData(id:any, caseData:any){
  return this.http.put<any>(`${environment.baseUrl}/academy-inventory/case-studies/${id}`,caseData)
}

}
