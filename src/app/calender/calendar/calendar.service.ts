import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Calendar } from './calendar.component';

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

  postCalendar(formData:any) {
    return this.http.post('http://10.10.20.92:8083/api/v1/academy/calendar/calendar-details',formData)
  }

  updateCalendar(add:any) {
    return this.http.put(`http://10.10.20.92:8083/api/v1/academy/calendar/calendar-details`,add)
  }

  deleteCalendar(calendardetailsid:any,batchname:any) {
    return this.http.delete(`http://10.10.20.92:8083/api/v1/academy/calendar/calendar-details`,{params:{
      calendardetailsid,
      batchname
    }})
  }

  getBatchData() {
    return this.http.get('http://10.10.20.92:8083/api/v1/academy-inventory/batch-details')
  }

}
