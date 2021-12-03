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

  postBatchData(add:any) {
    return this.http.post('http://localhost:3000/batches',add)
  }

  deleteBatchData(index:any) {
    return this.http.delete('http://localhost:3000/batches')
  }

  getCbatchData() {
    return this.http.get('http://localhost:3000/clientBatches')
  }

  postCBatchData(add:any) {
    return this.http.post('http://localhost:3000/clientBatches',add)
  }

  getBatch() {
    return this.http.get(`${environment.baseUrl}/academy-inventory/batch-details`)
  }

  postBatch(add:any) {
    return this.http.post(`${environment.baseUrl}/academy-inventory/batch-details`,add)
  }

  putBatch(add:any) {
    return this.http.put(`${environment.baseUrl}/academy-inventory/batch-details`,add)
  }

  deleteBatch(add:any) {
    return this.http.delete(`${environment.baseUrl}/academy-inventory/batch-details`,add)
  }

  // candidate Api
  postCandidate(add:any) {
    return this.http.post(`${environment.baseUrl}/academy/batch/candidate`,add)
  }

  getCandidate() {
    return this.http.get('http://localhost:3000/candidate')
  }
  postedCandidate(add:any) {
    return this.http.post('http://localhost:3000/candidate',add)
  }

  updatedCandidate(id:any,add:any) {
    return this.http.put<{candidatelist:CandidatesList}>(`${environment.Url}/${id}`,add)
  }

  deleteCandidateData(id:any) {
    return this.http.delete<{candidatelist:CandidatesList}>(`${environment.Url}/${id}`)
  }

  putCandidate(profileId:any ,add:any) {
    return this.http.put(`${environment.baseUrl}/academy/batch/candidate/${profileId}`,add)
  }

  deleteCandidate(id:any) {
    return this.http.delete(`${environment.baseUrl}/academy/batch/candidate/${id}`)
  }

}

