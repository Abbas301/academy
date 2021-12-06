import { Component, OnInit, ViewChild, forwardRef, ElementRef } from '@angular/core';
declare let $: any;
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CalendarService } from './calendar.service';
import { CalendarList } from '../calendar';


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

  Earray: any = [];
  // calendarList: any

  Cform!: FormGroup;

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  calendarData: any;

  calendarList = [
    {
      "id": "1",
      "slno": "01",
      "batchName": "CG_JSF JAN18",
      "technology": "core Java",
      "startDate": "28/08/2021",
      "endDate": "28/10/2021",
      "status": "finished"
    },
    {
      "id": "2",
      "slno": "02",
      "batchName": "CG_JSF JAN24",
      "technology": "core Java",
      "startDate": "28/04/2021",
      "endDate": "28/06/2021",
      "status": "yet to start"
    },
    {
      "id": "3",
      "slno": "03",
      "batchName": "CG_JHS sep20",
      "technology": "Javascript",
      "startDate": "28/04/2021",
      "endDate": "28/06/2021",
      "status": "finished"
    },
    {
      "id": "4",
      "slno": "04",
      "batchName": "CG_ERT sep20",
      "technology": "React",
      "startDate": "28/04/2021",
      "endDate": "28/06/2021",
      "status": "yet to start"
    }
  ]

  constructor(private http: HttpClient,
    private calendarService: CalendarService
  ) { }


  ngOnInit() {

    this.Cform = new FormGroup({
      id: new FormControl('', [Validators.required]),
      batchName: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      include: new FormControl('', [Validators.required]),
    })

    forwardRef(() => Calendar);

    setTimeout(() => {
      return this.http.get('http://localhost:3000/events').subscribe(data => {
        this.Earray = data;
        console.log(this.Earray);

      });
    }, 500);

    setTimeout(() => {
      forwardRef(() => Calendar);
      this.handleCalender()
    }, 1000);

    this.getCalendarData();

  }

  getCalendarData() {
    // return this.calendarService.getCalendar().subscribe((data: any) => {
    //   this.calendarList = data;
    //   console.log(this.calendarList);

    // })
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
      events: [
        {
          "title": "angular",
          "start": "2021-12-28"
        },
        {
          "title": "hands on",
          "start": "2021-12-17"
        },
        {
          "title": "lunch",
          "start": "2021-12-03"
        },
        {
          "title": "R&D",
          "start": "2021-12-22"
        },
        {
          "title": "Demo",
          "start": "2021-12-24"
        },
        {
          "id": "a",
          "title": "my event",
          "start": "2021-12-18"
        },
        {
          "title": "repeating event",
          "start": "2021-12-12"
        },
        {
          "title": "meeting",
          "start": "2021-12-15 "
        },
        {
          "id": "306",
          "title": "games",
          "start": "2021-12-04"
        },
        {
          "id": "870",
          "title": "prepare notes",
          "start": "2021-12-04"
        },
        {
          "id": "90",
          "title": "revising angular",
          "start": "2021-12-02",
          "end": "2021-12-05"
        },
        {
          "id": "54",
          "title": "task assigning",
          "start": "2021-12-03",
          "end": "2021-12-03"
        }
      ],
      initialView: 'dayGridMonth',
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

  handleDateClick(arg: any) {
    this.modalOpenButton.nativeElement.click();
    $(".title").text("Add Event at:" + arg.dateStr);
    $(".eventsstarttitle").text(arg.dateStr);

  }

  handleEventClick(arg: any) {
    console.log(arg);
  }

  handleEventDragStop(arg: any) {
    console.log(arg);
  }

  onSubmit(addEventForm: NgForm) {
    console.log(addEventForm.value);
  }

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

  elementData(calendar: any) {
    this.calendarData = calendar;
  }
  deleteCalendarData(calendarlist: CalendarList) {
    this.closeBtn.nativeElement.click();

    console.log(calendarlist.id);


    // this.calendarService.deleteCalendar(calendarlist.id).subscribe((data: any) => {
    //   console.log("Calendar list deleted successfully");

    // })

  }

  onSubmitForm(Cform: any) {
    console.log(this.Cform.value);
    // return this.calendarService.postCalendar(Cform.value).subscribe(res => {
    //   console.log("Calendar Data Posted Successfully");
    // });
  }

}







