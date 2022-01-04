import { Component, OnInit, ViewChild, forwardRef, ElementRef } from '@angular/core';
declare let $: any;
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from './calendar.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as events from 'events';
import * as moment from 'moment';

export interface Events {
  date: string,
  topic: string,
  subTopic: string
}
export interface Calendar {
  calendarDetailsId: number;
  batchName: string;
  technology: string;
  include: Array<string>;
  startDate: string
  endDate: string
}
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

  calendarData: Events[] = [];
  calendarList: any
  calenderObject: Calendar | undefined;
  Cform!: FormGroup;
  selected = '';
  addEventForm: FormGroup;
  editEventForm: FormGroup;
  element: any;

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('generateCalendarModal') generateCalendarModal!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;
  @ViewChild('myModal') myModal!: ElementRef;
  value: any;
  monthSelect: any
  calendarListData: any;
  calendarEvents: any;
  batchname: any;
  calendarDetailsId: any;
  batchesDetails: any;
  batch: any;
  selectedBatchName: any;
  selectedTechnology: any;
  selectedStartDate: any;
  selectedEndDate: any;
  start: Date;
  eventsArray: any[] = [];
  EventsArrayData: any[];
  CalendarId: any;
  calendarId: any;

  constructor(private http: HttpClient,
    private calendarService: CalendarService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.Cform = new FormGroup({
      batchName: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      include: new FormControl('', [Validators.required]),
    })

    this.addEventForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      subTopic: new FormControl('', [Validators.required])
    })

    this.getCalendarData();
    this.calenderSetup();
    this.getBatch();
  }

  technologys = [
    { value: 'JAVA_WITH_ANGULAR', viewValue: 'JAVA_WITH_ANGULAR' },
    { value: 'JAVA_WITH_REACT', viewValue: 'JAVA_WITH_REACT' },
  ];

  calenderSetup() {
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
      // dayRender: (info) => {
      //   info.el.innerHTML += "<button class='dayButton' data-date='" + info.date + "'>Click me</button>";
      //   info.el.style.padding = "20px 0 0 10px";
      // },
      contentHeight: 600,
      // eventDrop: function (info) {
      //   alert(info.event.title + " was dropped on " + info.event.start.toISOString());

      //   if (!confirm("Are you sure about this change?")) {
      //     info.revert();
      //   }
      // },
      events: this.calendarData,
      dayCellContent: { html: `<i data-toggle="modal" (click)="${this.onEdit(this.element)}"  data-target="#myModal" class="fa fa-pencil fa-fw"></i><div class="buttonsElement" style="padding-top:80px;"><button style="margin-right: 20px;" class="complete btn">complete</button><button class="pending btn">pending</button></div>`},

      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prevYear,nextYear',
        center: 'title',
        right: 'dayGridMonth prev,next'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
    }
  }

  handleDateClick(arg: any) {
    console.log(arg);
    this.modalOpenButton.nativeElement.click();
    $(".Modaltitle").text("Add Event at:" + arg.dateStr);
    $(".eventsstarttitle").text(arg.dateStr);
    this.addEventForm.get('start').patchValue(arg.dateStr);

    this.myModal.nativeElement.click();
  }

  handleEventClick(element: Events) {
    // console.log(element);
    // console.log(this.eventsArray);
    this.eventsArray.forEach((element, index) => {
      //  console.log(element);  
      //  console.log(index);
      //  this.calendarId = element.calendarEventId;
    })

  }

  handleEventDragStop(arg: any) {
    console.log(arg);
  }

  index: number;
  getCalendarData() {
    return this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendarList = data;
      this.calendarListData = this.calendarList.data
      // console.log(this.calendarListData);
    })
  }

  onEdit(element: Events) {

    this.eventsArray.forEach((element, index) => {
      console.log(element[index], "sdfghjkl");
    })

    //  this.editEventForm.patchValue({
    //   date: editEventForm.controls.date.value,
    //   topic: editEventForm.controls.topic.value,
    //   subTopic: editEventForm.controls.subTopic.value
    //   })

  }

  onSubmit(addEventForm: FormGroup) {

    let date = new Date(addEventForm.controls.start.value);
    console.log(date);
    var dateObj = new Date(date);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');

    this.eventsArray.push({
      batchName: this.selectedBatchName,
      date: addEventForm.controls.start.value,
      topic: momentString,
      subTopic: addEventForm.controls.subTopic.value
    })
    const CalendarData = {
      batchName: this.selectedBatchName,
      updatedDates: this.eventsArray
    }
    this.calendarService.updateCalendar(CalendarData).subscribe((res: any) => {
      this.toastr.success("Calendar Data Updated Successfully");
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
  }

  elementData(calendar: Calendar) {
    this.calenderObject = calendar;
    console.log(calendar);
  }
  deleteCalendarData() {
    this.closeBtn.nativeElement.click();
    console.log(this.batchname);

    this.calendarService.deleteCalendar(this.calenderObject?.calendarDetailsId, this.calenderObject?.batchName).subscribe((res: any) => {
      console.log("Calendar list deleted successfully");
      if (res.error == false) {
        this.toastr.success("Calendar list deleted successfully");
        this.getCalendarData();
      } else {
        this.router.navigate(['/', 'calendar']);
      }
    }, err => {
      console.log("err", err);
      this.toastr.error(err.error.message);
    })
  }

  onSubmitForm(Cform: FormGroup) {
    // console.log(this.Cform.value);
    let date = new Date(Cform.controls.startDate.value);
    console.log(date);
    var dateObj = new Date(date);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');

    const formData = {
      batchName: Cform.controls.batchName.value,
      technology: Cform.controls.technology.value,
      startDate: momentString,
      include: Cform.controls.include.value,
    }
    this.calendarService.postCalendar(formData).subscribe((res: any) => {
      console.log("calendar Generated Successfully");
      this.toastr.success('calendar Generated Successfully');
      this.resetButton.nativeElement.click();
      this.getCalendarData();
      setTimeout(() => {
        this.generateCalendarModal.nativeElement.click();
      }, 500);
      Cform.reset();
    }, err => {
      console.log("err", err);
      this.toastr.error(err.error.message);
    })
  }

  visibleCalender(batchName: any, index: any) {
    this.selectedBatchName = batchName;
    this.selectedTechnology = this.calendarListData[index].technology;
    this.selectedStartDate = this.calendarListData[index].startDate;
    this.selectedEndDate = this.calendarListData[index].endDate;

    this.calendarService.getCalendarEvents(batchName).subscribe(res => {
      this.calendarEvents = res;
      this.eventsArray = this.calendarEvents.data;
      console.log(this.eventsArray);
      this.CalendarId = this.eventsArray[index].calendarEventId
      var calendarData: any = []
      this.eventsArray.forEach((element: any, index: any) => {
        let obj = { id: '', title: '', start: '', subTopic: '', calendarDetailsId: '' }
        obj.id = index
        obj.title = element.topic
        obj.start = element.date
        obj.subTopic = element.subTopic
        obj.calendarDetailsId = element.calendarEventId
        calendarData.push(obj)
      });

      if (Array.isArray(calendarData) && calendarData.length > 0) {
        // console.log("calendarData", calendarData);
        this.calendarData = calendarData;
        this.calendarOptions.events = calendarData;
        this.calenderSetup()
      }
      else {
        // console.log("calendarData", calendarData);
        console.log("Array is empty")
      }
    })
    setTimeout(() => {
      this.calenderSetup()
    }, 500);
  }

  editCalender(row) {
    setTimeout(() => {
      this.calenderSetup()
    }, 500);
  }

  getBatch() {
    this.calendarService.getBatchData().subscribe((res: any) => {
      this.batchesDetails = res;
      this.batch = this.batchesDetails.data;
      // console.log(this.batch, 'batch');
    })
  }

  onChangeBatchName(event: any, Cform: FormGroup) {
    this.batch.forEach((ele) => {
      if (ele.batchName === event.value) {
        Cform.patchValue({
          technology: ele.technology,
          startDate: ele.startDate
        })
      }
    })

  }

}



