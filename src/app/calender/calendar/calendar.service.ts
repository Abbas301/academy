import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http:HttpClient) { }

  getCalendar() {
    return this.http.get(`${environment.calendarUrl}`)
  }

  postCalendar(add:any) {
    return this.http.post(`${environment.calendarUrl}`,add)
  }

  updateCalendar(id:any,add:any) {
    return this.http.put(`${environment.calendarUrl}/${id}`,add)
  }

  deleteCalendar(id:any) {
    return this.http.delete(`${environment.calendarUrl}/${id}`)
  }


}
