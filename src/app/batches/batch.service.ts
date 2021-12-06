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

  getBatchData() {
    return this.http.get('http://localhost:3000/batches')
  }

  // postBatchData(add:any) {
  //   return this.http.post('http://localhost:3000/batches',add)
  // }

  // deleteBatchData(id:any,add:any) {
  //   return this.http.delete(`http://localhost:3000/batches/${id}`,add)
  // }

  getCbatchData() {
    return this.http.get('http://localhost:3000/clientBatches')
  }

  // postCBatchData(add:any) {
  //   return this.http.post('http://localhost:3000/clientBatches',add)
  // }

  // Candidate Apis

  getCandidate() {
    return this.http.get('http://localhost:3000/candidate');
  }
  postedCandidate(add:any) {
    return this.http.post('http://localhost:3000/candidate',add);
  }

  updatedCandidate(id:any,add:any) {
    return this.http.put<{candidatelist:CandidatesList}>(`http://localhost:3000/candidate/${id}`,add);
  }

  deleteCandidateData(id:any) {
    return this.http.delete<{candidatelist:CandidatesList}>(`http://localhost:3000/candidate/${id}`);
  }


}

