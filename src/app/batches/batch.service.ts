import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { CandidatesList } from '../batches/candidatelist'

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http:HttpClient) { }

  // batch Api

  // getBatchData() {
  //   return this.http.get('http://localhost:3000/batches')
  // }

  // getCbatchData() {
  //   return this.http.get('http://localhost:3000/clientBatches')
  // }

  // Candidate Apis

  // getCandidate() {
  //   return this.http.get('http://localhost:3000/candidate');
  // }
  // postedCandidate(add:any) {
  //   return this.http.post('http://localhost:3000/candidate',add);
  // }

  // updatedCandidate(id:any,add:any) {
  //   return this.http.put<{candidatelist:CandidatesList}>(`http://localhost:3000/candidate/${id}`,add);
  // }

  // deleteCandidateData(id:any) {
  //   return this.http.delete<{candidatelist:CandidatesList}>(`http://localhost:3000/candidate/${id}`);
  // }


  // from Apis

  // batch Api

  getBatchData() {
    return this.http.get('http://10.10.20.92:8083/api/v1/academy-inventory/batch-details')
  }
  getSingleBatch(batchname:any) {
    return this.http.get(`http://10.10.20.92:8083/api/v1/academy-inventory/batch-details`,batchname);
  }

  postBatchData(formData: string, toc: File) {

    const postData = new FormData();
    postData.append("formData", formData);
    postData.append("toc", toc);
    return this.http.post(`http://10.10.20.92:8083/api/v1/academy-inventory/batch-details`,postData).subscribe(res => {
      console.log("batch details added successfully");

    });
  }


  // Candidate Apis

  postedCandidate(add:any) {
    return this.http.post('http://10.10.20.92.:8083/api/v1/academy/batch/candidate',add);
  }

  updatedCandidate(candidateId:any) {
    return this.http.put(`http://10.10.20.92.:8083/api/v1/academy/batch/candidate`,candidateId);
  }

  deleteCandidateData(data:any) {
    return this.http.delete(`http://10.10.20.92:8083/api/v1/academy/batch/candidate`,{body:data});
  }

}

