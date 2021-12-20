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

  getBatchData() {
    return this.http.get('http://10.10.20.92:8083/api/v1/academy-inventory/batch-details')
  }
  getSingleBatch(batchName:any) {
    return this.http.get(`http://10.10.20.92:8083/api/v1/academy-inventory/batch-details/${batchName}`);
  }

  postBatchData(postData: any) {
    return this.http.post(`http://10.10.20.92:8083/api/v1/academy-inventory/batch-details`,postData)
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

