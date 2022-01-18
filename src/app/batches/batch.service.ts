import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http:HttpClient) { }

  // batch Api

  getBatchData() {
    return this.http.get(`${environment.baseUrl}/api/v1/academy-inventory/all-batch-details`)
  }

  getSingleBatch(batchName:any) {
    return this.http.get(`${environment.baseUrl}/api/v1/academy-inventory/batch-details/${batchName}`);
  }

  postBatchData(postData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/academy-inventory/batch-details`,postData)
  }

  // Candidate Apis

  postedCandidate(add:any) {
    return this.http.post(`${environment.baseUrl}/api/v1/academy/batch/candidate`,add);
  }

  updatedCandidate(candidateId:any) {
    return this.http.put(`${environment.baseUrl}/api/v1/academy/batch/candidate`,candidateId);
  }

  deleteCandidateData(data:any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/academy/batch/candidate`,{body:data});
  }

  getTrainerData(){
    return this.http.get<{
      data:any,
      error: boolean
      message: string
    }>(`${environment.baseUrl}/api/v1/academy/trainers/trainer-details-technologies`)
  }

  exportAsExcelFile(json: any[], excelFileName: string, fileType): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName,fileType);
 }

 saveAsExcelFile(buffer: any, fileName: string, fileType:any): void {
   const data: Blob = new Blob([buffer], {
     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
   });
   FileSaver.saveAs(data, fileName + `.${fileType.toLowerCase()}`);
 }
 getJson() {
   return this.http.get('./assets/candidatelist.json')
 }

//  calendar APi
 getCalendar() {
  return this.http.get(`${environment.baseUrl}/api/v1/academy/calendar/batch-details`)
}

getCalendarEvents(batchname:any) {
  return this.http.get(`${environment.baseUrl}/api/v1/academy/calendar/calendar-events`,{
    params: {
      batchname
    }
  })
}

getSingleCalendarBatch(batchName:any) {
  return this.http.get(`${environment.baseUrl}/api/v1/academy-inventory/batch-details/${batchName}`);
}

}

