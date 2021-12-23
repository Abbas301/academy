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

export interface Events {
  id: string;
  title: string;
  start: string;
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

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('generateCalendarModal') generateCalendarModal!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;
  value: any;
  monthSelect: any
  calendarListData: any;
  calendarEvents: any;
  batchname: any;
  calendarDetailsId: any;
  index: any;
  batchesDetails: any;
  batch: any;
  selectedBatchName: any;
  start: Date;
  eventsArray: any[] = [];
  EventsArrayData: any[];
  CalendarId: any;

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
    { value: 'JAVAWITHANGULAR', viewValue: 'JAVA WITH ANGULAR' },
    { value: 'JAVAWITHREACT', viewValue: 'JAVA WITH REACT' },
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
      contentHeight: 600,
      events: this.calendarData,
      //   customButtons: {
      //     myCustomButton: {
      //     text: 'Add Event',
      //     click: function() {
      //            alert("Custom Button");
      //     }
      //   }
      // },
      // eventContent: { html: '<i class="far fa-edit"></i>' },
      eventContent: function (args: any, createElement: any) {
        const icon = args.event._def.extendedProps.img;
        const text = "<i class='far fa-edit" + icon + "'></i> " + args.event._def.title;
        if (args.icon) {
          createElement.find(".fc-title").prepend("<i class='fa fa-edit" + args.icon + "'></i>");
        }
        return {
          html: text
        };
      },
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

  }

  handleEventClick(arg: any) {
    console.log(arg);
  }

  handleEventDragStop(arg: any) {
    console.log(arg);
  }

  getCalendarData() {
    return this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendarList = data;
      this.calendarListData = this.calendarList.data
      console.log(this.calendarListData);
    })
  }

  onSubmit(addEventForm: FormGroup) {

    this.eventsArray.push({
      // calendarDetailsId: this.CalendarId,
      batchName: this.selectedBatchName,
      date: addEventForm.controls.start.value,
      topic: addEventForm.controls.title.value,
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
      this.toastr.error(err.message);
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
      this.toastr.error(err.message);
    })
  }

  onSubmitForm(Cform: FormGroup) {
    // console.log(this.Cform.value);

    let date = new Date(Cform.controls.startDate.value);
    // console.log(date);
    let finalDate = date.toLocaleDateString().split('/');
    let newDate = `${finalDate[2]}-${finalDate[0]}-${finalDate[1]}`
    // console.log(newDate);

    const formData = {
      batchName: Cform.controls.batchName.value,
      technology: Cform.controls.technology.value,
      startDate: newDate,
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
      this.toastr.error('some error occured');
    })
  }

  visibleCalender(batchName: any,index: any) {
    this.selectedBatchName = batchName;
    this.calendarService.getCalendarEvents(batchName).subscribe(res => {
      this.calendarEvents = res;
      this.eventsArray = this.calendarEvents.data;
      console.log(this.eventsArray);
      console.log(this.eventsArray[index].calendarEventId);
      this.CalendarId = this.eventsArray[index].calendarEventId
      var calendarData: any = []
      this.eventsArray.forEach((element: any, index: any) => {
        let obj = { id: '', title: '', start: '', subTopic: '', calendarDetailsId: '' }
        obj.id = index
        obj.title = element.topic
        obj.start = element.date
        obj.subTopic = element.subTopic
        obj.calendarDetailsId = element.calendarDetailsId
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



