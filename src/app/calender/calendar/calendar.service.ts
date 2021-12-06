import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http:HttpClient) { }

  getCalendar() {
    return this.http.get('http://localhost:3000/calendarList')
  }

  postCalendar(add:any) {
    return this.http.post('http://localhost:3000/calendarList',add)
  }

  updateCalendar(id:any,add:any) {
    return this.http.put(`http://localhost:3000/calendarList/${id}`,add)
  }

  deleteCalendar(id:any) {
    return this.http.delete(`http://localhost:3000/calendarList/${id}`)
  }


}
