import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http:HttpClient) { }

  getCalendar() {
    return this.http.get('http://10.10.20.92:8083/api/v1/academy/calendar/batch-details')
  }

  getCalendarEvents(batchname:any) {
    return this.http.get(`http://10.10.20.92:8083/api/v1/academy/calendar/calendar-events`,{
      params: {
        batchname
      }
    })
  }

  postCalendar(add:any) {
    return this.http.post('HTTP://10.10.20.92:8083/api/v1/academy/calendar/calendar-details',add)
  }

  updateCalendar(id:any,add:any) {
    return this.http.put(`http://localhost:3000/calendarList/${id}`,add)
  }

  deleteCalendar(candidatedetailsid:any,batchname: any) {
    return this.http.delete(`localhost:8082/api/v1/academy/calendar/calendar-details/${candidatedetailsid}/${batchname}`)
  }

  // localhost:8082/api/v1/academy/calendar/calendar-details?candidatedetailsid=299&batchname=BATCH0023

}
