import {
  HttpClient
}
from '@angular/common/http';
import {
  Injectable
}
from '@angular/core';
import {
  environment
}
from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) export class CasestudiesService {

  constructor(private http:HttpClient) {}
  getCasestudiesData() {
      return this.http.get<any>(`${environment.baseUrl}/api/v1/academy-inventory/case-studies`)
  }


  postCasestudiesData(data){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/academy-inventory/case-studies`,data)
    }

  deleteCasestudiesData(deletecase) {
      return this.http.delete<any>(`${environment.baseUrl}/api/v1/academy-inventory/case-studies/${deletecase}`)
  }

  updateCasestudiesData(data) {
    console.log(data);

      return this.http.post<any>(`${environment.baseUrl}/api/v1/academy-inventory/case-studies`,data)
  }

}
