import { Component, OnInit, ViewChild, forwardRef, ElementRef } from '@angular/core';
declare let $: any;
import { CalendarOptions,Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions !: CalendarOptions;
  eventsModel: any;
  submitted = false;
  eventdate!: string;
  successdata: any;
  searchText: any;

  Earray: any = []

  Cform!: FormGroup;

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor( private http: HttpClient ) { }


  ngOnInit() {
    this.Cform = new FormGroup({
      batch: new FormControl(''),
      technology: new FormControl(''),
      startDate: new FormControl(''),
      include: new FormControl(''),
    })


    forwardRef(() => Calendar);

    setTimeout(() => {
      return this.http.get('http://localhost:3000/events').subscribe(data => {
        this.Earray = data;
      });
    }, 500);

    setTimeout(() => {
      forwardRef(() => Calendar);
      this.handleCalender()
    }, 1000);


  }
  addEvent(addEventForm: NgForm) {
    return this.http.post('http://localhost:3000/events', addEventForm.value).subscribe(data => {
      this.Earray = data;
    })
  }

  handleCalender() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      droppable: true,
      selectable: true,
      eventColor: "#086288",
      eventStartEditable: true,
      eventBackgroundColor: "#fff",
      eventBorderColor: "#fff",
      eventTextColor: "black",
      height: 700,
      contentHeight: 600,
      events: this.Earray,
      initialView:'dayGridMonth',
      headerToolbar: {
        left: 'prevYear,nextYear',
        center: 'title',
        right: 'dayGridDay,dayGridWeek,dayGridMonth prev,next'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    }
  }

  handleDateClick(arg:any) {
    this.modalOpenButton.nativeElement.click();
    $(".title").text("Add Event at:" + arg.dateStr);
    $(".eventsstarttitle").text(arg.dateStr);

  }

  handleEventClick(arg:any) {
    console.log(arg);
  }

  handleEventDragStop(arg:any) {
    console.log(arg);
  }

  onSubmit(addEventForm: NgForm) {
    console.log(addEventForm.value);
  }


  calendarList = [
    { "slno": "01", "batchName": "CG_JSF sep20", "technology": "Java", "startDate": "28/04/2021", "endDate": "28/06/2021", "status": "in progress" },
    { "slno": "02", "batchName": "CG_JSF JAN24", "technology": "core Java", "startDate": "28/04/2021", "endDate": "28/06/2021", "status": "yet to start" },
    { "slno": "03", "batchName": "CG_JHS sep20", "technology": "Javascript", "startDate": "28/04/2021", "endDate": "28/06/2021", "status": "finished" },
    { "slno": "04", "batchName": "CG_ERT sep20", "technology": "React", "startDate": "28/04/2021", "endDate": "28/06/2021", "status": "yet to start" },
    { "slno": "05", "batchName": "CG_GHJ sep20", "technology": "Angular", "startDate": "28/04/2021", "endDate": "28/06/2021", "status": "in progress" },
  ]

  technologys = [
    { value: 'HTML', viewValue: 'HTML' },
    { value: 'CSS', viewValue: 'CSS' },
    { value: 'Javascript', viewValue: 'Javascript' },
    { value: 'Angular', viewValue: 'Angular' },
  ];

  batches = [
    { value: 'JA03HJS', viewValue: 'JA03HJS' },
    { value: 'JA05HJH', viewValue: 'JA05HJH' },
    { value: 'JA15HJA', viewValue: 'JA15HJA' },
  ];

  includes = [
    { value: 'Saturday', viewValue: 'Saturday' },
    { value: 'Sunday', viewValue: 'Sunday' },
    { value: 'Holidays', viewValue: 'Holidays' },
  ];
  onSubmitForm(Cform:any) {
    console.log(this.Cform.value);
  }

  deleteTrainer() {
    this.closeBtn.nativeElement.click();

  }
  viewCalender(){

  }
}







