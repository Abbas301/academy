import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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
  getSingleBatch(batchName:any) {
    return this.http.get(`http://10.10.20.92:8083/api/v1/academy-inventory/batch-details/${batchName}`);
  }

  postBatchData(add:any) {
    return this.http.post('http://10.10.20.92:8083/api/v1/academy-inventory/batch-details',add);
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

