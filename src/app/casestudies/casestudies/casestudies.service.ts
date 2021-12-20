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
      return this.http.get<any>(`${environment.baseUrl}/academy-inventory/case-studies`)
  }
  // postCasestudiesData(
  //   projectName:string,
  //   projectType:string,
  //   projectSubType:string,
  //   projectDescription:string,
  //   caseStudyFile:File
  //   )
  //   {
  //   const postData = new FormData();
  //   postData.append("projectName",projectName);
  //   postData.append("projectType",projectType);
  //   postData.append("projectSubType",projectSubType);
  //   postData.append("projectDescription",projectDescription);
  //   postData.append("caseStudyFile",caseStudyFile);

  //   return this.http.post<any>(`${environment.baseUrl}/academy-inventory/case-studies`,postData)
  //   }

  postCasestudiesData(data:any){
    return this.http.post<any>(`${environment.baseUrl}/academy-inventory/case-studies`,data)
    }

  deleteCasestudiesData(deletecase:any) {
      return this.http.delete<any>(`${environment.baseUrl}/academy-inventory/case-studies/${deletecase}`)
  }

  updateCasestudiesData(data:any) {
    console.log(data);

      return this.http.post<any>(`${environment.baseUrl}/academy-inventory/case-studies`,data)
  }

}
